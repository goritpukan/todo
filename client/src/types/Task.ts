export interface TaskInterface {
  name: string;
  completed: boolean;
  id: number;
  todoId: number;
  jwtToken: string | undefined;
}