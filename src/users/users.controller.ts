import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateMeDto } from './dto/update-me.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetId } from 'src/auth/decorator/get-id.decorator';
import { GetUserResponseDto } from './dto/get-user-resopnse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateMeResponseDto } from './dto/update-me-response.dto';
import { GetMeResponseDto } from './dto/get-me-resopnse.dto';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description: '成功時のレスポンス',
    type: GetMeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'ユーザが見つからない時のエラー',
  })
  findMe(@GetId() userId: string): Promise<GetMeResponseDto> {
    return this.usersService.findOne(+userId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: '成功時のレスポンス',
    type: GetMeResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'ユーザのオプションで非表示の時のエラー',
  })
  @ApiResponse({
    status: 404,
    description: 'ユーザが見つからない時のエラー',
  })
  findOne(@Param('id') id: string): Promise<GetUserResponseDto> {
    return this.usersService.findOne(+id);
  }

  @Patch('me')
  @ApiResponse({
    status: 200,
    description: '成功時のレスポンス',
    type: UpdateMeResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'ユーザのオプションで非表示の時のエラー',
  })
  @ApiResponse({
    status: 404,
    description: 'ユーザが見つからない時のエラー',
  })
  update(
    @GetId() userId: string,
    @Body() updateMeDto: UpdateMeDto,
  ): Promise<UpdateMeResponseDto> {
    return this.usersService.update(+userId, updateMeDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete('me')
  // @ApiResponse({
  //   status: 204,
  //   description: '成功時のレスポンス',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'ユーザが見つからない時のエラー',
  // })
  // remove(@GetId() userId: string) {
  //   return this.usersService.remove(+userId);
  // }
}
