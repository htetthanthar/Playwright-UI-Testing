import { test, expect } from '@playwright/test';

test('should login successfully with valid credentials', async ({ page }) => {
  // STEP 1: Navigate to URL
  await page.goto('https://www.saucedemo.com/');
  
  // STEP 2: Use Locators API to identify elements
  const usernameField = page.getByPlaceholder('Username');
  const passwordField = page.getByPlaceholder('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });
  
  // STEP 3: Perform actions on locators
  await usernameField.fill('standard_user');
  await passwordField.fill('secret_sauce');
  await loginButton.click();
  
  // STEP 4: Assert expected behavior (Web-First Assertions)
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});