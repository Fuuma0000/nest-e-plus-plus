import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        enrollment_year: true,
        graduation_year: true,
        is_job_hunt_completed: true,
        self_introduction: true,
        icon_url: true,
        created_at: true,
        updated_at: true,
        bookmarks: {
          select: {
            work_id: true,
          },
        },
        event_user_roles: {
          select: {
            event_id: true,
          },
        },
        courses: {
          select: {
            id: true,
            name: true,
          },
        },
        user_jobs: true,
        user_urls: true,
        work_data_users: true,
      },
    });
    if (!user) {
      // ユーザが存在しない場合、NotFoundExceptionをスロー
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
  }

  remove(userId: number) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
