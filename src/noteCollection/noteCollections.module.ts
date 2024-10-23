import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './../users/users.service';
import { NoteCollectionsController } from './noteCollections.controller';
import { NoteCollectionsService } from './noteCollections.service';

@Module({
  imports: [AuthModule],
  controllers: [NoteCollectionsController],
  providers: [NoteCollectionsService, PrismaService, UsersService],
})
export class NoteCollectionsModule {}
