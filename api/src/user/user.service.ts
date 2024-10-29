import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "./entity/user.entity";
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user : User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.password = hash;
    return this.userRepository.save(user);
  }
  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
