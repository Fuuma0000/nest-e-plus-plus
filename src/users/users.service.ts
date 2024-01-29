import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
