import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BlogCommentReportReason } from 'prisma/generated/prisma/client';

export class CreateCommentReportDto {
  @ApiProperty({
    description: 'Comment ID to report',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  commentId: string;

  @ApiProperty({
    description: 'Reason for reporting',
    enum: BlogCommentReportReason,
    example: BlogCommentReportReason.SPAM,
  })
  @IsEnum(BlogCommentReportReason)
  @IsNotEmpty()
  reason: BlogCommentReportReason;

  @ApiPropertyOptional({
    description: 'Additional description about the report',
    example: 'This comment contains spam links',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
