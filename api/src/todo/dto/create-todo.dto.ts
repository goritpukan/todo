import {IsAlphanumeric, IsNotEmpty, MinLength} from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty({message: "Name is required"})
  @MinLength(3, { message: 'Name must have at least 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Name does not allow other than alpha numeric chars.',
  })
  name: string;
  @IsNotEmpty()
  ownerID: string;
}
