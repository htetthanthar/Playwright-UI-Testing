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
  - waiting for getByRole('link', { name: 'Cart' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "2"
      - generic [ref=e15]:
        - generic [ref=e16]: Products
        - combobox [ref=e19]:
          - option "Name (A to Z)" [selected]
          - option "Name (Z to A)"
          - option "Price (low to high)"
          - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link "Sauce Labs Backpack" [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e31]: Sauce Labs Backpack
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Remove" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link "Sauce Labs Bike Light" [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e43]: Sauce Labs Bike Light
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e55]: Sauce Labs Bolt T-Shirt
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Remove" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link "Sauce Labs Fleece Jacket" [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e67]: Sauce Labs Fleece Jacket
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link "Sauce Labs Onesie" [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e79]: Sauce Labs Onesie
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e91]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
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
> 169 |     await page.getByRole('link', { name: 'Cart' }).click();
      |                                                    ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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
```