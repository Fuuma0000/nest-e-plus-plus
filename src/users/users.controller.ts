import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetId } from 'src/auth/decorator/get-id.decorator';
import { GetUserResponseDto } from './dto/get-user-resopnse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users') // 必要に応じてタグを追加
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiResponse({
    status: 200,
    description: '成功時のレスポンス',
    type: GetUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'ユーザが見つからない時のエラー',
  })
  findMe(@GetId() userId: string): Promise<GetUserResponseDto> {
    return this.usersService.findOne(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: '成功時のレスポンス',
    type: GetUserResponseDto,
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

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@GetId() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@GetId() userId: string) {
    return this.usersService.remove(+userId);
  }
}
