import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Todo} from "../../todo/entities/todo.entity";
import {Exclude} from "class-transformer";
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: false})
  completed: boolean;

  @ManyToOne(() => Todo, (todo) => todo.tasks, { onDelete: "CASCADE" })
  @Exclude()
  todo: Todo;
}
