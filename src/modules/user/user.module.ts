import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StatsModule } from 'src/modules/stats/stats.module';

@Module({
  imports: [StatsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
