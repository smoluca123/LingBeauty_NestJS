import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    example: 'Sản phẩm này có phù hợp với da nhạy cảm không?',
    description: 'Nội dung câu hỏi cập nhật',
  })
  @IsString()
  @IsNotEmpty()
  question: string;
}
