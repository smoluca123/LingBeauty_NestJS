import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly redis: Redis;
  constructor(
    readonly config: ConfigService,
    public prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET') as string,
    });
    this.redis = this.redisService.getOrThrow();
  }

  async validate(payload: { id: string; auth_code: string }) {
    const cacheKey = `authCode:${payload.id}`;
    const cachedAuthCode = await this.redis.get(cacheKey);
    if (!cachedAuthCode) {
      const auth = await this.prisma.authCode.findFirst({
        where: {
          AND: {
            id: payload.id,
            authCode: payload.auth_code,
          },
        },
      });

      if (!auth) {
        throw new UnauthorizedException('Invalid auth code');
      }
      await this.redis.set(cacheKey, '1');
    }
    return payload;
  }
}
