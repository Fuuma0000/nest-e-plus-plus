import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaClient) {}

  create(userId: number, createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        start_at: new Date(createEventDto.start_at),
        end_at: new Date(createEventDto.end_at),
        event_user_authoritys: {
          create: {
            user_id: userId,
            authority_id: 1,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.event.findMany({
      select: {
        id: true,
        name: true,
        start_at: true,
        end_at: true,
        icon_url: true,
        description: true,
        is_requires_password: true,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        start_at: true,
        end_at: true,
        icon_url: true,
        description: true,
        detail: true,
        need_proofreading: true,
        is_requires_password: true,
      },
    });

    if (!event) {
      throw new NotFoundException(`イベントが見つかりませんでした`);
    }

    if (event.is_requires_password) {
      const isJoined = await this.prisma.event_user_authority.findFirst({
        where: {
          user_id: userId,
          event_id: id,
        },
        select: {
          authority_id: true,
        },
      });

      if (!isJoined) {
        throw new ForbiddenException(
          `イベントに参加していません。パスワードを入力してください`,
        );
      }
    }

    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
