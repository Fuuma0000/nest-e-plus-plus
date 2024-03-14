import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaClient } from '@prisma/client';
import { GetWorkDto } from './dto/get-work.dto';

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

  async isJoinedCheck(eventId: number, userId: number) {
    const isJoined = await this.prisma.event_user_authority.findFirst({
      where: {
        user_id: userId,
        event_id: eventId,
      },
      select: {
        authority_id: true,
      },
    });

    if (!isJoined) {
      throw new ForbiddenException(`イベントに参加していません`);
    }
  }

  async parmissionChack(event, userId: number) {
    if (!event.is_requires_password) {
      return;
    }
    this.isJoinedCheck(event.id, userId);
  }

  async getEvent(id: number) {
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

    return event;
  }

  // getWorks
  async findWorks(evntId: number): Promise<GetWorkDto> {
    // イベントが存在するかどうかを確認
    const existEvent = await this.prisma.event.findUnique({
      where: {
        id: evntId,
      },
      select: {
        id: true,
      },
    });

    if (!existEvent) {
      throw new NotFoundException(`イベントが見つかりませんでした`);
    }

    const works = await this.prisma.work.findMany({
      where: {
        event_id: evntId,
      },
      select: {
        work_data: {
          where: {
            is_approved: true,
          },
          orderBy: {
            updated_at: 'desc',
          },
          take: 1,
          select: {
            work_id: true,
            name: true,
            catch_copy: true,
            thumbnail_url: true,
          },
        },
      },
    });

    console.log(works);

    if (works.length === 0) {
      return new GetWorkDto();
    }

    const getWorkDto = new GetWorkDto();
    getWorkDto.works = works.map((work) => ({
      event_id: evntId,
      work_id: work.work_data[0].work_id,
      name: work.work_data[0].name,
      catch_copy: work.work_data[0].catch_copy,
      thumbnail_url: work.work_data[0].thumbnail_url,
    }));

    return getWorkDto;
  }

  async update(
    eventId: number,
    userId: number,
    updateEventDto: UpdateEventDto,
  ) {
    const existData = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        event_user_authoritys: {
          where: {
            user_id: userId,
          },
          select: {
            authoritys: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!existData) {
      throw new NotFoundException(`イベントが見つかりませんでした`);
    }

    // 管理者であるかどうかの判定
    const isAdmin = existData.event_user_authoritys.some(
      (authority) => authority.authoritys.id === 1, // 1: 管理者
    );

    if (!isAdmin) {
      throw new ForbiddenException(`管理者ではないため、更新できません`);
    }

    // Prisma の update メソッドを使用してデータを更新
    const updatedEvent = await this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...updateEventDto,
        start_at: updateEventDto.start_at
          ? new Date(updateEventDto.start_at)
          : null,
        end_at: updateEventDto.end_at ? new Date(updateEventDto.end_at) : null,
      },
    });

    return updatedEvent;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
