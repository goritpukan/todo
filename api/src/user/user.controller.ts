import {Body, Controller, Param, Post, Get} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user-dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.viewUser(+id);
  }
}
