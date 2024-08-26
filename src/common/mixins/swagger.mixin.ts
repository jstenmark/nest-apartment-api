import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function SwaggerBaseEntity() {
  return applyDecorators(
    ApiProperty({
      example: '123e4567-e89b-12d3-a456-426614174000',
      description: 'The unique identifier of the entity',
    }),
    ApiProperty({
      example: '2023-07-12T00:00:00.000Z',
      description: 'The date and time when the entity was created',
    }),
    ApiProperty({
      example: '2023-07-12T00:00:00.000Z',
      description: 'The date and time when the entity was last updated',
    }),
    ApiProperty({
      example: 1,
      description: 'The version number of the entity',
    }),
  );
}
