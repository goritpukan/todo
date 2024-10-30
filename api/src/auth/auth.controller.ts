import {Body,Res,Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user-dto";
import {Response} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response,) {
    const { user, access_token } = await this.authService.signup(createUserDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return res.send({
      user,
    });
  }
  @Post('signin')
  async find(@Body() body: {email: string, password: string}, @Res() res: Response) {
    const { user, access_token } = await this.authService.signin(body.email, body.password);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return res.send({
      user,
    });
  }
}
