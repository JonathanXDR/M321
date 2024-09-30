import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { NoteCollectionsService } from './noteCollections.service';
import { NoteCollectionsController } from './noteCollections.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [NoteCollectionsController],
  providers: [NoteCollectionsService, PrismaService],
})
export class NoteCollectionsModule {}
