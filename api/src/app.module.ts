import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {User} from "./user/entity/user.entity"

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: true,
    logging: true,
    entities: [User],
      ssl: {
        rejectUnauthorized: false
      },
  }),
    AuthModule,
    UserModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
