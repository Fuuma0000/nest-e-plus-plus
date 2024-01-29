import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signIn(createUserDto);
  }

  // /auth/signup/verify?email=:email&token=:token
  @Get('signup/verify')
  async verify(@Query('email') email: string, @Query('token') token: string) {
    return await this.authService.verify(email, token);
  }
}
