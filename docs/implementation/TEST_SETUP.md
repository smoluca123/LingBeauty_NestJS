# Test Setup Guide - Soft Delete Implementation

## Prerequisites

This project uses both unit tests and property-based tests to ensure comprehensive coverage of soft delete functionality.

## Installing Dependencies

### Install fast-check for Property-Based Testing

```bash
npm install --save-dev fast-check
```

Or with yarn:

```bash
yarn add --dev fast-check
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:cov
```

### Run Specific Test File

```bash
# Unit tests
npm test -- user.service.spec.ts

# Property-based tests
npm test -- user.service.property.spec.ts
```

## Test Structure

### Unit Tests (`*.spec.ts`)

Unit tests verify specific scenarios and edge cases:

- **Location**: `server/src/modules/user/user.service.spec.ts`
- **Purpose**: Test specific methods with concrete examples
- **Coverage**:
  - Task 1.1-1.9: All user service methods with soft delete logic
  - Address operations with soft delete
  - Error handling for deleted records

### Property-Based Tests (`*.property.spec.ts`)

Property-based tests verify universal properties across all inputs:

- **Location**: `server/src/modules/user/user.service.property.spec.ts`
- **Purpose**: Test helper functions with randomly generated data
- **Iterations**: 100+ runs per property
- **Coverage**:
  - Property 1: Query Filtering with Helper Functions
  - Property 2: Soft Delete Operations Use Helper Functions
  - Property 7: Helper Function Behavior - withDeleted
  - Property 8: Helper Function Behavior - onlyDeleted
  - Property 9: Restore Functionality
  - Property 10: Existence Checks Filter Deleted Records
  - Property 11: Uniqueness Validation Excludes Deleted Records

## Test Coverage Goals

- **Line Coverage**: Minimum 80%
- **Branch Coverage**: Minimum 75%
- **Property Tests**: All 14 properties from design document

## Verifying Test Coverage

After running tests with coverage:

```bash
npm run test:cov
```

Open the coverage report:

```bash
# On Windows
start coverage/lcov-report/index.html

# On macOS
open coverage/lcov-report/index.html

# On Linux
xdg-open coverage/lcov-report/index.html
```

## Expected Test Results

### Unit Tests

All unit tests should pass, verifying:

- ✅ getAllUsers() filters deleted users
- ✅ getUserById() uses findFirst with isDeleted filter
- ✅ updateBanStatus() filters deleted users
- ✅ updateBanStatusBulk() filters deleted users
- ✅ updateAvatar() filters deleted users
- ✅ updateMe() validation queries filter deleted users
- ✅ updateUserById() validation queries filter deleted users
- ✅ createUserByAdmin() validation queries filter deleted users
- ✅ assignRolesToUser() filters deleted users and roles
- ✅ Address operations use soft delete
- ✅ getAllUserRoles() filters deleted roles

### Property-Based Tests

All property tests should pass 100+ iterations, verifying:

- ✅ withoutDeleted() adds isDeleted: false to any where clause
- ✅ withDeleted() returns where clause unchanged
- ✅ onlyDeleted() adds isDeleted: true to where clause
- ✅ softDeleteData() returns correct structure
- ✅ restoreData() returns correct structure
- ✅ Helper functions are idempotent
- ✅ Type safety is preserved
- ✅ Edge cases are handled correctly

## Troubleshooting

### fast-check not found

If you see errors about fast-check not being installed:

```bash
npm install --save-dev fast-check
```

### Tests timing out

Property-based tests run 100+ iterations. If tests timeout, you can:

1. Reduce iterations in specific tests (change `numRuns: 100` to lower value)
2. Increase Jest timeout in `package.json`:

```json
{
  "jest": {
    "testTimeout": 10000
  }
}
```

### Mock errors

If you see mock-related errors, ensure all dependencies are properly mocked in the test setup.

## Next Steps

After completing Task 1.10 and 1.11:

1. Verify all tests pass: `npm test`
2. Check coverage: `npm run test:cov`
3. Proceed to Task 2.1: Implement product.service.ts soft delete

## References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [fast-check Documentation](https://fast-check.dev/)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
