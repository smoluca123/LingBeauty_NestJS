-- Migration script to move User.avatarMediaId to UserAvatar table
-- Run this AFTER running: npx prisma migrate dev

-- Step 1: Create UserAvatar records from existing User.avatarMediaId
INSERT INTO user_avatars (id, user_id, media_id, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  id as user_id,
  avatar_media_id as media_id,
  NOW() as created_at,
  NOW() as updated_at
FROM users
WHERE avatar_media_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM user_avatars WHERE user_id = users.id
  );

-- Step 2: Verify migration
-- Check count matches
SELECT 
  (SELECT COUNT(*) FROM users WHERE avatar_media_id IS NOT NULL) as users_with_avatar,
  (SELECT COUNT(*) FROM user_avatars) as user_avatar_records;

-- Step 3: (Optional) Drop the old column after verifying everything works
-- WARNING: Only run this after thoroughly testing the application
-- ALTER TABLE users DROP COLUMN IF EXISTS avatar_media_id;

-- Step 4: Verify no orphaned records
SELECT 
  ua.id,
  ua.user_id,
  ua.media_id,
  u.email,
  m.url
FROM user_avatars ua
LEFT JOIN users u ON ua.user_id = u.id
LEFT JOIN media m ON ua.media_id = m.id
WHERE u.id IS NULL OR m.id IS NULL;
