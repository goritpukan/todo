import {IsAlphanumeric, IsNotEmpty, MinLength} from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({message: "Name is required"})
  @MinLength(3, { message: 'Name must have at least 3 characters.' })
  name: string;
}
