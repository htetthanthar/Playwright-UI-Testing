# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shopping-flow.spec.ts >> Task 2: Product and Cart Validation >> should verify products appear in cart after adding
- Location: tests\shopping-flow.spec.ts:154:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Login' })
    - locator resolved to <input type="submit" value="Login" id="login-button" name="login-button" data-test="login-button" class="submit-button btn_action"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]: standard_user
      - textbox "Password" [ref=e13]: secret_sauce
      - button "Login" [active] [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  28  | };
  29  | 
  30  | const LOCKED_USER = {
  31  |   username: 'locked_out_user',
  32  |   password: 'secret_sauce'
  33  | };
  34  | 
  35  | const CUSTOMER_INFO = {
  36  |   firstName: 'John',
  37  |   lastName: 'Doe',
  38  |   postalCode: '12345'
  39  | };
  40  | 
  41  | /**
  42  |  * TASK 1: LOGIN VALIDATION
  43  |  * Tests for successful login and error handling
  44  |  */
  45  | test.describe('Task 1: Login Validation', () => {
  46  |   
  47  |   test.beforeEach(async ({ page }) => {
  48  |     // Navigate to the application before each test
  49  |     await page.goto('/');
  50  |   });
  51  | 
  52  |   test('should login successfully with valid credentials', async ({ page }) => {
  53  |     // Test ID: TC001
  54  |     // Description: Verify successful login with valid credentials
  55  |     
  56  |     // Fill in username using getByPlaceholder
  57  |     await page.getByPlaceholder('Username').fill(VALID_USER.username);
  58  |     
  59  |     // Fill in password using getByPlaceholder
  60  |     await page.getByPlaceholder('Password').fill(VALID_USER.password);
  61  |     
  62  |     // Click login button using getByRole
  63  |     await page.getByRole('button', { name: 'Login' }).click();
  64  |     
  65  |     // Verify successful login by checking URL contains inventory
  66  |     await expect(page).toHaveURL(/.*inventory.html/);
  67  |     
  68  |     // Verify inventory page is displayed using getByText
  69  |     await expect(page.getByText('Products')).toBeVisible();
  70  |     
  71  |     // Verify products are visible
  72  |     await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  73  |     await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  74  |   });
  75  | 
  76  |   test('should display error message for invalid credentials', async ({ page }) => {
  77  |     // Test ID: TC002
  78  |     // Description: Verify error message appears for invalid login
  79  |     
  80  |     // Fill in invalid username
  81  |     await page.getByPlaceholder('Username').fill(INVALID_USER.username);
  82  |     
  83  |     // Fill in invalid password
  84  |     await page.getByPlaceholder('Password').fill(INVALID_USER.password);
  85  |     
  86  |     // Click login button
  87  |     await page.getByRole('button', { name: 'Login' }).click();
  88  |     
  89  |     // Verify error message is displayed using getByRole for alert
  90  |     const errorMessage = page.locator('[data-test="error"]');
  91  |     await expect(errorMessage).toBeVisible();
  92  |     
  93  |     // Verify error message contains expected text
  94  |     await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  95  |   });
  96  | 
  97  |   test('should display error for locked out user', async ({ page }) => {
  98  |     // Test ID: TC003
  99  |     // Description: Verify error for locked out user account
  100 |     
  101 |     // Fill in locked out user credentials
  102 |     await page.getByPlaceholder('Username').fill(LOCKED_USER.username);
  103 |     await page.getByPlaceholder('Password').fill(LOCKED_USER.password);
  104 |     
  105 |     // Click login button
  106 |     await page.getByRole('button', { name: 'Login' }).click();
  107 |     
  108 |     // Verify error message is displayed
  109 |     const errorMessage = page.locator('[data-test="error"]');
  110 |     await expect(errorMessage).toBeVisible();
  111 |     
  112 |     // Verify specific error message for locked user
  113 |     await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out');
  114 |   });
  115 | });
  116 | 
  117 | /**
  118 |  * TASK 2: PRODUCT AND CART VALIDATION
  119 |  * Tests for adding products and verifying cart functionality
  120 |  */
  121 | test.describe('Task 2: Product and Cart Validation', () => {
  122 |   
  123 |   test.beforeEach(async ({ page }) => {
  124 |     // Login before each test in this describe block
  125 |     await page.goto('/');
  126 |     await page.getByPlaceholder('Username').fill(VALID_USER.username);
  127 |     await page.getByPlaceholder('Password').fill(VALID_USER.password);
> 128 |     await page.getByRole('button', { name: 'Login' }).click();
      |                                                       ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  129 |     
  130 |     // Wait for inventory page to load
  131 |     await expect(page).toHaveURL(/.*inventory.html/);
  132 |   });
  133 | 
  134 |   test('should add two products to cart and verify badge count', async ({ page }) => {
  135 |     // Test ID: TC004
  136 |     // Description: Add two products and verify cart badge shows correct count
  137 |     
  138 |     // Get the first "Add to cart" button and click it
  139 |     const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
  140 |     await addToCartButtons.nth(0).click();
  141 |     
  142 |     // Verify cart badge shows "1"
  143 |     const cartBadge = page.locator('.shopping_cart_badge');
  144 |     await expect(cartBadge).toBeVisible();
  145 |     await expect(cartBadge).toHaveText('1');
  146 |     
  147 |     // Click second "Add to cart" button
  148 |     await addToCartButtons.nth(1).click();
  149 |     
  150 |     // Verify cart badge shows "2"
  151 |     await expect(cartBadge).toHaveText('2');
  152 |   });
  153 | 
  154 |   test('should verify products appear in cart after adding', async ({ page }) => {
  155 |     // Test ID: TC005
  156 |     // Description: Verify selected products are displayed in cart page
  157 |     
  158 |     // Add first product (Sauce Labs Backpack)
  159 |     const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
  160 |     await addToCartButtons.nth(0).click();
  161 |     
  162 |     // Add second product (Sauce Labs Bike Light)
  163 |     await addToCartButtons.nth(1).click();
  164 |     
  165 |     // Verify cart badge shows 2 items
  166 |     await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  167 |     
  168 |     // Click on cart icon using getByRole
  169 |     await page.getByRole('link', { name: 'Cart' }).click();
  170 |     
  171 |     // Verify we're on cart page
  172 |     await expect(page).toHaveURL(/.*cart.html/);
  173 |     
  174 |     // Verify both products appear in cart using getByText
  175 |     await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  176 |     await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  177 |     
  178 |     // Verify quantities are correct
  179 |     const cartItems = page.locator('.cart_item');
  180 |     await expect(cartItems).toHaveCount(2);
  181 |   });
  182 | 
  183 |   test('should remove product from cart', async ({ page }) => {
  184 |     // Test ID: TC006
  185 |     // Description: Verify product can be removed from cart
  186 |     
  187 |     // Add a product to cart
  188 |     await page.getByRole('button', { name: 'Add to cart' }).first().click();
  189 |     
  190 |     // Verify cart has 1 item
  191 |     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  192 |     
  193 |     // Go to cart page
  194 |     await page.getByRole('link', { name: 'Cart' }).click();
  195 |     
  196 |     // Click remove button using getByRole
  197 |     await page.getByRole('button', { name: 'Remove' }).click();
  198 |     
  199 |     // Verify cart badge is no longer visible (cart is empty)
  200 |     await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  201 |     
  202 |     // Verify cart is empty message or product list is empty
  203 |     const cartItems = page.locator('.cart_item');
  204 |     await expect(cartItems).toHaveCount(0);
  205 |   });
  206 | });
  207 | 
  208 | /**
  209 |  * TASK 3: CHECKOUT FLOW VALIDATION
  210 |  * Tests for complete checkout process
  211 |  */
  212 | test.describe('Task 3: Checkout Flow Validation', () => {
  213 |   
  214 |   test.beforeEach(async ({ page }) => {
  215 |     // Login and add products before each checkout test
  216 |     await page.goto('/');
  217 |     await page.getByPlaceholder('Username').fill(VALID_USER.username);
  218 |     await page.getByPlaceholder('Password').fill(VALID_USER.password);
  219 |     await page.getByRole('button', { name: 'Login' }).click();
  220 |     
  221 |     // Add at least one product to cart (required for checkout)
  222 |     await page.getByRole('button', { name: 'Add to cart' }).first().click();
  223 |     
  224 |     // Go to cart
  225 |     await page.getByRole('link', { name: 'Cart' }).click();
  226 |   });
  227 | 
  228 |   test('should complete full checkout flow successfully', async ({ page }) => {
```