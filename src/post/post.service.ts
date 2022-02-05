import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { slugifyConfig, SlugProvider } from './slug.provider';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private readonly slugProvider: SlugProvider,
  ) {}

  async create(dto: CreatePostDto, user: UserEntity) {
    const post = await this.uniqueSlug(dto);

    return this.postRepository.save({
      ...post,
      author: { id: user.id },
    });
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

  async findOneBySlug(slug: string) {
    const post = await this.postRepository.findOne({
      where: { slug: slug },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postRepository.increment({ id: post.id }, 'views', 1);

    return {
      ...post,
      views: post.views + 1,
    };
  }

  async findOneById(id: number) {
    const post = await this.postRepository.findOne(+id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async update(id: number, dto: UpdatePostDto, user: UserEntity) {
    const post = await this.postRepository.findOne(+id);

    if (!post) {
      throw new NotFoundException();
    } else if (post.author.id !== user.id) {
      throw new ForbiddenException();
    }

    return this.postRepository.update(id, dto);
  }

  async remove(id: number, user: UserEntity) {
    const post = await this.postRepository.findOne(+id);

    if (!post) {
      throw new NotFoundException();
    } else if (post.author.id !== user.id) {
      throw new ForbiddenException();
    }

    return this.postRepository.delete(id);
  }

  async search(dto: SearchPostDto) {
    const qb = this.postRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.author', 'author');

    if (dto.title) {
      qb.where('p.title like :title', { title: `%${dto.title}%` });
    }

    if (dto.description) {
      qb.andWhere('p.description like :description', {
        description: `%${dto.description}%`,
      });
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

  async uniqueSlug(dto: CreatePostDto): Promise<CreatePostDto> {
    const post = {
      ...dto,
      slug: this.slugProvider.slugify(dto.title),
    };

    const exists = await this.findSlugs(post.slug);

    // if slug doesn't already exists
    if (!exists || exists.length === 0) {
      return post;
    }

    post.slug = `${post.slug}${slugifyConfig.replacement}${exists.length}`;

    return post;
  }

  private async findSlugs(slug: string): Promise<PostEntity[]> {
    return await this.postRepository
      .createQueryBuilder('p')
      .where('p.slug like :slug', { slug: `${slug}%` })
      .getMany();
  }
}
