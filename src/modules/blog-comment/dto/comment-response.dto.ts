import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';

export class BlogCommentResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  postId: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiPropertyOptional()
  parentId?: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @Expose()
  @Type(() => BlogCommentResponseDto)
  @ApiPropertyOptional({ type: [BlogCommentResponseDto] })
  replies?: BlogCommentResponseDto[];
}
