import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
