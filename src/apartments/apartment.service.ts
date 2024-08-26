import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,
  ) {}

  async findAll(): Promise<Apartment[]> {
    return this.apartmentRepository.find();
  }
}
