import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NoteCollectionRequest } from './dto/noteCollection.request';
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
import { NoteCollectionsService } from './noteCollections.service';
import { NoteCollection } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NoteCollectionEntity } from './noteCollection.entity';

@UseGuards(JwtAuthGuard)
@Controller('note-collections')
@ApiTags('noteCollections')
export class NoteCollectionsController {
  constructor(
    private readonly noteCollectionsService: NoteCollectionsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [NoteCollectionEntity] })
  async getAllNoteCollections(@Request() req): Promise<NoteCollection[]> {
    return this.noteCollectionsService.findMany({
      where: { userId: req.user.id },
      include: { notes: true },
    });
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async getNoteCollection(
    @Request() req,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.findOne({
        req,
        where: { id },
        include: { notes: true },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: NoteCollectionEntity })
  async createNoteCollection(
    @Request() req,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.createNoteCollection({
      data: { title: body.title },
    });
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async updateNoteCollection(
    @Request() req,
    @Param('id') id: string,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.updateNoteCollection({
        req,
        where: { id },
        data: { title: body.title },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async deleteNoteCollection(
    @Request() req,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.deleteNoteCollection({
        req,
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
