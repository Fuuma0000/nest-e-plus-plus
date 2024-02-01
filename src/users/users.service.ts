import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}
  findAll(userId: string) {
    console.log('userId', userId);
    return this.prisma.user.findMany();
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
