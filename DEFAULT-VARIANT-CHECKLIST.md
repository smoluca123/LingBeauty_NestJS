# Default Variant Implementation Checklist

## Phase 1: Code Changes ✅

- [x] Update Product Service
  - [x] Auto-create default variant in `createProduct`
  - [x] Default variant: SKU `{PRODUCT_SKU}-DEFAULT`, Name `Mặc định`

- [x] Update Flash Sale Service
  - [x] Auto-select default variant in `addProductsToFlashSale`
  - [x] Prioritize variant with `-DEFAULT` suffix

- [x] Update Cart Service
  - [x] Auto-select default variant in `addToCart`
  - [x] Update `getActiveFlashSaleMap` (remove `_null` keys)
  - [x] Update `mapCartItem` (use variant inventory only)

- [x] Update Schema
  - [x] `FlashSaleProduct.variantId`: `String?` → `String`

- [x] Create Migration Service
  - [x] Migration logic in System Service
  - [x] API endpoint: `GET /api/system/migration/default-variants/status`
  - [x] API endpoint: `POST /api/system/migration/default-variants`

- [x] Create Documentation
  - [x] Implementation guide
  - [x] Migration API guide
  - [x] Quick start guide
  - [x] Backend changes needed
  - [x] Summary documents

## Phase 2: Testing (Staging) ⏳

- [ ] Test Product Creation
  - [ ] Create product without variants → Has default variant
  - [ ] Create product with variants → Works as before
  - [ ] Check default variant: SKU ends with `-DEFAULT`
  - [ ] Check default variant: Name is `Mặc định`
  - [ ] Check inventory: Migrated to variant-level

- [ ] Test Cart
  - [ ] Add product to cart without variantId → Uses default variant
  - [ ] Add product to cart with variantId → Works as before
  - [ ] Cart displays correct price (from variant)
  - [ ] Cart displays correct inventory (from variant)

- [ ] Test Flash Sale
  - [ ] Add product to flash sale without variantId → Uses default variant
  - [ ] Add product to flash sale with variantId → Works as before
  - [ ] Flash sale displays correct price
  - [ ] Flash sale quantity limits work correctly

- [ ] Test Order
  - [ ] Create order with flash sale product → Works correctly
  - [ ] Create order with regular product → Works correctly
  - [ ] Inventory decrements correctly
  - [ ] Flash sale sold quantity updates correctly

- [ ] Test Migration API
  - [ ] Check status before migration → Shows products needing migration
  - [ ] Run migration → Completes successfully
  - [ ] Check status after migration → needsMigration: false
  - [ ] Verify products have default variants
  - [ ] Verify inventory migrated
  - [ ] Verify flash sale products updated

## Phase 3: Production Migration ⏳

- [ ] Pre-Migration
  - [ ] Review all code changes
  - [ ] Backup production database
  - [ ] Schedule maintenance window (optional)
  - [ ] Notify team

- [ ] Migration
  - [ ] Call status API: `GET /api/system/migration/default-variants/status`
  - [ ] Record current state (products without variants, etc.)
  - [ ] Call migration API: `POST /api/system/migration/default-variants`
  - [ ] Monitor logs during migration
  - [ ] Verify completion (no errors in response)

- [ ] Post-Migration Verification
  - [ ] Call status API again → needsMigration: false
  - [ ] Check sample products have default variants
  - [ ] Check inventory migrated correctly
  - [ ] Check flash sale products have variantId
  - [ ] Test cart flow
  - [ ] Test order flow
  - [ ] Test flash sale flow

- [ ] Monitoring
  - [ ] Monitor error logs for 24 hours
  - [ ] Monitor cart conversion rate
  - [ ] Monitor order creation rate
  - [ ] Check for any user-reported issues

## Phase 4: Frontend Updates ⏳

- [ ] Product Display
  - [ ] Hide default variant if it's the only variant
  - [ ] Show variant selector if multiple variants
  - [ ] Display correct price from variant
  - [ ] Handle products with only default variant

- [ ] Cart
  - [ ] Update add-to-cart to handle optional variantId
  - [ ] Display variant info (may be default variant)
  - [ ] Show correct price and inventory

- [ ] Flash Sale
  - [ ] Update flash sale product display
  - [ ] Handle products with default variant
  - [ ] Show correct flash sale price

- [ ] Product Listing
  - [ ] Display price from default variant
  - [ ] Handle price range for multi-variant products
  - [ ] Show correct inventory status

## Phase 5: Cleanup (Optional) ⏳

- [ ] Inventory Service
  - [ ] Deprecate product-level inventory methods OR
  - [ ] Update to redirect to default variant
  - [ ] Update API documentation

- [ ] Product Service
  - [ ] Remove unused product-level inventory code
  - [ ] Clean up comments
  - [ ] Update documentation

- [ ] Cart Service
  - [ ] Simplify `resolveItemInventory` (remove null checks)
  - [ ] Update method signatures
  - [ ] Clean up comments

- [ ] Documentation
  - [ ] Update API docs
  - [ ] Update README
  - [ ] Add migration notes to changelog

## Rollback Plan 🔄

If issues occur:

- [ ] Stop accepting new orders (optional)
- [ ] Restore database from backup
  ```bash
  psql -U user -d database < backup.sql
  ```
- [ ] Revert code changes
  ```bash
  git revert <commit-hash>
  ```
- [ ] Regenerate Prisma client
  ```bash
  cd server && npx prisma generate
  ```
- [ ] Restart server
- [ ] Verify system is working
- [ ] Investigate issues
- [ ] Plan retry

## Success Criteria ✅

- [ ] All products have at least 1 variant
- [ ] No product-level inventory (variantId: null)
- [ ] All flash sale products have variantId
- [ ] Cart flow works correctly
- [ ] Order flow works correctly
- [ ] No increase in error rate
- [ ] No user-reported issues
- [ ] Frontend displays correctly

## Notes

- Migration is idempotent (can run multiple times)
- Each product processed in separate transaction
- Failed products logged but don't stop migration
- Can run migration again for failed products after fixing issues

## Timeline

- **Phase 1**: ✅ Completed
- **Phase 2**: ⏳ In Progress (Staging Testing)
- **Phase 3**: ⏳ Pending (Production Migration)
- **Phase 4**: ⏳ Pending (Frontend Updates)
- **Phase 5**: ⏳ Pending (Cleanup)

## Contact

For questions or issues:

- Check logs: `tail -f logs/application.log`
- Review docs: `server/docs/`
- Check migration status API
