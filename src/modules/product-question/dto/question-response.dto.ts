import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductQuestionStatus } from 'prisma/generated/prisma/client';

class UserBasicDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

class ProductBasicDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty({ nullable: true })
  @Expose()
  thumbnail: string | null;
}

export class QuestionResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  productId: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  question: string;

  @ApiProperty()
  @Expose()
  answer: string | null;

  @ApiProperty()
  @Expose()
  answeredBy: string | null;

  @ApiProperty({ enum: ProductQuestionStatus })
  @Expose()
  status: ProductQuestionStatus;

  @ApiProperty()
  @Expose()
  isPublic: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: UserBasicDto })
  @Expose()
  @Type(() => UserBasicDto)
  user: UserBasicDto;

  @ApiProperty({ type: UserBasicDto, nullable: true })
  @Expose()
  @Type(() => UserBasicDto)
  answeredByUser: UserBasicDto | null;
}

export class QuestionWithProductResponseDto extends QuestionResponseDto {
  @ApiProperty({ type: ProductBasicDto })
  @Expose()
  @Type(() => ProductBasicDto)
  product: ProductBasicDto;
}
