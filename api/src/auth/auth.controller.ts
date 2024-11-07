import {Body, Res, Controller, Post, Delete} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user-dto";
import {Response} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response,) {
    const {user, access_token} = await this.authService.signup(createUserDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'strict'
    });
    return res.send({
      user,
    });
  }

  @Post('signin')
  async signin(@Body() body: { email: string, password: string }, @Res() res: Response) {
    const {user, access_token} = await this.authService.signin(body.email, body.password);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: "/"
    });
    return res.send({
      user,
    });
  }

  @Delete('logout')
  async logout(@Res() res: Response) {
    res.cookie('access_token',
      {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: "/"
      });
    res.status(200).json({message: 'Logout successful'});
  }
}
