import { Course } from 'src/modules/course/entities/course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ type: 'uuid', nullable: true, name: 'parent_id' })
  parentId: string | null;

  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @OneToMany(() => Course, (course) => course.category)
  courses: Course[];
}
