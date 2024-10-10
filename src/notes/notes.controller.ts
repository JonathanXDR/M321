import { UseGuards, Request } from '@nestjs/common';
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
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '@prisma/client';
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
  async getAllNotes(@CurrentUser() user): Promise<Note[]> {
    return this.notesService.findMany(user);
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async getNote(@CurrentUser() user, @Param('id') id: string): Promise<Note> {
    try {
      return this.notesService.findOne(user, id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: NoteEntity })
  async createNote(
    @CurrentUser() user,
    @Body() body: NoteRequest,
  ): Promise<Note> {
    return this.notesService.createNote(user, body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async updateNote(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ): Promise<Note> {
    return this.notesService.updateNote(user, id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async deleteNote(
    @CurrentUser() user,
    @Param('id') id: string,
  ): Promise<Note> {
    return this.notesService.deleteNote(user, id);
  }
}
