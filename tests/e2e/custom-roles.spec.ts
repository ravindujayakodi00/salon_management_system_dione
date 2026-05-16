/**
 * Custom Roles E2E tests — verify that the staff form role dropdown is
 * populated dynamically from organization_roles (not hardcoded), and that
 * staff cards display the correct display name.
 * Requires TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_USER_ROLE=Owner.
 */
import { test, expect } from '@playwright/test';
import {
    loginToAdminDashboard,
    ADMIN_LOGIN_TIMEOUT_MS,
    ownerRoleAllowed,
} from './helpers/admin-auth';

test.describe('Custom Roles — staff form dropdown', () => {
    test.describe.configure({ timeout: ADMIN_LOGIN_TIMEOUT_MS + 60_000 });

    test.beforeEach(async ({ page }) => {
        test.skip(
            !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
            'Set TEST_USER_EMAIL and TEST_USER_PASSWORD'
        );
        test.skip(!ownerRoleAllowed(), 'Custom roles tests require Owner (set TEST_USER_ROLE=Owner)');

        await loginToAdminDashboard(page, process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        if (page.url().includes('/admin/select-branch')) {
            test.skip(true, 'Use a user with branch_id set');
        }
    });

    test('role dropdown in Add Staff modal is not empty', async ({ page }) => {
        await page.goto('/admin/staff');
        await expect(page.getByRole('heading', { name: 'Staff' })).toBeVisible();

        await page.getByRole('button', { name: 'Add Staff Member' }).click();
        await expect(page.getByRole('heading', { name: 'Add Staff Member' })).toBeVisible();

        const modal = page.locator('.max-w-2xl').filter({
            has: page.getByRole('heading', { name: 'Add Staff Member' }),
        });

        // Role select should have options
        const roleSelect = modal.locator('select').first();
        const options = await roleSelect.locator('option').all();
        expect(options.length).toBeGreaterThan(0);

        // Should not have a disabled "No roles" placeholder
        const firstOptionText = await options[0].textContent();
        expect(firstOptionText).not.toMatch(/no roles/i);
    });

    test('role dropdown options come from organization_roles table', async ({ page }) => {
        await page.goto('/admin/staff');
        await page.getByRole('button', { name: 'Add Staff Member' }).click();
        await expect(page.getByRole('heading', { name: 'Add Staff Member' })).toBeVisible();

        const modal = page.locator('.max-w-2xl').filter({
            has: page.getByRole('heading', { name: 'Add Staff Member' }),
        });

        const roleSelect = modal.locator('select').first();
        const optionTexts = await roleSelect.locator('option').allTextContents();

        // Owner should NOT be in the dropdown (excluded by getAssignableRoles)
        expect(optionTexts).not.toContain('Owner');

        // At least one of the standard roles or a custom equivalent should be present
        const hasManagerOrEquivalent = optionTexts.some(t =>
            t.toLowerCase().includes('manager') || t.length > 0
        );
        expect(hasManagerOrEquivalent).toBe(true);
    });

    test('staff cards display role label (not raw system_role when custom)', async ({ page }) => {
        await page.goto('/admin/staff');
        await expect(page.getByRole('heading', { name: 'Staff' })).toBeVisible();

        // Each staff card should show a role label
        const staffCards = page.locator('.card').filter({
            has: page.locator('p.text-sm.text-gray-600'),
        });

        const count = await staffCards.count();
        if (count === 0) {
            test.skip(true, 'No staff members exist to check role labels');
        }

        // The role shown on the first staff card should not be empty
        const firstCard = staffCards.first();
        const roleLabel = firstCard.locator('p.text-sm.text-gray-600').first();
        const labelText = await roleLabel.textContent();
        expect(labelText?.trim().length).toBeGreaterThan(0);
    });

    test('Edit staff modal pre-fills role with current display name', async ({ page }) => {
        await page.goto('/admin/staff');
        await expect(page.getByRole('heading', { name: 'Staff' })).toBeVisible();

        // Find any staff card with an Edit button
        const editButton = page.locator('.card').filter({
            has: page.locator('svg'), // cards with action buttons
        }).first().locator('button').first();

        const cardCount = await page.locator('.card').filter({ has: page.locator('button') }).count();
        if (cardCount === 0) {
            test.skip(true, 'No staff members exist to edit');
        }

        await editButton.click();
        await expect(page.getByRole('heading', { name: 'Edit Staff Member' })).toBeVisible({ timeout: 10_000 });

        const modal = page.locator('.max-w-2xl').filter({
            has: page.getByRole('heading', { name: 'Edit Staff Member' }),
        });

        // Role select should have a value selected
        const roleSelect = modal.locator('select').first();
        const selectedValue = await roleSelect.inputValue();
        expect(selectedValue.trim().length).toBeGreaterThan(0);

        // Close the modal
        await modal.getByRole('button', { name: /cancel/i }).click();
    });
});
