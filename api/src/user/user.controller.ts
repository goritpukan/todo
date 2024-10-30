import {Controller, Request, Delete, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from "../auth/auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Request() req) {
    return this.userService.deleteUser(+req.user.id);
  }
}
