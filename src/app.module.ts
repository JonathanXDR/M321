import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { NoteCollectionsModule } from './noteCollection/noteCollections.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, AuthModule, NotesModule, NoteCollectionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
