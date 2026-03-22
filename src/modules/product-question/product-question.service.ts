import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AnswerQuestionDto } from './dto/answer-question.dto';
import {
  QuestionResponseDto,
  QuestionWithProductResponseDto,
} from './dto/question-response.dto';
import {
  questionSelect,
  questionWithProductSelect,
  questionPublicSelect,
} from 'src/libs/prisma/product-question-select';
import {
  toResponseDto,
  toResponseDtoArray,
} from 'src/libs/utils/transform.utils';
import { ProductQuestionStatus } from 'prisma/generated/prisma/client';
import { processDataObject } from 'src/libs/utils/utils';
import {
  userRoleAssignmentsSelect,
  userRoleSelect,
} from 'src/libs/prisma/user-select';

export interface GetQuestionsParams {
  page?: number;
  limit?: number;
  productId?: string;
  userId?: string;
  status?: ProductQuestionStatus;
  sortBy?: 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}

@Injectable()
export class ProductQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(
    userId: string,
    dto: CreateQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    try {
      // Check if product exists
      const product = await this.prisma.product.findUnique({
        where: { id: dto.productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      const question = await this.prisma.productQuestion.create({
        data: {
          productId: dto.productId,
          userId,
          question: dto.question,
        },
        select: questionSelect,
      });

      const result = toResponseDto(QuestionResponseDto, question);

      return {
        type: 'response',
        message: 'Tạo câu hỏi thành công',
        data: result,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getQuestions(
    params: GetQuestionsParams,
  ): Promise<IBeforeTransformPaginationResponseType<QuestionResponseDto>> {
    const {
      page = 1,
      limit = 10,
      productId,
      userId,
      status,
      sortBy = 'createdAt',
      order = 'desc',
    } = await processDataObject(params);

    try {
      const whereQuery = {
        ...(productId && { productId }),
        ...(userId && { userId }),
        ...(status && { status }),
      };

      const [questions, totalCount] = await Promise.all([
        this.prisma.productQuestion.findMany({
          where: whereQuery,
          select: questionSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.productQuestion.count({
          where: whereQuery,
        }),
      ]);

      const questionResponses = toResponseDtoArray(
        QuestionResponseDto,
        questions,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách câu hỏi thành công',
        data: {
          items: questionResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getMyQuestions(
    userId: string,
    params: GetQuestionsParams,
  ): Promise<
    IBeforeTransformPaginationResponseType<QuestionWithProductResponseDto>
  > {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      order = 'desc',
    } = params;

    try {
      const whereQuery = {
        userId,
        ...(status && { status }),
      };

      const [questions, totalCount] = await Promise.all([
        this.prisma.productQuestion.findMany({
          where: whereQuery,
          select: questionWithProductSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.productQuestion.count({
          where: whereQuery,
        }),
      ]);

      const questionResponses = toResponseDtoArray(
        QuestionWithProductResponseDto,
        questions,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách câu hỏi thành công',
        data: {
          items: questionResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getQuestionById(
    questionId: string,
  ): Promise<IBeforeTransformResponseType<QuestionWithProductResponseDto>> {
    try {
      const question = await this.prisma.productQuestion.findUnique({
        where: { id: questionId },
        select: questionWithProductSelect,
      });

      if (!question) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND],
          ERROR_CODES.QUESTION_NOT_FOUND,
        );
      }

      const result = toResponseDto(QuestionWithProductResponseDto, question);

      return {
        type: 'response',
        message: 'Lấy thông tin câu hỏi thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateQuestion(
    userId: string,
    questionId: string,
    dto: UpdateQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    try {
      const existingQuestion = await this.prisma.productQuestion.findUnique({
        where: { id: questionId },
        select: { id: true, userId: true, status: true },
      });

      if (!existingQuestion) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND],
          ERROR_CODES.QUESTION_NOT_FOUND,
        );
      }

      if (existingQuestion.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_OWNED],
          ERROR_CODES.QUESTION_NOT_OWNED,
        );
      }

      if (existingQuestion.status === ProductQuestionStatus.ANSWERED) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_ALREADY_ANSWERED],
          ERROR_CODES.QUESTION_ALREADY_ANSWERED,
        );
      }

      const updated = await this.prisma.productQuestion.update({
        where: { id: questionId },
        data: {
          question: dto.question,
        },
        select: questionSelect,
      });

      const result = toResponseDto(QuestionResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật câu hỏi thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteQuestion(
    userId: string,
    questionId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existingQuestion = await this.prisma.productQuestion.findUnique({
        where: { id: questionId },
        select: { id: true, userId: true },
      });

      if (!existingQuestion) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND],
          ERROR_CODES.QUESTION_NOT_FOUND,
        );
      }

      if (existingQuestion.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_OWNED],
          ERROR_CODES.QUESTION_NOT_OWNED,
        );
      }

      await this.prisma.productQuestion.delete({
        where: { id: questionId },
      });

      return {
        type: 'response',
        message: 'Xóa câu hỏi thành công',
        data: { message: 'Xóa câu hỏi thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Admin Methods ==============

  async answerQuestion(
    questionId: string,
    dto: AnswerQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    try {
      const existingQuestion = await this.prisma.productQuestion.findUnique({
        where: { id: questionId },
        select: { id: true },
      });

      if (!existingQuestion) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND],
          ERROR_CODES.QUESTION_NOT_FOUND,
        );
      }

      // If answeredBy is provided in DTO, verify the user exists and is admin
      const answeredByUserId = dto.answeredBy;

      if (dto.answeredBy) {
        const answeredByUser = await this.prisma.user.findUnique({
          where: { id: dto.answeredBy },
          select: {
            id: true,
            roleAssignments: {
              select: {
                role: {
                  select: userRoleSelect,
                },
              },
            },
          },
        });

        if (!answeredByUser) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.QUESTION_ADMIN_NOT_FOUND],
            ERROR_CODES.QUESTION_ADMIN_NOT_FOUND,
          );
        }

        console.log(answeredByUser);
        if (
          answeredByUser.roleAssignments.find(
            (role) => role.role.name !== 'ADMINISTRATOR',
          )
        ) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.QUESTION_ADMIN_INVALID_ROLE],
            ERROR_CODES.QUESTION_ADMIN_INVALID_ROLE,
          );
        }
      }

      const updated = await this.prisma.productQuestion.update({
        where: { id: questionId },
        data: {
          answer: dto.answer,
          answeredBy: answeredByUserId,
          status: ProductQuestionStatus.ANSWERED,
        },
        select: questionSelect,
      });

      const result = toResponseDto(QuestionResponseDto, updated);

      return {
        type: 'response',
        message: 'Trả lời câu hỏi thành công',
        data: result,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateAnswer(
    questionId: string,
    dto: AnswerQuestionDto,
  ): Promise<IBeforeTransformResponseType<QuestionResponseDto>> {
    try {
      const existingQuestion = await this.prisma.productQuestion.findUnique({
        where: { id: questionId },
        select: { id: true, status: true },
      });

      if (!existingQuestion) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND],
          ERROR_CODES.QUESTION_NOT_FOUND,
        );
      }

      if (existingQuestion.status !== ProductQuestionStatus.ANSWERED) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_ANSWERED],
          ERROR_CODES.QUESTION_NOT_ANSWERED,
        );
      }

      // If answeredBy is provided in DTO, verify the user exists and is admin
      const answeredByUserId = dto.answeredBy;

      if (dto.answeredBy) {
        const answeredByUser = await this.prisma.user.findUnique({
          where: { id: dto.answeredBy },
          select: {
            id: true,
            roleAssignments: {
              where: {
                OR: [
                  {
                    role: {
                      name: 'ADMINISTRATOR',
                    },
                  },
                ],
              },
              select: {
                role: {
                  select: userRoleSelect,
                },
              },
            },
          },
        });

        if (!answeredByUser) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.QUESTION_ADMIN_NOT_FOUND],
            ERROR_CODES.QUESTION_ADMIN_NOT_FOUND,
          );
        }

        if (answeredByUser.roleAssignments[0].role.name !== 'ADMINISTRATOR') {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.QUESTION_ADMIN_INVALID_ROLE],
            ERROR_CODES.QUESTION_ADMIN_INVALID_ROLE,
          );
        }
      }

      const updated = await this.prisma.productQuestion.update({
        where: { id: questionId },
        data: {
          answer: dto.answer,
          answeredBy: answeredByUserId,
        },
        select: questionSelect,
      });

      const result = toResponseDto(QuestionResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật câu trả lời thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteQuestionByAdmin(
    questionId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existingQuestion = await this.prisma.productQuestion.findUnique({
        where: { id: questionId },
        select: { id: true },
      });

      if (!existingQuestion) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.QUESTION_NOT_FOUND],
          ERROR_CODES.QUESTION_NOT_FOUND,
        );
      }

      await this.prisma.productQuestion.delete({
        where: { id: questionId },
      });

      return {
        type: 'response',
        message: 'Xóa câu hỏi thành công',
        data: { message: 'Xóa câu hỏi thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Public Methods ==============

  async getPublicProductQuestions(
    productId: string,
    params: GetQuestionsParams,
  ): Promise<IBeforeTransformPaginationResponseType<QuestionResponseDto>> {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      order = 'desc',
    } = params;

    try {
      // Check if product exists
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      const whereQuery = {
        productId,
        isPublic: true,
        ...(status && { status }),
      };

      const [questions, totalCount] = await Promise.all([
        this.prisma.productQuestion.findMany({
          where: whereQuery,
          select: questionPublicSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.productQuestion.count({
          where: whereQuery,
        }),
      ]);

      const questionResponses = toResponseDtoArray(
        QuestionResponseDto,
        questions,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách câu hỏi thành công',
        data: {
          items: questionResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
