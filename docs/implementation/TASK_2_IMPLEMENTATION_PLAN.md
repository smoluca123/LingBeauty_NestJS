# Task 2 Implementation Plan: Product Service Soft Delete

## Overview

The product.service.ts file is **2491 lines** and contains **partial** soft delete implementation. This document outlines the systematic approach to complete all remaining tasks.

## Completed Tasks

### ✅ Task 2.2: Update findUnique to findFirst

- `getProductById()` - Changed to `findFirst` ✅
- `getProductBySlug()` - Changed to `findFirst` ✅

## Remaining Critical Tasks

### 🔴 HIGH PRIORITY: Task 2.7 - Cascading Soft Delete

**Current Implementation**:

```typescript
async deleteProduct(productId: string) {
  // Only soft deletes the product, NOT the variants
  await this.prismaService.product.update({
    where: { id: productId },
    data: softDeleteData(),
  });
}
```

**Required Implementation**:

```typescript
async deleteProduct(productId: string) {
  // Verify product exists and is not deleted
  const existing = await this.prismaService.product.findFirst({
    where: withoutDeleted({ id: productId }),
    select: productSelect,
  });

  if (!existing) {
    throw new BusinessException(
      ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
      ERROR_CODES.PRODUCT_NOT_FOUND,
    );
  }

  // Check if product has orders
  const ordersCount = await this.prismaService.orderItem.count({
    where: { productId },
  });

  if (ordersCount > 0) {
    throw new BusinessException(
      ERROR_MESSAGES[ERROR_CODES.PRODUCT_HAS_ORDERS],
      ERROR_CODES.PRODUCT_HAS_ORDERS,
    );
  }

  // Cascading soft delete in transaction
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

  const productResponse = this.mapProductEntity(existing);

  return {
    type: 'response',
    message: 'Xóa sản phẩm thành công',
    data: productResponse,
  };
}
```

### 🔴 HIGH PRIORITY: Task 2.8 - Variant Soft Delete

**Current Implementation**:

```typescript
async deleteProductVariant(productId: string, variantId: string) {
  // Hard delete - WRONG!
  await this.prismaService.productVariant.delete({
    where: { id: variantId },
  });
}
```

**Required Implementation**:

```typescript
async deleteProductVariant(productId: string, variantId: string) {
  // Check if variant exists and belongs to product
  const existingVariant = await this.prismaService.productVariant.findFirst({
    where: withoutDeleted({ id: variantId, productId }),
    select: { id: true },
  });

  if (!existingVariant) {
    throw new BusinessException(
      ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND],
      ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND,
    );
  }

  // Check if variant has orders
  const ordersCount = await this.prismaService.orderItem.count({
    where: { variantId },
  });

  if (ordersCount > 0) {
    throw new BusinessException(
      ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_HAS_ORDERS],
      ERROR_CODES.PRODUCT_VARIANT_HAS_ORDERS,
    );
  }

  // Soft delete the variant
  await this.prismaService.productVariant.update({
    where: { id: variantId },
    data: softDeleteData(),
  });

  return {
    type: 'response',
    message: 'Xóa biến thể sản phẩm thành công',
    data: { message: 'Xóa biến thể sản phẩm thành công' },
  };
}
```

## Medium Priority Tasks

### Task 2.1: Add isDeleted filters to queries

**Methods needing updates**:

1. **getFilterCategories()** - Line ~280

```typescript
// Add to category query
const categories = await this.prismaService.category.findMany({
  where: withoutDeleted({
    id: { in: categoryIds },
    isActive: true,
  }),
  // ...
});
```

2. **getProductVariants()** - Line ~2200

```typescript
const variants = await this.prismaService.productVariant.findMany({
  where: withoutDeleted({ productId }),
  orderBy: { sortOrder: 'asc' },
  select: productVariantSelect,
});
```

3. **Fallback queries in hot products methods** - Lines ~500-700

```typescript
// In getProductsBySales, getProductsByRevenue, etc.
return this.prismaService.product.findMany({
  where: withoutDeleted({ ...baseWhere, isFeatured: true }),
  select: productListSelect,
  take: limit,
  orderBy: { createdAt: 'desc' },
});
```

### Task 2.9-2.10: Update validation queries

**Methods needing updates**:

1. **createProduct() - Category validation** - Line ~900

```typescript
const categories = await this.prismaService.category.findMany({
  where: withoutDeleted({ id: { in: createProductDto.categoryIds } }),
  select: { id: true },
});
```

2. **updateProduct() - Category validation** - Line ~1100

```typescript
const categories = await this.prismaService.category.findMany({
  where: withoutDeleted({ id: { in: updateProductDto.categoryIds } }),
  select: { id: true },
});
```

3. **addProductVariant() - SKU check** - Line ~2250

```typescript
const existingSku = await this.prismaService.productVariant.findFirst({
  where: withoutDeleted({ sku: productSku }),
  select: { id: true },
});
```

4. **ensureUniqueSlug()** - Line ~2450

```typescript
const existing = await this.prismaService.product.findFirst({
  where: withoutDeleted({
    slug,
    ...(excludeProductId ? { id: { not: excludeProductId } } : {}),
  }),
  select: { id: true },
});
```

## Implementation Strategy

Given the file size and complexity, I recommend:

### Option 1: Incremental Updates (RECOMMENDED)

1. ✅ Complete Task 2.2 (findUnique → findFirst) - DONE
2. 🔴 Complete Task 2.7 (Cascading delete) - CRITICAL
3. 🔴 Complete Task 2.8 (Variant soft delete) - CRITICAL
4. 🟡 Complete Task 2.1 (Query filters) - MEDIUM
5. 🟡 Complete Task 2.9-2.10 (Validation) - MEDIUM
6. ✅ Write comprehensive tests
7. ✅ Run diagnostics and fix any issues

### Option 2: Bulk Replacement

- Create a new version of the entire file with all changes
- Risk: Higher chance of introducing bugs
- Benefit: Faster completion

## Next Steps

1. **Apply Task 2.7 changes** (Cascading delete)
2. **Apply Task 2.8 changes** (Variant soft delete)
3. **Apply remaining query filters** (Tasks 2.1, 2.9-2.10)
4. **Run getDiagnostics** to verify no TypeScript errors
5. **Create comprehensive test suite**
6. **Mark all tasks as complete**

## Estimated Time

- Task 2.7: 10 minutes
- Task 2.8: 5 minutes
- Task 2.1, 2.9-2.10: 15 minutes
- Testing: 20 minutes
- **Total**: ~50 minutes

## Risk Assessment

- **Low Risk**: Query filter additions (reversible, no data loss)
- **Medium Risk**: findUnique → findFirst (type changes)
- **HIGH Risk**: Cascading delete logic (affects data integrity)

## Testing Requirements

Must test:

1. Product deletion cascades to variants
2. Variant deletion uses soft delete
3. Deleted products don't appear in queries
4. Deleted variants don't appear in queries
5. Uniqueness checks exclude deleted records
6. Category/Brand validation excludes deleted records

---

**Status**: Ready to proceed with implementation
**Next Action**: Apply Task 2.7 changes
