import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.userRepository.save(dto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    const result = await this.userRepository.findOne(+id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async update(id: number, dto: UpdateUserDto) {
    const result = await this.findOneById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return this.userRepository.update(id, dto);
  }

  async remove(id: number) {
    const result = await this.findOneById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return this.userRepository.delete(id);
  }
}
