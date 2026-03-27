-- Migration: Add default variants for products without variants
-- This ensures all products have at least one variant for flash sale and order compatibility

-- Step 1: Create default variants for products that don't have any variants
INSERT INTO product_variants (id, product_id, sku, name, color, size, type, price, display_type, sort_order, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  p.id as product_id,
  CONCAT(p.sku, '-DEFAULT') as sku,
  'Mặc định' as name,
  NULL as color,
  NULL as size,
  NULL as type,
  p.base_price as price,
  'COLOR' as display_type,
  0 as sort_order,
  NOW() as created_at,
  NOW() as updated_at
FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id
);

-- Step 2: Migrate product-level inventory to variant-level inventory
-- For products that now have default variants
INSERT INTO product_inventory (id, product_id, variant_id, quantity, display_status, low_stock_threshold, min_stock_quantity, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  pi.product_id,
  pv.id as variant_id,
  pi.quantity,
  pi.display_status,
  pi.low_stock_threshold,
  pi.min_stock_quantity,
  NOW() as created_at,
  NOW() as updated_at
FROM product_inventory pi
INNER JOIN product_variants pv ON pv.product_id = pi.product_id AND pv.sku LIKE CONCAT((SELECT sku FROM products WHERE id = pi.product_id), '-DEFAULT')
WHERE pi.variant_id IS NULL;

-- Step 3: Delete old product-level inventory records (now migrated to variant-level)
DELETE FROM product_inventory
WHERE variant_id IS NULL
AND EXISTS (
  SELECT 1 FROM product_variants pv 
  WHERE pv.product_id = product_inventory.product_id 
  AND pv.sku LIKE CONCAT((SELECT sku FROM products WHERE id = product_inventory.product_id), '-DEFAULT')
);

-- Step 4: Update FlashSaleProduct records to reference the default variant
-- For flash sale products that don't have a variant_id
UPDATE flash_sale_products fsp
SET variant_id = (
  SELECT pv.id 
  FROM product_variants pv 
  WHERE pv.product_id = fsp.product_id 
  AND pv.sku LIKE CONCAT((SELECT sku FROM products WHERE id = fsp.product_id), '-DEFAULT')
  LIMIT 1
)
WHERE fsp.variant_id IS NULL;
