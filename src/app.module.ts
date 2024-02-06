import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { EventsResolver } from './events/events.resolver';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, AuthModule, EventsModule],
  controllers: [],
  providers: [PrismaService, EventsResolver],
  exports: [PrismaService],
})
export class AppModule {}
