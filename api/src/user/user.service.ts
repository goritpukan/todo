import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "./entity/user.entity";
import { CreateUserDto } from './dto/create-user-dto';
import {UpdateUsernameDto} from "./dto/update-username-dto";
import {capitalizeFirstLetter} from "../utils/string-utils";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user : User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.password = hash;
    try {
      return await this.userRepository.save(user);
    }catch (err){
      if (err.code === '23505') {
        const key = err.detail.match(/\(([^)]+)\)/)?.[1];
        throw new ConflictException(`${capitalizeFirstLetter(key)} is already in use`);
      }
      throw new InternalServerErrorException();
    }
  }
  async update(id: number, updateUsernameDto: UpdateUsernameDto): Promise<User> {
    const user: User = await this.userRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.username = updateUsernameDto.username;
    try{
      return await this.userRepository.save(user);
    }catch(err){
      if (err.code === '23505') {
        throw new ConflictException(`Username is already in use`);
      }
      throw new InternalServerErrorException();
    }
  }
  async getUser(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({email: email});
    if(!user){
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async findOne(id: number): Promise<any> {
    const user: User = await this.userRepository.findOneBy({id});
    if(!user){
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }
    const {password, ...result} = user;
    return result;
  }
  async remove(id:number): Promise<string> {
    const user: User = await this.userRepository.findOneBy({id})
    if(!user){
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }
    this.userRepository.delete({id}).catch(err => {
      throw new HttpException("Error deleting user", HttpStatus.NOT_FOUND);
    });
    return `user with id was deleted successfully.`;
  }
}
