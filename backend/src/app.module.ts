import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NoteCollectionsModule } from './note-collections/note-collections.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, NotesModule, NoteCollectionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}