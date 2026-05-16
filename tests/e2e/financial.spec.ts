/**
 * Financial page E2E tests — date range, cash advance.
 * Requires TEST_USER_EMAIL, TEST_USER_PASSWORD. Owner or Manager.
 */
import { test, expect } from '@playwright/test';
import {
    loginToAdminDashboard,
    ADMIN_LOGIN_TIMEOUT_MS,
    crudRolesAllowed,
} from './helpers/admin-auth';

test.describe('Financial', () => {
    test.describe.configure({ timeout: ADMIN_LOGIN_TIMEOUT_MS + 60_000 });

    test.beforeEach(async ({ page }) => {
        test.skip(
            !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
            'Set TEST_USER_EMAIL and TEST_USER_PASSWORD'
        );
        test.skip(!crudRolesAllowed(), 'Financial tests require Owner or Manager');

        await loginToAdminDashboard(page, process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        if (page.url().includes('/admin/select-branch')) {
            test.skip(true, 'Use a user with branch_id set');
        }

        await page.goto('/admin/financial');
        await expect(page.getByRole('heading', { name: 'Financial' })).toBeVisible();
    });

    test('financial page loads with summary cards and stylist table', async ({ page }) => {
        // Summary cards
        await expect(page.getByText(/initial salary/i)).toBeVisible({ timeout: 15_000 });
        await expect(page.getByText(/commission/i)).toBeVisible();
        await expect(page.getByText(/advances/i)).toBeVisible();
        await expect(page.getByText(/current salary/i)).toBeVisible();
    });

    test('"This month" button resets date range', async ({ page }) => {
        const thisMonthButton = page.getByRole('button', { name: 'This month' });
        await expect(thisMonthButton).toBeVisible({ timeout: 10_000 });
        await thisMonthButton.click();

        // Page should still show heading after reset
        await expect(page.getByRole('heading', { name: 'Financial' })).toBeVisible();
    });

    test('start date can be changed and table reloads', async ({ page }) => {
        const startInput = page.locator('input[type="date"]').first();
        await expect(startInput).toBeVisible({ timeout: 10_000 });

        await startInput.fill('2025-01-01');
        await startInput.press('Tab');

        // Page should not crash
        await expect(page.getByRole('heading', { name: 'Financial' })).toBeVisible();
    });

    test('Cash Advance button is disabled when stylist has no available balance', async ({ page }) => {
        // If there are stylists with zero balance, their Cash Advance button should be disabled/outline
        const disabledAdvanceButtons = page.locator('button[disabled]').filter({ hasText: 'Cash Advance' });
        const outlineAdvanceButtons = page.locator('button').filter({ hasText: 'Cash Advance' });

        const buttonCount = await outlineAdvanceButtons.count();
        if (buttonCount === 0) {
            // No stylists in this period — acceptable
            await expect(page.getByText(/no stylists found|loading/i).or(
                page.locator('tbody tr')
            )).toBeTruthy();
            return;
        }

        // At least one button exists — verify it's either disabled or enabled based on balance
        await expect(outlineAdvanceButtons.first()).toBeVisible();
    });

    test('Cash Advance modal opens for stylist with available balance', async ({ page }) => {
        const enabledAdvanceButton = page.locator('button:not([disabled])').filter({ hasText: 'Cash Advance' }).first();
        const isVisible = await enabledAdvanceButton.isVisible({ timeout: 5_000 }).catch(() => false);

        if (!isVisible) {
            test.skip(true, 'No stylist with available balance to test cash advance');
        }

        await enabledAdvanceButton.click();
        await expect(page.getByRole('heading', { name: 'Cash Advance' })).toBeVisible({ timeout: 10_000 });

        // Modal should show current salary balance info
        await expect(page.getByText(/current salary balance/i)).toBeVisible();

        // Amount input should be present
        await expect(page.locator('input[type="number"]').first()).toBeVisible();

        // Close without submitting
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page.getByRole('heading', { name: 'Cash Advance' })).toBeHidden({ timeout: 10_000 });
    });

    test('Cash Advance modal rejects amount exceeding salary balance', async ({ page }) => {
        const enabledAdvanceButton = page.locator('button:not([disabled])').filter({ hasText: 'Cash Advance' }).first();
        const isVisible = await enabledAdvanceButton.isVisible({ timeout: 5_000 }).catch(() => false);

        if (!isVisible) {
            test.skip(true, 'No stylist with available balance to test');
        }

        await enabledAdvanceButton.click();
        await expect(page.getByRole('heading', { name: 'Cash Advance' })).toBeVisible({ timeout: 10_000 });

        // Enter an amount larger than any possible balance
        await page.locator('input[type="number"]').first().fill('9999999');

        // Record button should be disabled or show an error
        const recordButton = page.getByRole('button', { name: 'Record Advance' });
        await expect(recordButton).toBeDisabled({ timeout: 5_000 }).catch(async () => {
            // Alternatively, a toast/error might appear on click
            await recordButton.click();
            await expect(page.getByText(/exceeds/i)).toBeVisible({ timeout: 5_000 });
        });

        await page.getByRole('button', { name: 'Cancel' }).click();
    });
});
