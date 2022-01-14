import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  create(dto: CreatePostDto) {
    return this.postRepository.save(dto);
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOneById(id: number) {
    const result = await this.postRepository.findOne(+id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(id: number, dto: UpdatePostDto) {
    const result = await this.findOneById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return this.postRepository.update(id, dto);
  }

  async remove(id: number) {
    const result = await this.findOneById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return this.postRepository.delete(id);
  }
}
