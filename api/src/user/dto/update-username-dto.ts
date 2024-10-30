import {IsNotEmpty, MinLength, IsAlphanumeric} from 'class-validator';

export class UpdateUsernameDto {
  @IsNotEmpty({message: "Username is required"})
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;
}