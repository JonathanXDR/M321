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
  async getAllNotes(@Request() req): Promise<Note[]> {
    return this.notesService.findMany({
      where: { NoteCollection: { userId: req.user.id } },
      include: {
        NoteCollection: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async getNote(@Request() req, @Param('id') id: string): Promise<Note> {
    try {
      return this.notesService.findOne({
        req,
        where: { id },
        include: {
          NoteCollection: {
            select: {
              userId: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: NoteEntity })
  async createNote(@Request() req, @Body() body: NoteRequest): Promise<Note> {
    return this.notesService.createNote(body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async updateNote(
    @Request() req,
    @Param('id') id: string,
    @Body() body: NoteRequest,
  ): Promise<Note> {
    try {
      return this.notesService.updateNote({
        where: { id },
        data: body,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteEntity })
  async deleteNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.deleteNote({ id });
  }
}
