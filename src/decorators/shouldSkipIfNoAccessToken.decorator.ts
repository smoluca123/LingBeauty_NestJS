import { Reflector } from '@nestjs/core';

export const ShouldSkipIfNoAccessToken = Reflector.createDecorator<boolean>();
