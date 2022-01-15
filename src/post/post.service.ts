import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
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
    return this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findPopular() {
    const qb = this.postRepository.createQueryBuilder();
    const [items, count] = await qb
      .limit(10)
      .orderBy('views', 'DESC')
      .getManyAndCount();

    return {
      items,
      count,
    };
  }

  async findOneById(id: number) {
    const result = await this.postRepository.findOne(+id);

    if (!result) {
      throw new NotFoundException();
    }

    await this.postRepository.increment({ id }, 'views', 1);

    return {
      ...result,
      views: result.views + 1,
    };
  }

  async update(id: number, dto: UpdatePostDto) {
    const isExist = await this.doesPostExists('id', id);

    if (!isExist) {
      throw new NotFoundException();
    }

    return this.postRepository.update(id, dto);
  }

  async remove(id: number) {
    const isExist = await this.doesPostExists('id', id);

    if (!isExist) {
      throw new NotFoundException();
    }

    return this.postRepository.delete(id);
  }

  async search(dto: SearchPostDto) {
    const qb = this.postRepository.createQueryBuilder('p');

    if (dto.title) {
      qb.where('p.title like :title', { title: `%${dto.title}%` });
    }

    if (dto.body) {
      qb.andWhere('p.body like :body', { body: `%${dto.body}%` });
    }

    if (dto.tag) {
      qb.andWhere('p.tags like :tag', { tag: `%${dto.tag}%` });
    }

    const [items, count] = await qb
      .orderBy('views', dto.views || 'DESC')
      .limit(dto.limit)
      .take(dto.take)
      .getManyAndCount();

    return {
      items,
      count,
    };
  }

  async doesPostExists(key: string, value: string | number) {
    const post = await this.postRepository.findOne({
      where: { [key]: value },
    });

    return !!post;
  }
}
