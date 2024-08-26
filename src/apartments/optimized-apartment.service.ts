import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';

@Injectable()
export class OptimizedApartmentService {
  private apartmentCache: Apartment[] = [];
  private fetching = false;
  private lastFetchTime = 0;
  private readonly fetchInterval = 50; // ms

  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
  ) {}

  async findAllOptimized(): Promise<Apartment[]> {
    const currentTime = Date.now();

    // If it's been more than fetchInterval since the last fetch, reset fetching state
    if (currentTime - this.lastFetchTime >= this.fetchInterval) {
      this.fetching = false;
    }

    if (!this.fetching) {
      this.fetching = true;
      this.lastFetchTime = currentTime;

      // Fetch apartments after the delay
      setTimeout(async () => {
        this.apartmentCache = await this.apartmentRepository.find();
        this.fetching = false;
      }, this.fetchInterval);
    }

    return this.apartmentCache;
  }
}
