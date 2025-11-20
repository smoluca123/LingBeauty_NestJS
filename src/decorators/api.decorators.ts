// import { applyDecorators, Type } from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import {
//   ApiBearerAuth,
//   ApiHeader,
//   ApiOperation,
//   ApiResponse,
// } from '@nestjs/swagger';
// import { JwtTokenVerifyGuard } from 'src/guards/jwt-token-verify.guard';

import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtTokenVerifyGuard } from 'src/guards/jwt-token-verify.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';

// /**
//  * Options for building API decorators
//  */
// export interface ApiOperationOptions {
//   summary: string;
//   description?: string;
//   operationId?: string;
//   tags?: string[];
// }

// /**
//  * Configuration for API response decorator
//  */
// export interface ApiResponseConfig {
//   status: number;
//   description?: string;
//   type?: any;
//   isArray?: boolean;
//   schema?: any;
//   headers?: any;
//   examples?: any;
// }

// /**
//  * Flexible API decorator builder
//  * Allows custom guards, multiple responses, and additional decorators
//  */
// export function ApiOperationDecorator(options: {
//   operation: ApiOperationOptions;
//   guards?: Array<Type<any> | Function>;
//   auth?: {
//     type: 'bearer' | 'custom-header';
//     headerName?: string;
//   };
//   successResponses?: ApiResponseConfig[];
//   errorResponses?: ApiResponseConfig[];
//   additionalDecorators?: Array<
//     ClassDecorator | MethodDecorator | PropertyDecorator
//   >;
// }) {
//   const decorators: Array<
//     ClassDecorator | MethodDecorator | PropertyDecorator
//   > = [];

//   // Add guards
//   if (options.guards && options.guards.length > 0) {
//     decorators.push(UseGuards(...options.guards));
//   }

//   // Add auth decorators
//   if (options.auth) {
//     if (options.auth.type === 'bearer') {
//       decorators.push(ApiBearerAuth());
//     } else if (
//       options.auth.type === 'custom-header' &&
//       options.auth.headerName
//     ) {
//       decorators.push(
//         ApiHeader({
//           name: options.auth.headerName,
//           description: 'JWT access token',
//           required: true,
//         }),
//       );
//     }
//   }

//   // Add operation decorator
//   decorators.push(
//     ApiOperation({
//       summary: options.operation.summary,
//       description: options.operation.description,
//       operationId: options.operation.operationId,
//       tags: options.operation.tags,
//     }),
//   );

//   // Add success responses
//   if (options.successResponses && options.successResponses.length > 0) {
//     options.successResponses.forEach((response) => {
//       decorators.push(ApiResponse(response));
//     });
//   }

//   // Add error responses
//   if (options.errorResponses && options.errorResponses.length > 0) {
//     options.errorResponses.forEach((response) => {
//       decorators.push(ApiResponse(response));
//     });
//   }

//   // Add additional decorators
//   if (options.additionalDecorators && options.additionalDecorators.length > 0) {
//     decorators.push(...options.additionalDecorators);
//   }

//   return applyDecorators(...decorators);
// }

// /**
//  * Predefined decorators for common use cases
//  */

// /**
//  * Public operation (no auth required)
//  */
// export function ApiPublicOperation(
//   summary: string,
//   config?: {
//     description?: string;
//     successResponses?: ApiResponseConfig[];
//     errorResponses?: ApiResponseConfig[];
//     additionalDecorators?: Array<
//       ClassDecorator | MethodDecorator | PropertyDecorator
//     >;
//   },
// ) {
//   return ApiOperationDecorator({
//     operation: {
//       summary,
//       description: config?.description,
//     },
//     successResponses: config?.successResponses,
//     errorResponses: config?.errorResponses,
//     additionalDecorators: config?.additionalDecorators,
//   });
// }

// /**
//  * Protected operation with JwtTokenVerifyGuard
//  */
// export function ApiProtectedOperation(
//   summary: string,
//   config?: {
//     description?: string;
//     successResponses?: ApiResponseConfig[];
//     errorResponses?: ApiResponseConfig[];
//     useCustomHeader?: boolean;
//     headerName?: string;
//     additionalDecorators?: Array<
//       ClassDecorator | MethodDecorator | PropertyDecorator
//     >;
//   },
// ) {
//   return ApiOperationDecorator({
//     operation: {
//       summary,
//       description: config?.description,
//     },
//     guards: [JwtTokenVerifyGuard],
//     auth: config?.useCustomHeader
//       ? {
//           type: 'custom-header',
//           headerName: config.headerName || 'accessToken',
//         }
//       : { type: 'bearer' },
//     successResponses: config?.successResponses,
//     errorResponses: config?.errorResponses,
//     additionalDecorators: config?.additionalDecorators,
//   });
// }

// /**
//  * Protected operation with AuthGuard('jwt')
//  */
// export function ApiAuthOperation(
//   summary: string,
//   config?: {
//     description?: string;
//     successResponses?: ApiResponseConfig[];
//     errorResponses?: ApiResponseConfig[];
//     additionalDecorators?: Array<
//       ClassDecorator | MethodDecorator | PropertyDecorator
//     >;
//   },
// ) {
//   return ApiOperationDecorator({
//     operation: {
//       summary,
//       description: config?.description,
//     },
//     guards: [AuthGuard('jwt')],
//     auth: { type: 'bearer' },
//     successResponses: config?.successResponses,
//     errorResponses: config?.errorResponses,
//     additionalDecorators: config?.additionalDecorators,
//   });
// }

// /**
//  * Legacy decorators for backward compatibility
//  * @deprecated Use ApiPublicOperation, ApiProtectedOperation, or ApiAuthOperation instead
//  */
// export function ApiPublicAuthOperation(
//   summary: string,
//   successResponse?: {
//     status?: number;
//     description?: string;
//     type?: any;
//   },
//   errorResponses?: Array<{ status: number; description: string }>,
// ) {
//   return ApiPublicOperation(summary, {
//     successResponses: successResponse
//       ? [
//           {
//             status: successResponse.status || 200,
//             description: successResponse.description || 'Success',
//             type: successResponse.type,
//           },
//         ]
//       : undefined,
//     errorResponses: errorResponses?.map((err) => ({
//       status: err.status,
//       description: err.description,
//     })),
//   });
// }

// export function ApiProtectedAuthOperation(
//   summary: string,
//   successResponse?: {
//     status?: number;
//     description?: string;
//     type?: any;
//   },
//   errorResponses?: Array<{ status: number; description: string }>,
// ) {
//   return ApiProtectedOperation(summary, {
//     successResponses: successResponse
//       ? [
//           {
//             status: successResponse.status || 200,
//             description: successResponse.description || 'Success',
//             type: successResponse.type,
//           },
//         ]
//       : undefined,
//     errorResponses: errorResponses?.map((err) => ({
//       status: err.status,
//       description: err.description,
//     })),
//     useCustomHeader: true,
//   });
// }

export function ApiPublicOperation(options?: {
  summary?: string;
  description?: string;
}) {
  return applyDecorators(
    ApiOperation({
      summary: options?.summary,
      description: options?.description,
    }),
  );
}

export function ApiProtectedAuthOperation(options?: {
  summary?: string;
  description?: string;
}) {
  return applyDecorators(
    ApiOperation({
      summary: options?.summary,
      description: options?.description,
    }),
    UseGuards(JwtTokenVerifyGuard),
    ApiHeader({
      name: 'accessToken',
      description: 'JWT access token',
      required: true,
    }),
  );
}

export function ApiRoleProtectedOperation(options?: {
  summary?: string;
  description?: string;
  roles?: RolesLevel[];
}) {
  return applyDecorators(
    ApiOperation({
      summary: options?.summary,
      description: options?.description,
    }),
    UseGuards(RoleGuard),
    Roles(options?.roles ?? [RolesLevel.ADMIN]),
  );
}
