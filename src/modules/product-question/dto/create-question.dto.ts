import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID của sản phẩm',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 'Sản phẩm này có phù hợp với da nhạy cảm không?',
    description: 'Nội dung câu hỏi',
  })
  @IsString()
  @IsNotEmpty()
  question: string;
}
