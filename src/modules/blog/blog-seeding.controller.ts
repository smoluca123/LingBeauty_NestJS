import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { BlogSeedingService } from './blog-seeding.service';
import { ApiProtectedAuthOperation } from 'src/decorators/api.decorators';
@ApiTags('Blog Seeding')
@Controller('blog/seeding')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class BlogSeedingController {
  constructor(private readonly seedingService: BlogSeedingService) {}

  @Post()
  @Roles([RolesLevel.ADMIN])
  @ApiProtectedAuthOperation({
    summary: 'Seed blog data (Admin only)',
    description:
      'Tạo dữ liệu mẫu cho blog bao gồm topics và posts bằng tiếng Việt',
  })
  async seedBlogData(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ) {
    return this.seedingService.seedBlogData(decodedAccessToken.userId);
  }
}
