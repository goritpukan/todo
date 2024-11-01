import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Task} from "./entities/task.entity";
import {Todo} from "../todo/entities/todo.entity"

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}
  async create(todoID: number ,createTaskDto: CreateTaskDto, ownerId: number): Promise<Task> {
    const todo :Todo = await this.todoRepository.findOneBy({id: todoID});
    if(!todo) throw new NotFoundException("Todo not found");
    if(todo.ownerID !== ownerId) throw new ForbiddenException("You dont have access to this todo");

    const task: Task = new Task();
    task.name = createTaskDto.name;
    task.description = createTaskDto.description;
    task.todo = todo;

    return this.taskRepository.save(task);
  }

  async findAll(todoID: number, ownerId: number): Promise<Task[]> {
    const todo :Todo = await this.todoRepository.findOneBy({id: todoID});
    if(!todo) throw new NotFoundException("Todo not found");
    if(todo.ownerID !== ownerId) throw new ForbiddenException("You dont have access to this todo");

    return this.taskRepository.find({where: {todo: {id: todoID}}})
  }

  async update(todoID: number,taskID: number ,updateTaskDto: UpdateTaskDto, ownerId: number):Promise<Task> {
    const todo :Todo = await this.todoRepository.findOneBy({id: todoID});
    if(!todo) throw new NotFoundException("Todo not found");
    if(todo.ownerID !== ownerId) throw new ForbiddenException("You dont have access to this todo");

    const task = await this.taskRepository.findOneBy({id: taskID});
    if(!task) throw new NotFoundException("Task not found");

    task.name = updateTaskDto.name;
    task.description = updateTaskDto.description;
    task.completed = updateTaskDto.completed;

    return this.taskRepository.save(task);
  }

  async remove(todoID: number,taskID: number, ownerId: number): Promise<any> {
    const todo :Todo = await this.todoRepository.findOneBy({id: todoID});
    if(!todo) throw new NotFoundException("Todo not found");
    if(todo.ownerID !== ownerId) throw new ForbiddenException("You dont have access to this todo");

    const task = await this.taskRepository.findOneBy({id: taskID});
    if(!task) throw new NotFoundException("Task not found");

    return this.taskRepository.remove(task);
  }
}
