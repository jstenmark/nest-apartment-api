import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Username for the new user',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username!: string;

  @ApiProperty({
    description: 'Password for the new user',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username!: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
