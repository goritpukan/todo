import {Controller, Request, Delete, UseGuards, Get, Patch, Body} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from "../auth/auth.guard";
import {UpdateUsernameDto} from "./dto/update-username-dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  get(@Request() req: any) {
    return this.userService.findOne(+req.user.id);
  }
  @UseGuards(AuthGuard)
  @Delete()
  remove(@Request() req: any) {
    return this.userService.remove(+req.user.id);
  }
  @UseGuards(AuthGuard)
  @Patch()
  update(@Request() req: any, @Body() updateUsernameDto: UpdateUsernameDto){
    return this.userService.update(+req.user.id, updateUsernameDto);
  }
}
