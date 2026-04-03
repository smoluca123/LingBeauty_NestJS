import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlogCommentDto {
  @ApiProperty({
    description: 'Updated comment content',
    example: 'Updated: Great article! Very informative.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
