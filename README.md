# Customer Account Settings

A desktop-focused React application for Customer Success admins to view and update a customer account configuration without needing direct engineering support.

This implementation covers the full primary flow from the PRD:
- load a customer settings page
- show a read-only settings view by default
- enter edit mode
- validate all required fields
- save through a mock API
- preserve the form on save failure
- discard unsaved changes
- handle loading, retry, and error states

## Live Scope

Implemented:
- desktop-only customer settings page
- one customer route: `/customers/:id/settings`
- mock GET and PUT flows
- form validation and input cleanup
- retry and save error handling
- toast feedback
- local persistence using `localStorage`

Intentionally out of scope:
- authentication
- multi-customer listing/search
- audit history
- mobile layout

## Tech Stack

- React
- Redux Toolkit
- React Router
- styled-components
- Vite
- Vitest

## Why These Choices

### React
React keeps the screen component-driven and easy to reason about for a small but stateful workflow like account settings.

### Redux Toolkit
Redux Toolkit was used to keep async request state, saved data, draft form state, toast state, and mode changes predictable and centralized.

### styled-components
styled-components made it easy to build a themed UI while keeping styling colocated in dedicated `*.styles.js` files beside each component.

### Mock API with local persistence
A Promise-based mock API backed by local JSON plus `localStorage` gives the screen realistic request behavior without needing a backend.

## Features Implemented

- Route: `/customers/:id/settings`
- Lazy-loaded page route with `Suspense`
- Initial loading spinner
- Read-only settings view
- Edit mode with form fields
- Inline validation errors
- Save loading state
- Success, warning, and error toasts
- Discard changes flow
- Retry state for failed initial load
- Demo scenarios for forced GET/PUT failures
- Persistent mock data via `localStorage`
- Unit tests for validation and Redux slice behavior

## Project Structure

```txt
src/
  app/
    App.jsx
    providers.jsx
    routes.jsx
    store.js
    theme.js
    GlobalStyles.js
  features/
    customer-settings/
      api/
      components/
      constants/
      hooks/
      pages/
      store/
      utils/
  mocks/
    data/
    db/
  shared/
    components/
    constants/
    hooks/
    utils/
  tests/
    customer-settings/
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm

Note: the project is currently configured with Vite 6 and was verified in a local Node 22.9 environment.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm test
```

### Run lint

```bash
npm run lint
```

## Mock API and Demo Scenarios

The app uses a Promise-based mock API layer with artificial delay to simulate network behavior.

Default route:

```txt
/customers/1001/settings
```

Demo routes:

- `/customers/1001/settings?scenario=get-fail-once`
- `/customers/1001/settings?scenario=get-fail-always`
- `/customers/1001/settings?scenario=save-fail-once`
- `/customers/1001/settings?scenario=save-fail-always`

Scenario notes:
- `get-fail-once` fails the initial load and succeeds after Retry
- `get-fail-always` keeps Retry available for repeated demo testing
- `save-fail-once` fails the first save and preserves the form
- `save-fail-always` always fails saves for repeated recovery testing

## Validation Rules

- Company Name: required, maximum 50 characters
- Plan: one of `Starter`, `Growth`, `Business`, `Enterprise`
- Seat Limit: integer from 1 to 500
- Contract Length: integer from 1 to 36 months

Validation and sanitization helpers:
- [sanitization.js](/Users/amanyadav/Desktop/Picarro_Aman_Project/customer-account-settings/src/shared/utils/sanitization.js)
- [validation.js](/Users/amanyadav/Desktop/Picarro_Aman_Project/customer-account-settings/src/shared/utils/validation.js)

## Architecture Notes

- The main screen route is lazy-loaded in [routes.jsx](/Users/amanyadav/Desktop/Picarro_Aman_Project/customer-account-settings/src/app/routes.jsx).
- Async request handling lives in Redux Toolkit thunks rather than inside components.
- The slice guards against stale async results by comparing active request IDs before applying fulfilled/rejected results.
- Toast timeout cleanup is handled in a dedicated hook.
- The feature is organized by page, hooks, store, API, constants, and reusable UI.
- Styled-component definitions are kept in dedicated `*.styles.js` files for consistency.

## Testing

Current automated coverage includes:
- validation utility tests
- Redux slice behavior tests for edit, discard, save success, save failure, and toast clearing

Current test files:
- [validation.test.js](/Users/amanyadav/Desktop/Picarro_Aman_Project/customer-account-settings/src/tests/customer-settings/validation.test.js)
- [customerSettingsSlice.test.js](/Users/amanyadav/Desktop/Picarro_Aman_Project/customer-account-settings/src/tests/customer-settings/customerSettingsSlice.test.js)

## Tradeoffs

- The original PRD asked for React + TypeScript, but this implementation was intentionally built in React + JavaScript based on the project setup direction.
- A custom mock API was used instead of MSW to keep the project lighter and easier to review quickly.
- Test coverage currently focuses on business logic and reducer behavior rather than full component interaction flows.
- The UI is intentionally desktop-first because mobile was out of scope.

## What I Would Add With More Time

- Component/integration tests for the full edit/save/discard user journey
- Accessibility refinement for keyboard interaction and announcements
- A deployed preview link
- Better empty-state handling for unknown customer IDs
- More advanced caching and invalidation if the app expanded beyond one settings screen

## Verification

Verified locally with:

- `npm run lint`
- `npm test`
- `npm run build`

## Submission Notes

This project is designed to highlight:
- clear component boundaries
- practical and maintainable state management
- strong loading, retry, and failure handling
- reusable styling structure
- realistic mock API behavior without backend dependency
