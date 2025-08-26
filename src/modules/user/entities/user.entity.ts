import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  fullName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
