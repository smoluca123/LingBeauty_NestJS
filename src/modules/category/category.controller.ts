import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { CategoryResponseDto } from './dto/category-response.dto';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import {
  ApiProtectedAuthOperation,
  ApiPublicOperation,
} from 'src/decorators/api.decorators';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreateCategory,
  ApiCreateSubCategory,
  ApiDeleteCategory,
  ApiGetCategories,
  ApiUpdateCategory,
} from 'src/modules/category/decorators/category.decorators';

@ApiTags('Category Management')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiGetCategories()
  getCategories(): Promise<
    IBeforeTransformResponseType<CategoryResponseDto[]>
  > {
    return this.categoryService.getCategories();
  }

  @Post()
  @ApiCreateCategory()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    return this.categoryService.createCategory({
      createCategoryDto,
      image,
    });
  }

  @Post(':parentId/sub-category')
  @ApiCreateSubCategory()
  createSubCategory(
    @Param('parentId') parentId: string,
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    return this.categoryService.createSubCategory({
      parentId,
      createCategoryDto,
      image,
    });
  }

  @Patch(':id')
  @ApiUpdateCategory()
  updateCategory(
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    return this.categoryService.updateCategory({
      categoryId,
      updateCategoryDto,
      image,
    });
  }

  @Delete(':id')
  @ApiDeleteCategory()
  deleteCategory(
    @Param('id') categoryId: string,
  ): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
