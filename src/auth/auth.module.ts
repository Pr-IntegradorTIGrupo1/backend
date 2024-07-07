import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Project]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
