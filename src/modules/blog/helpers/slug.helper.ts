import slugify from 'slugify';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { withoutDeleted } from 'src/libs/prisma/soft-delete.helpers';

/**
 * Ensures a unique slug for blog topics or posts by checking database uniqueness
 * and appending a counter if duplicates exist.
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
 * // Result: 'my-topic' or 'my-topic-1' if duplicate exists
 *
 * @example
 * // Updating an existing topic (exclude current ID from uniqueness check)
 * const slug = await ensureUniqueSlug(prismaService, 'Updated Topic', 'topic', existingTopicId);
 *
 * @example
 * // Creating a new post
 * const slug = await ensureUniqueSlug(prismaService, 'My Blog Post', 'post');
 * // Result: 'my-blog-post' or 'my-blog-post-1' if duplicate exists
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
  let counter = 1;

  // Keep checking until we find a unique slug
  while (true) {
    let existing;

    if (model === 'topic') {
      existing = await prismaService.blogTopic.findFirst({
        where: withoutDeleted({
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        }),
        select: { id: true },
      });
    } else {
      existing = await prismaService.blogPost.findFirst({
        where: withoutDeleted({
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        }),
        select: { id: true },
      });
    }

    // If no existing record found, slug is unique
    if (!existing) {
      break;
    }

    // Append counter and try again
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}
