import { test, expect } from '@playwright/test';

/**
 * Assignment 8.3: Playwright UI Testing
 * Target Application: https://www.saucedemo.com/
 * 
 * This test suite validates the complete shopping workflow including:
 * - Login validation (valid and invalid credentials)
 * - Product and cart validation
 * - Checkout flow validation
 * 
 * Best Practices Applied:
 * - Web-first assertions
 * - Proper locators (getByRole, getByText, getByPlaceholder)
 * - No hardcoded waits or waitForTimeout()
 * - Test isolation
 */

// Test credentials
const VALID_USER = {
  username: 'standard_user',
  password: 'secret_sauce'
};

const INVALID_USER = {
  username: 'invalid_user',
  password: 'wrong_password'
};

const LOCKED_USER = {
  username: 'locked_out_user',
  password: 'secret_sauce'
};

const CUSTOMER_INFO = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
};

/**
 * TASK 1: LOGIN VALIDATION
 * Tests for successful login and error handling
 */
test.describe('Task 1: Login Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('/');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Test ID: TC001
    // Description: Verify successful login with valid credentials
    
    // Fill in username using getByPlaceholder
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    
    // Fill in password using getByPlaceholder
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    
    // Click login button using getByRole
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify successful login by checking URL contains inventory
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verify inventory page is displayed using getByText
    await expect(page.getByText('Products')).toBeVisible();
    
    // Verify products are visible
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  });

  test('should display error message for invalid credentials', async ({ page }) => {
    // Test ID: TC002
    // Description: Verify error message appears for invalid login
    
    // Fill in invalid username
    await page.getByPlaceholder('Username').fill(INVALID_USER.username);
    
    // Fill in invalid password
    await page.getByPlaceholder('Password').fill(INVALID_USER.password);
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed using getByRole for alert
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    
    // Verify error message contains expected text
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('should display error for locked out user', async ({ page }) => {
    // Test ID: TC003
    // Description: Verify error for locked out user account
    
    // Fill in locked out user credentials
    await page.getByPlaceholder('Username').fill(LOCKED_USER.username);
    await page.getByPlaceholder('Password').fill(LOCKED_USER.password);
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    
    // Verify specific error message for locked user
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out');
  });
});

/**
 * TASK 2: PRODUCT AND CART VALIDATION
 * Tests for adding products and verifying cart functionality
 */
test.describe('Task 2: Product and Cart Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login before each test in this describe block
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for inventory page to load
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should add two products to cart and verify badge count', async ({ page }) => {
    // Test ID: TC004
    // Description: Add two products and verify cart badge shows correct count
    
    // Get the first "Add to cart" button and click it
    const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    await addToCartButtons.nth(0).click();
    
    // Verify cart badge shows "1"
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
    
    // Click second "Add to cart" button
    await addToCartButtons.nth(1).click();
    
    // Verify cart badge shows "2"
    await expect(cartBadge).toHaveText('2');
  });

  test('should verify products appear in cart after adding', async ({ page }) => {
    // Test ID: TC005
    // Description: Verify selected products are displayed in cart page
    
    // Add first product (Sauce Labs Backpack)
    const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    await addToCartButtons.nth(0).click();
    
    // Add second product (Sauce Labs Bike Light)
    await addToCartButtons.nth(1).click();
    
    // Verify cart badge shows 2 items
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    // Click on cart icon using getByRole
    await page.getByRole('link', { name: 'Cart' }).click();
    
    // Verify we're on cart page
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify both products appear in cart using getByText
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    
    // Verify quantities are correct
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
  });

  test('should remove product from cart', async ({ page }) => {
    // Test ID: TC006
    // Description: Verify product can be removed from cart
    
    // Add a product to cart
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    
    // Verify cart has 1 item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Go to cart page
    await page.getByRole('link', { name: 'Cart' }).click();
    
    // Click remove button using getByRole
    await page.getByRole('button', { name: 'Remove' }).click();
    
    // Verify cart badge is no longer visible (cart is empty)
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    
    // Verify cart is empty message or product list is empty
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);
  });
});

/**
 * TASK 3: CHECKOUT FLOW VALIDATION
 * Tests for complete checkout process
 */
test.describe('Task 3: Checkout Flow Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login and add products before each checkout test
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Add at least one product to cart (required for checkout)
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    
    // Go to cart
    await page.getByRole('link', { name: 'Cart' }).click();
  });

  test('should complete full checkout flow successfully', async ({ page }) => {
    // Test ID: TC007
    // Description: Complete entire checkout process and verify confirmation
    
    // Click checkout button using getByRole
    await page.getByRole('button', { name: 'Checkout' }).click();
    
    // Verify we're on checkout page
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    
    // Fill in customer details using getByPlaceholder
    await page.getByPlaceholder('First Name').fill(CUSTOMER_INFO.firstName);
    await page.getByPlaceholder('Last Name').fill(CUSTOMER_INFO.lastName);
    await page.getByPlaceholder('Zip/Postal Code').fill(CUSTOMER_INFO.postalCode);
    
    // Click continue button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify we're on checkout overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    
    // Verify product is in checkout
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    
    // Click finish button to complete purchase
    await page.getByRole('button', { name: 'Finish' }).click();
    
    // Verify order confirmation page
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    
    // Verify success message using getByText
    const confirmationMessage = page.locator('[data-test="title"]');
    await expect(confirmationMessage).toBeVisible();
    await expect(confirmationMessage).toHaveText('Checkout: Complete!');
    
    // Verify thank you message
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    
    // Verify order completion icon
    const completeIcon = page.locator('.complete-header');
    await expect(completeIcon).toBeVisible();
  });

  test('should display error when checkout form is incomplete', async ({ page }) => {
    // Test ID: TC008
    // Description: Verify error message when required fields are empty
    
    // Go to checkout page
    await page.getByRole('button', { name: 'Checkout' }).click();
    
    // Try to continue without filling any fields
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    
    // Verify error message text
    await expect(errorMessage).toContainText('Error: First Name is required');
  });

  test('should allow cancellation during checkout', async ({ page }) => {
    // Test ID: TC009
    // Description: Verify user can cancel checkout and return to cart
    
    // Go to checkout page
    await page.getByRole('button', { name: 'Checkout' }).click();
    
    // Fill in some data
    await page.getByPlaceholder('First Name').fill(CUSTOMER_INFO.firstName);
    await page.getByPlaceholder('Last Name').fill(CUSTOMER_INFO.lastName);
    await page.getByPlaceholder('Zip/Postal Code').fill(CUSTOMER_INFO.postalCode);
    
    // Click cancel link using getByRole
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    // Verify we're back on cart page
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify products still in cart
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });
});

/**
 * ADDITIONAL TESTS FOR COMPREHENSIVE COVERAGE
 * These tests demonstrate advanced Playwright features
 */
test.describe('Additional Validation Tests', () => {
  
  test('should verify page title on login', async ({ page }) => {
    // Test ID: TC010
    // Description: Verify application title
    
    await page.goto('/');
    
    // Verify page title
    await expect(page).toHaveTitle('Swag Labs');
    
    // Verify login container is visible
    await expect(page.locator('#login_credentials')).toBeVisible();
  });

  test('should navigate to product detail page', async ({ page }) => {
    // Test ID: TC011
    // Description: Verify product detail page navigation
    
    // Login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Click on a product to view details
    await page.getByText('Sauce Labs Backpack').click();
    
    // Verify we're on product detail page
    await expect(page).toHaveURL(/.*inventory-item.html/);
    
    // Verify product details are visible
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('29.99')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Test ID: TC012
    // Description: Verify logout functionality
    
    // Login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Open menu
    await page.getByRole('button', { name: 'Open Menu' }).click();
    
    // Click logout link
    await page.getByRole('link', { name: 'Logout' }).click();
    
    // Verify we're back on login page
    await expect(page).toHaveURL('/');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
  });
});

/**
 * QUALITY GATE DEMONSTRATION
 * This test demonstrates understanding of quality gates
 */
test.describe('Quality Gate Validation', () => {
  
  test('all critical paths should pass for quality gate', async ({ page }) => {
    // Test ID: TC013
    // Description: Demonstrate quality gate concept
    
    /**
     * QUALITY GATE DEFINITION:
     * A quality gate is a validation checkpoint in a CI/CD pipeline that ensures
     * code meets predefined quality standards before proceeding to the next stage.
     * 
     * Purpose in CI/CD:
     * 1. Prevents defective code from reaching production
     * 2. Ensures test coverage thresholds are met
     * 3. Validates code quality metrics (linting, security, performance)
     * 4. Provides automated feedback to developers
     * 5. Maintains consistent quality standards across releases
     * 
     * This test suite acts as a quality gate by:
     * - Validating all critical user journeys
     * - Ensuring login, shopping, and checkout work correctly
     * - Providing fast feedback on application health
     * - Blocking deployment if tests fail
     */
    
    // Quick smoke test of critical path
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(VALID_USER.username);
    await page.getByPlaceholder('Password').fill(VALID_USER.password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Quality gate assertion
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
    
    // If this test passes, the quality gate is satisfied
    console.log('✅ Quality Gate Passed: Critical user journey is functional');
  });
});