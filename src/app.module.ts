import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ApartmentModule } from './apartments/apartment.module';
import { LoggerModule } from 'nestjs-pino';
//import { CustomLogger } from './common/logger/custom-logger';

//LoggerModule.forRoot({
//  pinoHttp: {
//    // eslint-disable-next-line @typescript-eslint/no-unused-vars
//    customProps: (req, res) => ({
//      context: 'HTTP',
//    }),
//    transport: {
//      target: 'pino-pretty',
//      options: pinoPrettyConfig,
//    },
//  },
//}),

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          customProps: (req, res) => ({
            context: 'HTTP',
          }),
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss.l',
              singleLine: true,
              ignore: 'pid,hostname,req.headers,res.headers',
            },
          },
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ApartmentModule,
  ],
  //providers: [CustomLogger],
})
export class AppModule {}
