import {IsNotEmpty, MinLength, IsArray} from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty({message: "Name is required"})
  @MinLength(3, { message: 'Name must have at least 3 characters.' })
  name: string;
  @IsNotEmpty()
  ownerID: string;

  @IsArray()
  tasks: { name: string }[];
}
