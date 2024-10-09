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

@UseGuards(JwtAuthGuard)
@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOkResponse({ type: [NoteEntity] })
  async getAllNotes(@Request() req: any): Promise<Note[]> {
    return this.notesService.findMany(req);
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async getNote(@Request() req: any, @Param('id') id: string): Promise<Note> {
    try {
      return this.notesService.findOne(req, id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: NoteEntity })
  async createNote(
    @Request() req: any,
    @Body() body: NoteRequest,
  ): Promise<Note> {
    return this.notesService.createNote(req, body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async updateNote(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ): Promise<Note> {
    return this.notesService.updateNote(req, id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async deleteNote(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<Note> {
    return this.notesService.deleteNote(req, id);
  }
}
