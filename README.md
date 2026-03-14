# Playwright TypeScript Automation - SauceDemo

![Playwright](https://img.shields.io/badge/Playwright-E2E-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Run Tests](#how-to-run-tests)
- [Test Scenarios](#test-scenarios)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository contains end-to-end automation tests for the [SauceDemo](https://www.saucedemo.com/) web application using [Playwright](https://playwright.dev/) and TypeScript.  
The tests cover login, transaction, cart, and checkout scenarios using the Page Object Model (POM) pattern.

---

## Tech Stack

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js
- Page Object Model (POM)
- Jest-style assertions

---

## Project Structure

```
.
├── playwright.config.ts
├── package.json
├── tests
│   ├── controllers
│   ├── pageobjects
│   ├── resources
│   │   ├── data
│   │   └── enums
│   ├── specs
│   │   ├── login
│   │   └── transaction
│   └── usecases
└── README.md
```

- **controllers/**: Business logic for each feature
- **pageobjects/**: Page Object Model classes for each page
- **resources/data/**: Test data and config variables
- **resources/enums/**: Enum definitions
- **specs/**: Test scenarios/spec files
- **usecases/**: Use case flows

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/RifqiPratamaa/playwright-saucedemo-ts.git
cd your-repo-name
```

### 2. Install dependencies

```sh
npm install
```

### 3. Install Playwright browsers

```sh
npx playwright install
```

---

## How to Run Tests

### Run all tests

```sh
npx playwright test
```

### Run a specific test file

```sh
npx playwright test tests/specs/transaction/transaction.spec.ts
```

### Run tests with UI

```sh
npx playwright test --ui
```

### Run API tests

```sh
npx playwright test --project=api

or

npx playwright test --grep "@api"
```

---

## Test Scenarios

- Login with valid and invalid credentials
- Add items to cart and verify cart badge
- Remove items from cart
- Checkout and verify total price calculation
- Logout

---

## Best Practices

- Uses Playwright’s recommended selectors (`getByRole`, `getByTestId`, etc.)
- Page Object Model for maintainability
- Test data and config separated in `resources/data`
- Assertions use Playwright’s `expect` API

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**Author:** Rifqi Ardian Pratama

---