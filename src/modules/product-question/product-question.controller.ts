import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  ProductQuestionService,
  GetQuestionsParams,
} from './product-question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AnswerQuestionDto } from './dto/answer-question.dto';
import {
  QuestionResponseDto,
  QuestionWithProductResponseDto,
} from './dto/question-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import { ShouldSkipIfNoAccessToken } from 'src/decorators/shouldSkipIfNoAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { normalizePaginationParams } from 'src/libs/utils/utils';
import { ProductQuestionStatus } from 'prisma/generated/prisma/client';
import {
  ApiGetQuestions,
  ApiGetMyQuestions,
  ApiGetQuestion,
  ApiCreateQuestion,
  ApiUpdateQuestion,
  ApiDeleteQuestion,
  ApiAnswerQuestion,
  ApiUpdateAnswer,
  ApiDeleteQuestionByAdmin,
  ApiGetPublicProductQuestions,
} from './decorators/product-question.decorators';

@ApiTags('Product Question Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('product-question')
export class ProductQuestionController {
  constructor(private readonly questionService: ProductQuestionService) {}

  @Get()
  @ApiGetQuestions()
  getQuestions(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('productId') productId?: string,
    @Query('userId') userId?: string,
    @Query('status') status?: ProductQuestionStatus,
    @Query('sortBy') sortBy?: 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<QuestionResponseDto>> {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });

    const params: GetQuestionsParams = {
      page: normalizedPage,
      limit: normalizedLimit,
      productId,
      userId,
      status,
      sortBy,
      order,
    };

    return this.questionService.getQuestions(params);
  }

  @Get('my-questions')
  @ApiGetMyQuestions()
  getMyQuestions(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: ProductQuestionStatus,
    @Query('sortBy') sortBy?: 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<
    IBeforeTransformPaginationResponseType<QuestionWithProductResponseDto>
  > {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });

    return this.questionService.getMyQuestions(decodedAccessToken.userId, {
      page: normalizedPage,
      limit: normalizedLimit,
      status,
      sortBy,
      order,
    });
  }

  @Get(':id')
  @ApiGetQuestion()
  getQuestion(
    @Param('id') questionId: string,
  ): Promise<IBeforeTransformResponseType<QuestionWithProductResponseDto>> {
    return this.questionService.getQuestionById(questionId);
  }

  @Post()
  @ApiCreateQuestion()
  createQuestion(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    return this.questionService.createQuestion(
      decodedAccessToken.userId,
      createQuestionDto,
    );
  }

  @Patch(':id')
  @ApiUpdateQuestion()
  updateQuestion(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    return this.questionService.updateQuestion(
      decodedAccessToken.userId,
      questionId,
      updateQuestionDto,
    );
  }

  @Delete(':id')
  @ApiDeleteQuestion()
  deleteQuestion(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') questionId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.questionService.deleteQuestion(
      decodedAccessToken.userId,
      questionId,
    );
  }

  // ============== Admin Routes ==============

  @Patch(':id/answer')
  @ApiAnswerQuestion()
  answerQuestion(
    @Param('id') questionId: string,
    @Body() answerDto: AnswerQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    return this.questionService.answerQuestion(questionId, answerDto);
  }

  @Patch(':id/update-answer')
  @ApiUpdateAnswer()
  updateAnswer(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') questionId: string,
    @Body() answerDto: AnswerQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    return this.questionService.updateAnswer(questionId, answerDto);
  }

  @Delete(':id/admin')
  @ApiDeleteQuestionByAdmin()
  deleteQuestionByAdmin(
    @Param('id') questionId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.questionService.deleteQuestionByAdmin(questionId);
  }

  // ============== Public Routes ==============

  @Get('public/product/:productId')
  @ShouldSkipIfNoAccessToken(true)
  @ApiGetPublicProductQuestions()
  getPublicProductQuestions(
    @Param('productId') productId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: ProductQuestionStatus,
    @Query('sortBy') sortBy?: 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<QuestionResponseDto>> {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });

    return this.questionService.getPublicProductQuestions(productId, {
      page: normalizedPage,
      limit: normalizedLimit,
      status,
      sortBy,
      order,
    });
  }
}
