import { CurrentUser } from './../decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
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
  async getAllNoteCollections(@CurrentUser() user): Promise<NoteCollection[]> {
    console.log(user);
    return this.noteCollectionsService.findMany(user);
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async getNoteCollection(
    @CurrentUser() user,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.findOne(user, id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: NoteCollectionEntity })
  async createNoteCollection(
    @CurrentUser() user,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.createNoteCollection(body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async updateNoteCollection(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.updateNoteCollection(user, id, body);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  async deleteNoteCollection(
    @CurrentUser() user,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    try {
      return this.noteCollectionsService.deleteNoteCollection(user, id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
