import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { NoteCollectionsController } from './note-collections.controller';
import { NoteCollectionsService } from './note-collections.service';

@Module({
  imports: [AuthModule],
  controllers: [NoteCollectionsController],
  providers: [NoteCollectionsService, PrismaService, UsersService],
})
export class NoteCollectionsModule {}
