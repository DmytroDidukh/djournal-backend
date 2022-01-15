import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  create(dto: CreateCommentDto) {
    return this.commentRepository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: 2 },
    });
  }

  findAll() {
    return this.commentRepository.find();
  }

  async findOneById(id: number) {
    const result = await this.commentRepository.findOne(+id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(id: number, dto: UpdateCommentDto) {
    const isExist = await this.doesCommentExists('id', id);

    if (!isExist) {
      throw new NotFoundException();
    }

    return this.commentRepository.update(id, dto);
  }

  async remove(id: number) {
    const isExist = await this.doesCommentExists('id', id);

    if (!isExist) {
      throw new NotFoundException();
    }

    return this.commentRepository.delete(id);
  }

  async doesCommentExists(key: string, value: string | number) {
    const comment = await this.commentRepository.findOne({
      where: { [key]: value },
    });

    return !!comment;
  }
}
