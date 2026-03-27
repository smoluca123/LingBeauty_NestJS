# Backend Changes Needed for Default Variant Model

## ✅ Completed Changes

### 1. Product Service

- ✅ Auto-create default variant when creating product without variants
- ✅ SKU: `{PRODUCT_SKU}-DEFAULT`, Name: `Mặc định`

### 2. Flash Sale Service

- ✅ Auto-select default variant if variantId not provided
- ✅ Updated `addProductsToFlashSale` method

### 3. Cart Service

- ✅ Auto-select default variant in `addToCart` if variantId not provided
- ✅ Updated `getActiveFlashSaleMap` to not generate `_null` keys
- ✅ Updated `mapCartItem` to use variant inventory only

### 4. Order Service

- ✅ Already requires variantId - no changes needed

### 5. System Service

- ✅ Migration API endpoints created
- ✅ `GET /api/system/migration/default-variants/status`
- ✅ `POST /api/system/migration/default-variants`

### 6. Schema

- ✅ `FlashSaleProduct.variantId`: `String?` → `String` (required)

---

## ⚠️ Changes Needed (After Migration)

### 1. Inventory Service

**Current State:** Has separate methods for product-level and variant-level inventory

**After Migration:** Product-level inventory methods will return empty results

**Methods to Update/Deprecate:**

```typescript
// These methods query variantId: null - will be empty after migration
-getProductInventory(productId) - // Line 72
  updateProductInventory(productId, dto) - // Line 106
  adjustProductInventory(productId, dto) - // Line 158
  getAllProducts(query) - // Line 456 - variantId: null
  getLowStockProducts(query) - // Line 571 - variantId IS NULL
  getOutOfStockProducts(query); // Line 714 - variantId: null
```

**Recommended Actions:**

**Option A: Deprecate product-level methods**

- Add deprecation warnings
- Update docs to use variant-level methods
- Frontend should always pass variantId

**Option B: Redirect to default variant**

- When productId provided without variantId, find default variant
- Use variant-level inventory methods internally

**Example for Option B:**

```typescript
async getProductInventory(productId: string) {
  // Find default variant
  const defaultVariant = await this.prismaService.productVariant.findFirst({
    where: {
      productId,
      OR: [
        { sku: { endsWith: '-DEFAULT' } },
        { sortOrder: 0 }
      ]
    },
    orderBy: [{ sku: 'asc' }, { sortOrder: 'asc' }]
  });

  if (!defaultVariant) {
    throw new BusinessException('Product has no variants');
  }

  // Use variant inventory method
  return this.getVariantInventory(defaultVariant.id);
}
```

### 2. Product Service

**Methods with product-level inventory logic:**

```typescript
// Line 1191: deleteMany where variantId: null
- updateProduct() - removes product-level inventory when adding variants

// Line 1294: findFirst where variantId: null
- updateProduct() - updates product-level inventory

// Line 2426, 2436: Comments mention "product-level inventory"
- mapProductEntity()
- mapProductListEntity()
```

**Recommended Actions:**

1. **updateProduct method:**
   - Remove logic that deletes `variantId: null` inventory (Line 1191)
   - Remove logic that creates/updates `variantId: null` inventory (Line 1294-1321)
   - After migration, all products have variants, so this code path won't execute

2. **Mapping methods:**
   - Update comments to reflect variant-level inventory
   - Ensure inventory[0] returns default variant's inventory

### 3. Cart Service

**Remaining product-level logic:**

```typescript
// Line 55: resolveItemInventory still accepts variantId: string | null
- resolveItemInventory(variantId, productId, variantInventory)

// Line 89: Queries variantId: null
- No-variant product fallback in resolveItemInventory

// Line 528: Passes null for variantId
- updateCartItem() - item.variant ? item.variantId : null
```

**Recommended Actions:**

1. **resolveItemInventory:**
   - Change signature: `variantId: string | null` → `variantId: string`
   - Remove fallback to product-level inventory (Line 88-95)
   - After migration, all cart items have variantId

2. **updateCartItem:**
   - Remove ternary: `item.variant ? item.variantId : null`
   - Use `item.variantId` directly (always exists after migration)

---

## 🔄 Migration Workflow

### Before Migration

1. ✅ Deploy code changes (product, flash-sale, cart services)
2. ✅ Test on staging with new products
3. ✅ Backup production database

### Run Migration

1. ✅ Call `GET /api/system/migration/default-variants/status`
2. ✅ Call `POST /api/system/migration/default-variants`
3. ✅ Verify `needsMigration: false`

### After Migration

1. ⚠️ Update/deprecate inventory service methods
2. ⚠️ Clean up product service updateProduct logic
3. ⚠️ Simplify cart service resolveItemInventory
4. ⚠️ Update API documentation
5. ⚠️ Update frontend to always use variantId

---

## 📝 API Documentation Updates Needed

### Endpoints to Update Docs

1. **POST /api/cart/add**
   - Update: `variantId` is optional, will auto-select default variant
   - Add note: "If not provided, uses default variant"

2. **POST /api/admin/flash-sales/:id/products**
   - Update: `variantId` is optional, will auto-select default variant
   - Add note: "If not provided, uses default variant"

3. **Inventory endpoints**
   - Deprecate product-level endpoints OR
   - Update docs to mention they redirect to default variant

---

## 🧪 Testing Checklist

### After Migration

- [ ] Create new product without variants → Has default variant
- [ ] Add product to cart without variantId → Uses default variant
- [ ] Add product to flash sale without variantId → Uses default variant
- [ ] Create order with flash sale product → Works correctly
- [ ] Check inventory for default variant → Shows correct quantity
- [ ] Update inventory for default variant → Updates correctly
- [ ] Product listing shows correct price (from default variant)
- [ ] Cart shows correct price (from default variant)

### Inventory Service

- [ ] Call product-level inventory methods → Returns default variant data OR empty
- [ ] Call variant-level inventory methods → Works as before
- [ ] Low stock alerts → Works for default variants
- [ ] Out of stock status → Works for default variants

---

## 🚨 Breaking Changes

### For Frontend

1. **Product Display:**
   - Products now always have at least 1 variant
   - May need to hide default variant in UI if it's the only variant
   - Check if variant name is "Mặc định" and SKU ends with "-DEFAULT"

2. **Cart:**
   - Can still call add-to-cart without variantId (backend auto-selects)
   - Response will always include variant info (may be default variant)

3. **Flash Sale:**
   - Can still add products without variantId (backend auto-selects)
   - All flash sale products now have variantId in response

4. **Inventory:**
   - Product-level inventory endpoints may be deprecated
   - Use variant-level endpoints with default variant ID

---

## 📚 Related Documentation

- [Default Variant Implementation](./default-variant-implementation.md)
- [Migration API Guide](./migration-api-guide.md)
- [Migration Quick Start](./MIGRATION-QUICK-START.md)
- [Migration Summary](../MIGRATION-SUMMARY.md)
