# i18n Test Suite

This directory contains comprehensive tests for the internationalization (i18n) system following Clean Code principles as outlined by Uncle Bob Martin.

## Test Structure

The test suite is organized into focused, single-responsibility test files that test behavior rather than implementation:

### Core Utility Tests

**`utils.test.ts`** - Tests translation utility functions
- `getNestedValue()` - Safe nested object access
- `createTranslationFunction()` - Translation function factory
- `createLoadingTranslationFunction()` - Loading state translations
- `detectBrowserLanguage()` - Browser language detection with fallbacks

**`storage.test.ts`** - Tests browser storage interactions
- `retrieveStoredLanguage()` - Language preference retrieval with error handling
- `persistLanguagePreference()` - Language preference persistence with quota handling

**`translations.test.ts`** - Tests translation loading mechanism
- `loadTranslations()` - Dynamic import of translation files
- Fallback behavior for missing translations
- Error handling for network/import failures

**`dom.test.ts`** - Tests DOM manipulation utilities
- `updateDocumentLanguageAttributes()` - HTML lang/dir attribute management
- RTL/LTR document direction switching

### Integration Tests

**`i18nContext.test.tsx`** - Tests React context and provider
- Context initialization and state management
- Hook behavior (`useI18n`, `useTranslation`)
- Loading states and error boundaries
- Language switching workflows

**`integration.test.tsx`** - End-to-end system tests
- Complete initialization flow
- Language switching with persistence
- RTL/LTR transitions
- Error recovery scenarios
- Performance under rapid language switching

### Component Integration Tests

**`ContactForm.test.tsx`** - Tests form integration with i18n
- Form labels and validation messages in multiple languages
- Dynamic language switching during form interaction
- Privacy policy link parsing with translations

**`language-switcher.test.tsx`** - Tests language selector component
- Language selection UI behavior
- Native language name display
- Keyboard navigation and accessibility

## Test Principles

These tests follow Uncle Bob's Clean Code testing principles:

### Single Responsibility
Each test file focuses on a single module or integration point, avoiding god-tests that try to test everything.

### Behavior-Driven
Tests describe what the system should do, not how it does it. Test names read like specifications.

### Fast and Independent
Tests run quickly and don't depend on each other. Each test can run in isolation.

### Readable
Test code is as important as production code. Tests serve as living documentation.

### Thorough
Critical paths are covered with multiple test scenarios including edge cases and error conditions.

## Coverage Areas

### Happy Path Testing
- ✅ Translation loading and display
- ✅ Language switching
- ✅ Browser language detection
- ✅ Storage persistence

### Error Handling
- ✅ Network failures during translation loading
- ✅ LocalStorage quota exceeded
- ✅ Missing translation keys (fallbacks)
- ✅ Malformed translation files
- ✅ Browser API unavailability

### Edge Cases
- ✅ Rapid language switching
- ✅ RTL/LTR transitions
- ✅ Component mounting/unmounting during language changes
- ✅ Form validation during language switches
- ✅ Context usage outside provider

### Performance
- ✅ Translation function memoization
- ✅ Efficient DOM updates
- ✅ Memory leak prevention

## Running Tests

```bash
# Run all i18n tests
npm test src/i18n

# Run specific test file
npm test utils.test.ts

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode during development
npm test -- --watch src/i18n
```

## Test Utilities and Mocks

### Mock Strategy
The tests use focused mocking:
- Mock external dependencies (localStorage, DOM APIs)
- Mock sibling modules but test the integration between them
- Use real data structures where possible

### Test Setup
- `setup.ts` - Global test configuration and mocks
- Consistent beforeEach/afterEach cleanup
- Isolated test environments

### Test Data
Realistic translation data that matches the production structure, enabling thorough integration testing.

## Continuous Integration

These tests are designed to:
- Run quickly in CI environments
- Provide clear failure messages
- Catch regressions in i18n functionality
- Ensure accessibility compliance
- Validate performance characteristics

## Contributing

When adding new i18n features:
1. Write tests first (TDD)
2. Follow the existing test structure
3. Test both happy path and error scenarios
4. Update this documentation
5. Ensure all tests pass before submitting

The test suite serves as both quality assurance and living documentation of the i18n system's behavior.
