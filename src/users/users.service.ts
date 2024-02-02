import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(userId: number) {
    let returnVal;

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          username: true,
          courses_id: true,
          enrollment_year: true,
          graduation_year: true,
          is_job_hunt_completed: true,
          self_introduction: true,
          icon_url: true,
          is_public_profile: true,
          created_at: true,
          updated_at: true,
          bookmarks: true,
          event_user_roles: true,
          courses: true,
          user_jobs: true,
          user_urls: true,
          work_data_users: true,
        },
      });
      return user;
    } catch (error) {
      console.log('error', error);
      return returnVal;
    }
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
  }

  remove(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
  }
}
