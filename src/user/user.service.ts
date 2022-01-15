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

  async create(dto: CreateUserDto) {
    // const user = await this.userRepository.findOne({
    //   where: { email: dto.email },
    // });
    // console.log(user);

    return this.userRepository.save(dto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOne(+id);
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

  async doesUserExists(key: string, value: string | number) {
    const user = await this.userRepository.findOne({
      where: { [key]: value },
    });

    if (user) {
      throw new NotFoundException();
    }
  }
}
