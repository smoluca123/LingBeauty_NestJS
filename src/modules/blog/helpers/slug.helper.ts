import slugify from 'slugify';
import { PrismaService } from 'src/services/prisma/prisma.service';

/**
 * Generate a random alphanumeric string
 * @param length - Length of the random string
 * @returns Random string
 */
function generateRandomString(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Ensures a unique slug for blog topics or posts by checking database uniqueness
 * (including soft-deleted records) and appending a random string if duplicates exist.
 *
 * @param prismaService - Prisma service instance for database queries
 * @param text - The text to convert to a slug (e.g., topic name or post title)
 * @param model - The model type: 'topic' for BlogTopic or 'post' for BlogPost
 * @param excludeId - Optional ID to exclude from uniqueness check (for updates)
 * @returns A unique slug string
 *
 * @example
 * // Creating a new topic
 * const slug = await ensureUniqueSlug(prismaService, 'My Topic', 'topic');
 * // Result: 'my-topic' or 'my-topic-a3x9k2' if duplicate exists
 *
 * @example
 * // Updating an existing topic (exclude current ID from uniqueness check)
 * const slug = await ensureUniqueSlug(prismaService, 'Updated Topic', 'topic', existingTopicId);
 *
 * @example
 * // Creating a new post
 * const slug = await ensureUniqueSlug(prismaService, 'My Blog Post', 'post');
 * // Result: 'my-blog-post' or 'my-blog-post-b7y4m1' if duplicate exists
 *
 * @note This function checks ALL records including soft-deleted ones to ensure
 * slug uniqueness across the entire database, preventing conflicts when restoring deleted records.
 */
export async function ensureUniqueSlug(
  prismaService: PrismaService,
  text: string,
  model: 'topic' | 'post',
  excludeId?: string,
): Promise<string> {
  // Generate base slug from text
  const baseSlug = slugify(text, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let attempts = 0;
  const maxAttempts = 10;

  // Keep checking until we find a unique slug
  while (attempts < maxAttempts) {
    let existing;

    if (model === 'topic') {
      // Check ALL topics including soft-deleted ones
      existing = await prismaService.blogTopic.findFirst({
        where: {
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
        select: { id: true },
      });
    } else {
      // Check ALL posts including soft-deleted ones
      existing = await prismaService.blogPost.findFirst({
        where: {
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
        select: { id: true },
      });
    }

    // If no existing record found, slug is unique
    if (!existing) {
      break;
    }

    // Append random string and try again
    slug = `${baseSlug}-${generateRandomString(6)}`;
    attempts++;
  }

  return slug;
}
