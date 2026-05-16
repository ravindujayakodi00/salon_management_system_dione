/**
 * Auth E2E tests — login, logout, and role-based redirect.
 * Requires TEST_USER_EMAIL and TEST_USER_PASSWORD.
 */
import { test, expect } from '@playwright/test';
import { loginToAdminDashboard, ADMIN_LOGIN_TIMEOUT_MS } from './helpers/admin-auth';

test.describe('Authentication', () => {
    test.describe.configure({ timeout: ADMIN_LOGIN_TIMEOUT_MS + 30_000 });

    test('login with valid credentials lands on dashboard', async ({ page }) => {
        test.skip(
            !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
            'Set TEST_USER_EMAIL and TEST_USER_PASSWORD'
        );

        await loginToAdminDashboard(page, process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

        await expect(page).toHaveURL(/\/admin\/(dashboard|select-branch)/);
    });

    test('login with wrong password shows an error message', async ({ page }) => {
        await page.goto('/admin/login');
        await page.locator('input[type="email"]').fill('notareal@example.com');
        await page.locator('input[type="password"]').fill('wrongpassword123');
        await page.getByRole('button', { name: /sign in/i }).click();

        await expect(
            page.getByText(/incorrect email or password|invalid login credentials|login failed|invalid email or password/i)
        ).toBeVisible({ timeout: 15_000 });

        // Must stay on login page
        await expect(page).toHaveURL(/\/admin\/login/);
    });

    test('unauthenticated user visiting dashboard is redirected to login', async ({ page }) => {
        await page.goto('/admin/dashboard');
        await expect(page).toHaveURL(/\/admin\/login/, { timeout: 15_000 });
    });

    test('logout redirects to login page', async ({ page }) => {
        test.skip(
            !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
            'Set TEST_USER_EMAIL and TEST_USER_PASSWORD'
        );

        await loginToAdminDashboard(page, process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

        // Click logout — button in header/sidebar
        await page.getByRole('button', { name: /logout|sign out/i }).first().click();

        await expect(page).toHaveURL(/\/admin\/login/, { timeout: 15_000 });
    });

    test('login page renders email and password fields', async ({ page }) => {
        await page.goto('/admin/login');
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    });
});
