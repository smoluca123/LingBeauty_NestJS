import { PartialType } from '@nestjs/swagger';
import { CreateBannerGroupDto } from './create-banner-group.dto';

export class UpdateBannerGroupDto extends PartialType(CreateBannerGroupDto) {}
