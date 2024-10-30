import {HttpException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
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
    const user:User = await this.userService.createUser(createUserDto);

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signin(email: string, pass: string): Promise<any> {
    const user: User = await this.userService.getUser(email);
    if(!user){
      throw new UnauthorizedException("Password or email is incorrect");
    }
    if(!await bcrypt.compare(pass, user.password)){
      throw new UnauthorizedException("Password or email is incorrect");
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
