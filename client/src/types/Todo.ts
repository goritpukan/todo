import {TaskInterface} from "@/types/Task";

export interface TodoInterface {
  name: string;
  id: number;
  tasks: TaskInterface[];
}