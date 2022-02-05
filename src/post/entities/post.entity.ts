import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostBodyBlock } from '../dto/create-post.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  description: string;

  @Column('simple-json', { default: [] })
  body?: PostBodyBlock[];

  @ManyToOne(() => UserEntity, { nullable: false, eager: true })
  author: UserEntity;

  @Column({ default: 0 })
  views: number;

  @Column('simple-json', { default: [] })
  tags?: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
