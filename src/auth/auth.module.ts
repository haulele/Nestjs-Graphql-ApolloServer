import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { LocalFileService } from 'src/files/file.service';

config();
@Module({
  imports: [PassportModule, UsersModule, JwtModule.register({
    signOptions: {
      expiresIn : process.env.ACCESS_TOKEN_LIFE_TIME},
    secret: process.env.ACCESS_TOKEN_SECRET_KEY,
  })],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, LocalFileService]
})
export class AuthModule {}
