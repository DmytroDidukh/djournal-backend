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

  findOneById(id: number) {
    return this.userRepository.findOne(+id);
  }

  findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async update(id: number, dto: UpdateUserDto) {
    const isExist = await this.doesUserExist('id', id);

    if (!isExist) {
      throw new NotFoundException();
    }

    return this.userRepository.update(id, dto);
  }

  async remove(id: number) {
    const isExist = await this.doesUserExist('id', id);

    if (!isExist) {
      throw new NotFoundException();
    }

    return this.userRepository.delete(id);
  }

  async doesUserExist(key: string, value: string | number) {
    const user = await this.userRepository.findOne({ where: { [key]: value } });

    return !!user;
  }
}
