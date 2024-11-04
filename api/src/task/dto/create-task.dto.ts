import {IsAlphanumeric, IsNotEmpty, MinLength} from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({message: "Name is required"})
  name: string;
}
