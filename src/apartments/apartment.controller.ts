import { Controller, Get } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { OptimizedApartmentService } from './optimized-apartment.service';
import { Apartment } from './apartment.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentController {
  constructor(
    private apartmentService: ApartmentService,
    private optimizedApartmentService: OptimizedApartmentService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all apartments' })
  @ApiResponse({
    status: 200,
    description: 'Return all apartments',
    type: [Apartment],
  })
  async findAll(): Promise<Apartment[]> {
    return this.apartmentService.findAll();
  }

  @Get('optimized')
  @ApiOperation({ summary: 'Get all apartments with optimization' })
  @ApiResponse({
    status: 200,
    description: 'Return all apartments using optimization',
    type: [Apartment],
  })
  async findAllOptimized(): Promise<Apartment[]> {
    return this.optimizedApartmentService.findAllOptimized();
  }
}
