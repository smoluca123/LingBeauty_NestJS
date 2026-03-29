# Migration Guide - Schema Updates

## Tổng quan

Migration này bao gồm 3 thay đổi chính:

1. Thay đổi `onDelete: Cascade` → `onDelete: Restrict`
2. Thêm soft delete (`isDeleted`, `deletedAt`)
3. Tách User Avatar thành bảng riêng

## Bước 1: Backup Database

**QUAN TRỌNG**: Luôn backup database trước khi migration!

```bash
# PostgreSQL
pg_dump -U postgres -d lingbeauty -F c -b -v -f backup_$(date +%Y%m%d_%H%M%S).dump

# Hoặc SQL format
pg_dump -U postgres -d lingbeauty > backup_$(date +%Y%m%d_%H%M%S).sql
```

## Bước 2: Generate Prisma Client mới

```bash
cd server
npx prisma generate
```

## Bước 3: Tạo Migration

```bash
cd server
npx prisma migrate dev --name schema_improvements_v1
```

Prisma sẽ tự động:

- Tạo bảng `user_avatars`
- Thêm các column `isDeleted`, `deletedAt` vào các bảng
- Thay đổi foreign key constraints

## Bước 4: Migrate dữ liệu User Avatar

Sau khi migration schema thành công, chạy script migrate dữ liệu:

```bash
# Chạy migration script
psql -U postgres -d lingbeauty -f prisma/migrations/migrate-user-avatar.sql
```

Script này sẽ:

1. Copy dữ liệu từ `users.avatar_media_id` sang bảng `user_avatars`
2. Verify số lượng records
3. Check orphaned records

## Bước 5: Verify Migration

### 5.1. Check User Avatars

```sql
-- Kiểm tra số lượng avatars đã migrate
SELECT
  (SELECT COUNT(*) FROM users WHERE avatar_media_id IS NOT NULL) as old_count,
  (SELECT COUNT(*) FROM user_avatars) as new_count;

-- Xem sample data
SELECT
  u.email,
  u.avatar_media_id as old_avatar_id,
  ua.media_id as new_avatar_id,
  m.url as avatar_url
FROM users u
LEFT JOIN user_avatars ua ON ua.user_id = u.id
LEFT JOIN media m ON m.id = ua.media_id
WHERE u.avatar_media_id IS NOT NULL
LIMIT 10;
```

### 5.2. Check Soft Delete Columns

```sql
-- Verify soft delete columns exist
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE column_name IN ('is_deleted', 'deleted_at')
  AND table_schema = 'public'
ORDER BY table_name, column_name;
```

### 5.3. Check Foreign Key Constraints

```sql
-- Verify onDelete policies changed to Restrict
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;
```

## Bước 6: Test Application

### 6.1. Start Development Server

```bash
cd server
npm run start:dev
```

### 6.2. Test Avatar Upload

```bash
# Test upload avatar
curl -X POST http://localhost:3000/api/users/me/avatar \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.jpg"

# Test get user profile
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6.3. Test Soft Delete

```bash
# Test delete user (should soft delete)
curl -X DELETE http://localhost:3000/api/admin/users/USER_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Verify user is soft deleted
SELECT id, email, is_deleted, deleted_at FROM users WHERE id = 'USER_ID';
```

## Bước 7: Update Frontend Code (nếu cần)

### 7.1. Update Avatar Access

**Trước:**

```typescript
const avatarUrl = user.avatarMedia?.url;
```

**Sau:**

```typescript
const avatarUrl = user.avatar?.media?.url;
```

### 7.2. Update Type Definitions

```typescript
// Trước
interface User {
  avatarMedia?: Media;
}

// Sau
interface User {
  avatar?: {
    media: Media;
  };
}
```

## Bước 8: Deploy to Production

### 8.1. Pre-deployment Checklist

- [ ] Backup production database
- [ ] Test migration on staging environment
- [ ] Verify all tests pass
- [ ] Update environment variables if needed
- [ ] Notify team about deployment

### 8.2. Deployment Steps

```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
cd server
npm install

# 3. Generate Prisma Client
npx prisma generate

# 4. Run migration
npx prisma migrate deploy

# 5. Run avatar migration script
psql -U $DB_USER -d $DB_NAME -f prisma/migrations/migrate-user-avatar.sql

# 6. Restart application
pm2 restart lingbeauty-api
```

## Bước 9: Monitor & Rollback Plan

### 9.1. Monitor Application

```bash
# Check application logs
pm2 logs lingbeauty-api

# Check database connections
SELECT count(*) FROM pg_stat_activity WHERE datname = 'lingbeauty';

# Check for errors
SELECT * FROM pg_stat_database WHERE datname = 'lingbeauty';
```

### 9.2. Rollback (nếu cần)

```bash
# 1. Stop application
pm2 stop lingbeauty-api

# 2. Restore database from backup
pg_restore -U postgres -d lingbeauty -c backup_TIMESTAMP.dump

# 3. Revert code
git revert HEAD
git push origin main

# 4. Restart application
pm2 start lingbeauty-api
```

## Troubleshooting

### Issue 1: Migration fails with foreign key constraint error

**Giải pháp:**

```sql
-- Temporarily disable foreign key checks
SET session_replication_role = 'replica';

-- Run migration
-- ...

-- Re-enable foreign key checks
SET session_replication_role = 'origin';
```

### Issue 2: Avatar migration creates duplicates

**Giải pháp:**

```sql
-- Remove duplicates, keep the first one
DELETE FROM user_avatars
WHERE id NOT IN (
  SELECT MIN(id)
  FROM user_avatars
  GROUP BY user_id
);
```

### Issue 3: Soft delete middleware not working

**Kiểm tra:**

1. Verify middleware is registered in PrismaService
2. Check model name is in SOFT_DELETE_MODELS array
3. Restart application

### Issue 4: Old avatar_media_id column still exists

**Giải pháp:**

```sql
-- Only run this after verifying everything works!
ALTER TABLE users DROP COLUMN IF EXISTS avatar_media_id;
```

## Performance Considerations

### Index Optimization

```sql
-- Add indexes for soft delete queries
CREATE INDEX CONCURRENTLY idx_users_is_deleted ON users(is_deleted) WHERE is_deleted = false;
CREATE INDEX CONCURRENTLY idx_products_is_deleted ON products(is_deleted) WHERE is_deleted = false;
CREATE INDEX CONCURRENTLY idx_orders_is_deleted ON orders(is_deleted) WHERE is_deleted = false;

-- Add index for user avatar lookup
CREATE INDEX CONCURRENTLY idx_user_avatars_user_id ON user_avatars(user_id);
CREATE INDEX CONCURRENTLY idx_user_avatars_media_id ON user_avatars(media_id);
```

### Query Optimization

Middleware tự động thêm `isDeleted: false` vào queries, nhưng bạn có thể tắt nếu cần:

```typescript
// Query including deleted records
const allUsers = await prisma.user.findMany({
  where: {
    isDeleted: undefined, // This will include deleted records
  },
});

// Or use helper function
import { withDeleted } from 'src/libs/prisma/prisma-middleware';
const allUsers = await withDeleted(prisma.user, {});
```

## Post-Migration Tasks

### 1. Update Documentation

- [ ] Update API documentation
- [ ] Update database schema diagrams
- [ ] Update developer onboarding docs

### 2. Clean Up (sau 1-2 tuần)

```sql
-- Drop old avatar_media_id column (optional)
ALTER TABLE users DROP COLUMN IF EXISTS avatar_media_id;

-- Archive old soft-deleted records (optional)
-- Move records deleted > 90 days to archive table
```

### 3. Monitor Performance

- Check query performance with new indexes
- Monitor database size growth
- Check application response times

## Support

Nếu gặp vấn đề trong quá trình migration:

1. Check logs: `pm2 logs lingbeauty-api`
2. Check database: `psql -U postgres -d lingbeauty`
3. Contact team lead
4. Refer to backup and rollback procedures

## Changelog

- **2026-03-29**: Initial migration guide created
  - Added soft delete support
  - Separated UserAvatar table
  - Changed foreign key constraints to Restrict
