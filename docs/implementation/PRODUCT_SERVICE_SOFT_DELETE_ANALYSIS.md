# Product Service Soft Delete Analysis

## Current Status

The product.service.ts file has **partial** soft delete implementation. Some methods already use `withoutDeleted()` and `softDeleteData()`, but many are missing.

## Methods Analysis

### ✅ Already Implemented (Correct)

1. `getAllProducts()` - Uses `withoutDeleted()` ✅
2. `getProductById()` - Uses `withoutDeleted()` with findUnique ⚠️ (should use findFirst)
3. `getProductBySlug()` - Uses `withoutDeleted()` with findUnique ⚠️ (should use findFirst)
4. `createProduct()` - Validates brand with `withoutDeleted()` ✅
5. `createProduct()` - Fetches variants with `withoutDeleted()` ✅
6. `createProduct()` - Re-fetches product with `withoutDeleted()` ✅
7. `updateProduct()` - Validates brand with `withoutDeleted()` ✅
8. `deleteProduct()` - Uses `softDeleteData()` ✅

### ❌ Missing Soft Delete Logic

#### Query Methods (Need withoutDeleted)

1. `getFilterCategories()` - Missing `isDeleted` filter for categories
2. `getProductStats()` - Missing `isDeleted` filter
3. `getHotProducts()` - Uses `withoutDeleted()` in baseWhere ✅ but missing in fallback queries
4. `getProductsBySales()` - Missing `isDeleted` filter in fallback
5. `getProductsByRevenue()` - Missing `isDeleted` filter in fallback
6. `getProductsByReviewCount()` - Missing `isDeleted` filter in fallback
7. `getProductsByRating()` - Missing `isDeleted` filter in fallback
8. `getProductsByCompositeScore()` - Missing `isDeleted` filter for reviews

#### Variant Methods

9. `getProductVariants()` - Missing `isDeleted` filter
10. `addProductVariant()` - Missing `isDeleted` filter for variant SKU check
11. `updateProductVariant()` - Missing `isDeleted` filter for variant lookup
12. `deleteProductVariant()` - Should use `softDeleteData()` instead of hard delete

#### Category/Brand Validation

13. `createProduct()` - Missing `isDeleted` filter for category validation
14. `updateProduct()` - Missing `isDeleted` filter for category validation

#### Private Methods

15. `ensureUniqueSlug()` - Missing `isDeleted` filter

## Required Changes

### Task 2.1: Update all findMany/findFirst queries

**Files to modify**: product.service.ts

**Changes needed**:

1. Add `isDeleted: false` filter to all category queries
2. Add `isDeleted: false` filter to all variant queries
3. Add `isDeleted: false` filter to fallback queries in hot products methods
4. Add `isDeleted: false` filter to review queries in composite score

### Task 2.2: Update all findUnique to findFirst

**Changes needed**:

1. `getProductById()` - Change `findUnique` to `findFirst`
2. `getProductBySlug()` - Change `findUnique` to `findFirst`

### Task 2.3-2.6: Update specific query methods

Already mostly done, just need to add filters to nested queries.

### Task 2.7: Implement deleteProduct() with cascading soft delete

**Current**: Uses `softDeleteData()` but doesn't cascade to variants

**Need to add**:

```typescript
await this.prismaService.$transaction([
  // Soft delete all variants first
  this.prismaService.productVariant.updateMany({
    where: { productId },
    data: softDeleteData(),
  }),
  // Then soft delete product
  this.prismaService.product.update({
    where: { id: productId },
    data: softDeleteData(),
  }),
]);
```

### Task 2.8: Implement deleteVariant() with softDeleteData()

**Current**: Uses hard delete

**Need to change**:

```typescript
await this.prismaService.productVariant.update({
  where: { id: variantId },
  data: softDeleteData(),
});
```

### Task 2.9-2.10: Update validation queries

Add `withoutDeleted()` to:

- Category existence checks
- Variant SKU uniqueness checks
- Product slug uniqueness checks

## Priority Order

1. **HIGH**: Task 2.7 (Cascading delete) - Critical for data integrity
2. **HIGH**: Task 2.8 (Variant soft delete) - Critical for data integrity
3. **MEDIUM**: Task 2.2 (findUnique → findFirst) - Type safety
4. **MEDIUM**: Task 2.1 (Query filters) - Data consistency
5. **LOW**: Task 2.9-2.10 (Validation) - Edge cases

## Estimated Changes

- **Lines to modify**: ~50-60 lines
- **Methods to update**: ~15 methods
- **New transaction logic**: 1 method (deleteProduct)
- **Test cases needed**: ~20 unit tests
