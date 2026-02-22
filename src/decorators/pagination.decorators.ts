import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export function ApiQueryLimitAndPage(options?: {
  limit?: ApiQueryOptions & {
    name?: string;
    defaultValue?: number;
    // required?: boolean;
  };

  page?: ApiQueryOptions & {
    name?: string;
    defaultValue?: number;
    // required?: boolean;
  };
}) {
  return applyDecorators(
    ApiQuery({
      name: options?.limit?.name || 'limit',
      description: `Limit result on page (Default : ${options?.limit?.defaultValue || 10})`,
      required: options?.limit?.required || false,
      ...options?.limit,
    }),
    ApiQuery({
      name: options?.page?.name || 'page',
      description: `Limit result on page (Default : ${options?.page?.defaultValue || 1})`,
      required: options?.page?.required || false,
      ...options?.page,
    }),
  );
}
