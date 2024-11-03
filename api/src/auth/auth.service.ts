import { Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user-dto";
import {User} from "../user/entity/user.entity";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async signup(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);
    const user:User = await this.userService.create(createUserDto);

    const {password, ...result} = user;
    const payload = { id: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return {
      user: result,
      access_token: token,
    };
  }
  async signin(email: string, pass: string): Promise<{ user: any; access_token: string }> {
    const user: User = await this.userService.getUser(email);
    if(!user){
      throw new UnauthorizedException("Password or email is incorrect");
    }
    if(!await bcrypt.compare(pass, user.password)){
      throw new UnauthorizedException("Password or email is incorrect");
    }
    const {password, ...result} = user;
    const payload = { id: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return {
      user: result,
      access_token: token,
    };
  }
}
