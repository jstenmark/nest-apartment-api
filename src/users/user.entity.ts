import { BaseEntity } from 'src/common/entities/base.entity';
import { SwaggerBaseEntity } from 'src/common/mixins/swagger.mixin';
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@SwaggerBaseEntity()
export class User extends BaseEntity {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  @Column()
  username!: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'The password of the user',
  })
  @Column()
  password!: string;
}
