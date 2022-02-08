import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostBodyBlock } from '../dto/create-post.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';

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

  // @OneToMany(() => CommentEntity, (comment) => comment.post)
  // comments?: CommentEntity[];

  @Column({ default: 0 })
  views: number;

  @Column('simple-json', { default: [] })
  tags?: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
