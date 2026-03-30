import { PartialType } from '@nestjs/swagger';
import { CreateBlogTopicDto } from './create-blog-topic.dto';

export class UpdateBlogTopicDto extends PartialType(CreateBlogTopicDto) {}
