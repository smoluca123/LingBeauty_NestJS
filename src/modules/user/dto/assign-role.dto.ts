import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class AssignRolesDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @ApiProperty({
    description:
      'List of role IDs to assign to the user (replaces existing roles)',
    type: [String],
    example: ['role-id-1', 'role-id-2'],
  })
  roleIds: string[];
}
