import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';
import * as process from "node:process";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7 days' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
