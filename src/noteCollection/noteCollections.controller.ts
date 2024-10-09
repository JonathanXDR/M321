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
  async getAllNoteCollections(@Request() req: any): Promise<NoteCollection[]> {
    return this.noteCollectionsService.findMany(req);
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async getNoteCollection(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.findOne(req, id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: NoteCollectionEntity })
  async createNoteCollection(
    @Request() req: any,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.createNoteCollection(body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async updateNoteCollection(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.updateNoteCollection(req, id, body);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async deleteNoteCollection(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.deleteNoteCollection(req, id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
