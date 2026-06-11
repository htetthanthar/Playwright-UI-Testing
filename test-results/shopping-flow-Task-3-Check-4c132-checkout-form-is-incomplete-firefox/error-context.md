# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shopping-flow.spec.ts >> Task 3: Checkout Flow Validation >> should display error when checkout form is incomplete
- Location: tests\shopping-flow.spec.ts:271:7

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
      - textbox "Password" [active] [ref=e13]: secret_sauce
      - button "Login" [ref=e15] [cursor=pointer]
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
  119 |  * Tests for adding products and verifying cart functionality
  120 |  */
  121 | test.describe('Task 2: Product and Cart Validation', () => {
  122 |   
  123 |   test.beforeEach(async ({ page }) => {
  124 |     // Login before each test in this describe block
  125 |     await page.goto('/');
  126 |     await page.getByPlaceholder('Username').fill(VALID_USER.username);
  127 |     await page.getByPlaceholder('Password').fill(VALID_USER.password);
  128 |     await page.getByRole('button', { name: 'Login' }).click();
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
> 219 |     await page.getByRole('button', { name: 'Login' }).click();
      |                                                       ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  220 |     
  221 |     // Add at least one product to cart (required for checkout)
  222 |     await page.getByRole('button', { name: 'Add to cart' }).first().click();
  223 |     
  224 |     // Go to cart
  225 |     await page.getByRole('link', { name: 'Cart' }).click();
  226 |   });
  227 | 
  228 |   test('should complete full checkout flow successfully', async ({ page }) => {
  229 |     // Test ID: TC007
  230 |     // Description: Complete entire checkout process and verify confirmation
  231 |     
  232 |     // Click checkout button using getByRole
  233 |     await page.getByRole('button', { name: 'Checkout' }).click();
  234 |     
  235 |     // Verify we're on checkout page
  236 |     await expect(page).toHaveURL(/.*checkout-step-one.html/);
  237 |     
  238 |     // Fill in customer details using getByPlaceholder
  239 |     await page.getByPlaceholder('First Name').fill(CUSTOMER_INFO.firstName);
  240 |     await page.getByPlaceholder('Last Name').fill(CUSTOMER_INFO.lastName);
  241 |     await page.getByPlaceholder('Zip/Postal Code').fill(CUSTOMER_INFO.postalCode);
  242 |     
  243 |     // Click continue button
  244 |     await page.getByRole('button', { name: 'Continue' }).click();
  245 |     
  246 |     // Verify we're on checkout overview page
  247 |     await expect(page).toHaveURL(/.*checkout-step-two.html/);
  248 |     
  249 |     // Verify product is in checkout
  250 |     await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  251 |     
  252 |     // Click finish button to complete purchase
  253 |     await page.getByRole('button', { name: 'Finish' }).click();
  254 |     
  255 |     // Verify order confirmation page
  256 |     await expect(page).toHaveURL(/.*checkout-complete.html/);
  257 |     
  258 |     // Verify success message using getByText
  259 |     const confirmationMessage = page.locator('[data-test="title"]');
  260 |     await expect(confirmationMessage).toBeVisible();
  261 |     await expect(confirmationMessage).toHaveText('Checkout: Complete!');
  262 |     
  263 |     // Verify thank you message
  264 |     await expect(page.getByText('Thank you for your order!')).toBeVisible();
  265 |     
  266 |     // Verify order completion icon
  267 |     const completeIcon = page.locator('.complete-header');
  268 |     await expect(completeIcon).toBeVisible();
  269 |   });
  270 | 
  271 |   test('should display error when checkout form is incomplete', async ({ page }) => {
  272 |     // Test ID: TC008
  273 |     // Description: Verify error message when required fields are empty
  274 |     
  275 |     // Go to checkout page
  276 |     await page.getByRole('button', { name: 'Checkout' }).click();
  277 |     
  278 |     // Try to continue without filling any fields
  279 |     await page.getByRole('button', { name: 'Continue' }).click();
  280 |     
  281 |     // Verify error message is displayed
  282 |     const errorMessage = page.locator('[data-test="error"]');
  283 |     await expect(errorMessage).toBeVisible();
  284 |     
  285 |     // Verify error message text
  286 |     await expect(errorMessage).toContainText('Error: First Name is required');
  287 |   });
  288 | 
  289 |   test('should allow cancellation during checkout', async ({ page }) => {
  290 |     // Test ID: TC009
  291 |     // Description: Verify user can cancel checkout and return to cart
  292 |     
  293 |     // Go to checkout page
  294 |     await page.getByRole('button', { name: 'Checkout' }).click();
  295 |     
  296 |     // Fill in some data
  297 |     await page.getByPlaceholder('First Name').fill(CUSTOMER_INFO.firstName);
  298 |     await page.getByPlaceholder('Last Name').fill(CUSTOMER_INFO.lastName);
  299 |     await page.getByPlaceholder('Zip/Postal Code').fill(CUSTOMER_INFO.postalCode);
  300 |     
  301 |     // Click cancel link using getByRole
  302 |     await page.getByRole('button', { name: 'Cancel' }).click();
  303 |     
  304 |     // Verify we're back on cart page
  305 |     await expect(page).toHaveURL(/.*cart.html/);
  306 |     
  307 |     // Verify products still in cart
  308 |     await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  309 |   });
  310 | });
  311 | 
  312 | /**
  313 |  * ADDITIONAL TESTS FOR COMPREHENSIVE COVERAGE
  314 |  * These tests demonstrate advanced Playwright features
  315 |  */
  316 | test.describe('Additional Validation Tests', () => {
  317 |   
  318 |   test('should verify page title on login', async ({ page }) => {
  319 |     // Test ID: TC010
```