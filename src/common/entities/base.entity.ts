import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  BaseEntity as TypeORMBaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the entity',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'entityId' };

  @ApiProperty({
    example: '2023-07-12T00:00:00.000Z',
    description: 'The date and time when the entity was created',
  })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({
    example: '2023-07-12T00:00:00.000Z',
    description: 'The date and time when the entity was last updated',
  })
  @UpdateDateColumn()
  updatedAt!: Date;

  @ApiProperty({
    example: 1,
    description: 'The version number of the entity',
  })
  @VersionColumn()
  version!: number;
}
