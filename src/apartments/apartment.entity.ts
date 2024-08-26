import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
//import { SwaggerBaseEntity } from 'src/common/mixins/swagger.mixin';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
//@SwaggerBaseEntity()
export class Apartment extends BaseEntity {
  @ApiProperty({
    example: 'Cozy Apartment',
    description: 'The name of the apartment',
  })
  @Column()
  name!: string;

  @ApiProperty({
    example: 'New York',
    description: 'The location of the apartment',
  })
  @Column()
  location!: string;

  @ApiProperty({ example: 1500, description: 'The price of the apartment' })
  @Column()
  price!: number;
}
