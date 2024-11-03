import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({message: "Username is required"})
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsAlphanumeric('en-US', {message: 'Username does not allow other than alpha numeric chars.'})
  username: string;

  @IsNotEmpty({message: "Email is required"})
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty({message: "Password is required"})
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;
}