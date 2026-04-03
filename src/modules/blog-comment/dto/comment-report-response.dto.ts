import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  BlogCommentReportReason,
  BlogCommentReportStatus,
} from 'prisma/generated/prisma/client';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';

class ReportCommentDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  postId: string;
}

export class BlogCommentReportResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  commentId: string;

  @Expose()
  @ApiProperty()
  reporterId: string;

  @Expose()
  @ApiProperty({ enum: BlogCommentReportReason })
  reason: BlogCommentReportReason;

  @Expose()
  @ApiPropertyOptional()
  description?: string;

  @Expose()
  @ApiProperty({ enum: BlogCommentReportStatus })
  status: BlogCommentReportStatus;

  @Expose()
  @ApiPropertyOptional()
  reviewedBy?: string;

  @Expose()
  @ApiPropertyOptional()
  reviewedAt?: Date;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({ type: UserResponseDto })
  reporter: UserResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiPropertyOptional({ type: UserResponseDto })
  reviewer?: UserResponseDto;

  @Expose()
  @Type(() => ReportCommentDto)
  @ApiProperty({ type: ReportCommentDto })
  comment: ReportCommentDto;
}
