import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { GetId } from './decorator/get-id.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
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
    @Res({ passthrough: true }) response: Response & { cookie: any },
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signinUserDto);

    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    response.cookie('x-access-token', accessToken, {
      signed: false,
      expires: oneHourFromNow,
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      secure: true,
      sameSite: 'lax',
    });
    response.cookie('x-refresh-token', refreshToken, {
      signed: false,
      expires: oneMonthFromNow,
      httpOnly: true,
      path: '/auth/refresh',
      domain: 'localhost',
      secure: true,
      sameSite: 'lax',
    });

    return;
  }

  @Get('signup/verify')
  async verify(@Query('email') email: string, @Query('token') token: string) {
    return await this.authService.verify(email, token);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh')
  async refresh(
    @GetId() userId: string,
    @Res({ passthrough: true }) response: Response & { cookie: any },
  ) {
    const accessToken = await this.authService.refresh(userId);
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
    response.cookie('x-access-token', accessToken, {
      signed: false,
      expires: oneHourFromNow,
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      secure: true,
      sameSite: 'lax',
    });
  }
}
