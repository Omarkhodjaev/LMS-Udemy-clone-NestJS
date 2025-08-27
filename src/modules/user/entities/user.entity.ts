import { CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user.enum';
import { Course } from 'src/modules/course/entities/course.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, name: 'full_name', nullable: false })
  fullName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true, name: 'avatar_url' })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];
}
