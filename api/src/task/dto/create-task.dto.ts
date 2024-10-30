import {IsAlphanumeric, IsNotEmpty, MinLength} from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({message: "Name is required"})
  @MinLength(3, { message: 'Name must have at least 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Name does not allow other than alpha numeric chars.',
  })
  name: string;
  @MinLength(3, { message: 'Description must have at least 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Description does not allow other than alpha numeric chars.',
  })
  description: string;
}
