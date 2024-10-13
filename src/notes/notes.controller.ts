import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NoteRequest } from './dto/note.request';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note, User } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NoteEntity } from './note.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOkResponse({ type: [NoteEntity] })
  getAllNotes(@CurrentUser() user: User): Promise<Note[]> {
    return this.notesService.findMany(user);
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteEntity })
  getNote(@CurrentUser() user: User, @Param('id') id: string): Promise<Note> {
    return this.notesService.findOne(user, id);
  }

  @Post()
  @ApiCreatedResponse({ type: NoteEntity })
  createNote(
    @CurrentUser() user: User,
    @Body() body: NoteRequest,
  ): Promise<Note> {
    return this.notesService.createNote(user, body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteEntity })
  updateNote(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() body: NoteRequest,
  ): Promise<Note> {
    return this.notesService.updateNote(user, id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteEntity })
  deleteNote(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<Note> {
    return this.notesService.deleteNote(user, id);
  }
}
