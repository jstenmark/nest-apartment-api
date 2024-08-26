import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.jwtService.sign(
        { username: user.username },
        { secret: this.jwtSecret },
      );
    }
    throw new UnauthorizedException();
  }

  async validateUser(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      return user;
    }
    return null;
  }
}
