import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BlogCommentReportStatus } from 'prisma/generated/prisma/client';

export class UpdateReportStatusDto {
  @ApiProperty({
    description: 'New status for the report',
    enum: BlogCommentReportStatus,
    example: BlogCommentReportStatus.RESOLVED,
  })
  @IsEnum(BlogCommentReportStatus)
  @IsNotEmpty()
  status!: BlogCommentReportStatus;
}
