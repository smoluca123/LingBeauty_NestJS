import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AnswerQuestionDto {
  @ApiProperty({
    example: 'Yes, this product is completely suitable for sensitive skin.',
    description: 'The content of the answer',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description:
      'ID of the admin who is answering (optional, defaults to current admin)',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  answeredBy?: string;
}
