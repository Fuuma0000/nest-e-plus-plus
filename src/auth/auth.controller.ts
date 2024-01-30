import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(
    @Body() signinUserDto: SigninUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(signinUserDto);
  }

  @Get('signup/verify')
  async verify(@Query('email') email: string, @Query('token') token: string) {
    return await this.authService.verify(email, token);
  }
}
