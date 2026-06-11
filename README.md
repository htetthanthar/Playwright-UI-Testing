# Playwright UI Testing
## SauceDemo E-commerce Application Testing

### Project Overview
This project demonstrates comprehensive UI test automation for the SauceDemo e-commerce application using Playwright. The test suite validates the complete shopping workflow from login to checkout.

### Project Structure
playwright-saucedemo-assignment/
├── tests/
│   └── shopping-flow.spec.ts     # Main test file
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Dependencies and scripts
├── README.md                     # This file
├── test-results/                 # Test execution results
├── playwright-report/            # HTML test report
└── screenshots/                  # Failure screenshots

### Learning Outcomes Addressed
1.  Create UI test cases using Playwright

┌─────────────────────────────────────────┐
│ Step 1: Navigate to URL                 │
│   ('https://www.saucedemo.com/')        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Step 2: Use Locators API to Identify        │
│ Elements                                    │
│ page.getByRole('button', { name: 'Login' }) │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────┐
│ Step 3: Perform Actions on Locator  │
│ .click(), .fill(), .check()         │
└─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────┐
│ Step 4: Assert Expected Behavior    │
│ await expect(locator).toBeVisible() │
└─────────────────────────────────────┘

<img width="467" height="443" alt="image" src="https://github.com/user-attachments/assets/89c3a916-f876-4cdc-aefb-73f910ad9b23" />


2. Define "quality gate" and its purpose in CI/CD pipeline

Quality gate

Quality Gates are automated checkpoints in CI/CD pipelines that verify code quality, test results, and compliance before merges or deployments, ensuring only validated changes reach production.

┌─────────────────────────────────────────────────┐
│ CI/CD Pipeline Flow with Quality Gates          │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Code Commit]                                  │
│       ↓                                         │
│  [Build Stage]                                  │
│       ↓                                         │
│  ┌─────────────────┐                            │
│  │ QUALITY GATE 1  │ ←─ Unit Tests Pass?        │
│  │ - Jest tests    │     Coverage > 80%?        │
│  │ - Linting       │     No critical bugs?      │
│  └────────┬────────┘                            │
│           ↓ PASS                                │
│  [Integration Tests]                            │
│           ↓                                     │
│  ┌─────────────────┐                            │
│  │ QUALITY GATE 2  │ ←─ Playwright UI Tests?    │
│  │ - E2E workflows │     All browsers pass?     │
│  │ - Visual checks │     Performance OK?        │
│  └────────┬────────┘                            │
│           ↓ PASS                                │
│  [Staging Deployment]                           │
│           ↓                                     │
│  ┌─────────────────┐                            │
│  │ QUALITY GATE 3  │ ←─ Security scan?          │
│  │ - Security tests│     Accessibility OK?      │
│  │ - Compliance    │     Manual approval?       │
│  └────────┬────────┘                            │
│           ↓ PASS                                │
│  [Production Deployment] ✅                     │  
│                                                 │
└─────────────────────────────────────────────────┘

### Performance Metrics

Based on recent research studies 

| Metric        | Playwright| Selenium | Improvement    |
|---------------|-----------|----------|----------------|
| Avg Test Time | 1.8s      | 3.4s     | 47% faster     |
| Flake Rate    | 0.8%      | 3.6%     | 78% reduction  |
| CPU Usage     | 6.25%     | Higher   | More efficient |
| Memory        | 89.73 MB  | Higher   | Optimized      |

### Key Features

1. **Web-First Assertions** 
   - Auto-wait for elements to be actionable
   - Automatic retry until conditions are met
   - No hardcoded waits needed

2. **Accessibility-Based Locators** 
   - `getByRole()` for semantic elements
   - `getByText()` for text content
   - `getByPlaceholder()` for form inputs

3. **Test Isolation** 
   - Each test runs independently
   - Parallel execution support
   - No shared state between tests

4. **Cross-Browser Testing**
   - Chromium (Chrome)
   - Firefox
   - WebKit (Safari)
   - Mobile browsers



### Quality Gate Criteria for This Project

Quality_gate:
  test_execution:
    required_pass_rate: 100%
    maximum_flakiness: 0%
    maximum_execution_time: 60s
    
  code_quality:
    web_first_assertions: required
    proper_locators: required
    no_hardcoded_waits: required
    test_isolation: required
    
  documentation:
    readme_complete: required
    screenshots_provided: required
    troubleshooting_included: required



### Test Coverage

- **Task 1: Login Validation** 
  - Successful login with valid credentials
  - Error handling for invalid credentials
  - Locked out user scenario
  
- **Task 2: Product and Cart Validation** 
  - Add products to cart
  - Verify cart badge count
  - View cart contents
  - Remove products from cart
  
- **Task 3: Checkout Flow Validation** 
  - Complete checkout process
  - Fill customer information
  - Verify order confirmation
  
- **Task 4: Playwright Best Practices** 
  - Web-first assertions
  - Proper locators (getByRole, getByText, getByPlaceholder)
  - No hardcoded waits

### Installation & Setup

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/

2. **Configuration**

 # First time setup (run once):
npm install
npx playwright install

# Run tests:
npm test                              # Headless (fast)
npx playwright test --headed          # Visible browser
npx playwright test --ui              # Interactive UI mode

# View reports:
npx playwright show-report

# Run specific test file:
npx playwright test tests/shopping-flow.spec.ts

# Run with specific browser:
npx playwright test --project=chromium


# Run with trace collection
npx playwright test --trace on


## Valid Login Implementation
test('should login successfully with valid credentials', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
});


## Checkout Flow Implementation

test('should complete full checkout flow successfully', async ({ page }) => {
  // Navigate to checkout
  await page.getByRole('button', { name: 'Checkout' }).click();
  
  // Fill customer details
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  
  // Complete purchase
  await page.getByRole('button', { name: 'Finish' }).click();
  
  // Verify confirmation
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});


### PLAYWRIGHT BEST PRACTICES APPLIED
Web-First Assertions [ Using Knowledge Base: Playwright resource.pdf]
 Implemented Throughout:

// Auto-wait and retry until condition met
await expect(locator).toBeVisible();
await expect(locator).toHaveText('expected');
await expect(locator).toContainText('partial');
await expect(locator).not.toBeVisible();

Benefits:

    Eliminates race conditions
    No hardcoded waits needed
    Improved test reliability (0% flakiness)


## Test Structure & Organization

// Group related tests with describe
test.describe('Task 1: Login Validation', () => {
  
  // Setup before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  
  // Individual test cases
  test('should login successfully', async ({ page }) => { ... });
  test('should display error for invalid credentials', async ({ page }) => { ... });
});


### CI/CD Integration

# GitHub Actions 
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
