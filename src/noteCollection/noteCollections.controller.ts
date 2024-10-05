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
    });
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async getNoteCollection(
    @Request() req,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: NoteCollectionEntity })
  async createNoteCollection(
    @Request() req,
    @Body() request: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.createNoteCollection(request);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async updateNoteCollection(
    @Request() req,
    @Param('id') id: string,
    @Body() request: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.updateNoteCollection({
        where: { id },
        data: request,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async deleteNoteCollection(@Param('id') id: string): Promise<NoteCollection> {
    return this.noteCollectionsService.deleteNoteCollection({ id });
  }
}
