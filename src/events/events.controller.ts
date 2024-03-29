import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetId } from 'src/auth/decorator/get-id.decorator';
import { GetWorkDto } from './dto/get-work.dto';

@ApiTags('events')
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@GetId() userId: string, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(+userId, createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetId() userId: string) {
    const event = this.eventsService.getEvent(+id);
    this.eventsService.parmissionChack(event, +userId);
    return event;
  }

  @Get(':id/works')
  findWorks(@Param('id') id: string): Promise<GetWorkDto> {
    return this.eventsService.findWorks(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetId() userId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(+id, +userId, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
