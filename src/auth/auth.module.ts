import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaClient } from '@prisma/client';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RefreshJwtStrategy,
    RefreshJwtAuthGuard,
    PrismaClient,
  ],
  exports: [JwtStrategy, RefreshJwtStrategy, JwtAuthGuard, RefreshJwtAuthGuard],
})
export class AuthModule {}
