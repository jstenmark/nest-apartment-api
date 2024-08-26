import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './apartment.entity';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { OptimizedApartmentService } from './optimized-apartment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment])],
  providers: [ApartmentService, OptimizedApartmentService],
  controllers: [ApartmentController],
})
export class ApartmentModule {}
