import { Module } from '@nestjs/common';
import { BlogTopicService } from './blog-topic.service';
import { BlogPostService } from './blog-post.service';
import { BlogSeedingService } from './blog-seeding.service';
import { BlogTopicController } from './blog-topic.controller';
import { PublicBlogTopicController } from './public-blog-topic.controller';
import { BlogPostController } from './blog-post.controller';
import { PublicBlogPostController } from './public-blog-post.controller';
import { BlogSeedingController } from './blog-seeding.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { StorageModule } from 'src/modules/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [
    BlogTopicController,
    PublicBlogTopicController,
    BlogPostController,
    PublicBlogPostController,
    BlogSeedingController,
  ],
  providers: [BlogTopicService, BlogPostService, BlogSeedingService],
  exports: [BlogTopicService, BlogPostService],
})
export class BlogModule {}
