import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Task} from "../../task/entities/task.entity";
import {Exclude} from "class-transformer";
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ownerID: number;

  @OneToMany(() => Task, (task) => task.todo, { cascade: true, eager: true })
  @Exclude()
  tasks: Task[];
}
