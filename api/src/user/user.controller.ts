import {Body, Controller, Param, Post, Get, Delete} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user-dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
