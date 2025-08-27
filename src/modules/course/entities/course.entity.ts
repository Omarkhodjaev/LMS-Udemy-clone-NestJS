import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { courseLevel, courseStatus } from './course.enum';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', name: 'thumbnail_url' })
  thumbnailUrl: string;

  @Column({ name: 'instructor_id', type: 'uuid' })
  instructorId: string;

  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;

  @Column({ type: 'enum', enum: courseStatus, default: courseStatus.DRAFT })
  status: courseStatus;

  @Column({
    type: 'enum',
    enum: courseLevel,
    default: courseLevel.BEGINNER,
  })
  level: courseLevel;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.courses, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'instructor_id' })
  instructor: User;
}
