import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { User } from '../users/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: User,
  })
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(
      registerDto.username,
      registerDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: String,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return {
      token: await this.authService.login(loginDto.username, loginDto.password),
    };
  }
}
