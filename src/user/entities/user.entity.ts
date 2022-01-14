import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password?: string;

  // @OneToMany(() => CommentEntity, (comment) => comment.user)
  // comments: CommentEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
