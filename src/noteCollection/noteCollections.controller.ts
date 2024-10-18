import { CurrentUser } from './../decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NoteCollectionRequest } from './dto/noteCollection.request';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { NoteCollectionsService } from './noteCollections.service';
import { NoteCollection, User } from '@prisma/client';
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
  getAllNoteCollections(@CurrentUser() user: User): Promise<NoteCollection[]> {
    return this.noteCollectionsService.findMany(user);
  }

  @Get('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  getNoteCollection(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.findOne(user, id);
  }

  @Post()
  @ApiCreatedResponse({ type: NoteCollectionEntity })
  createNoteCollection(
    @CurrentUser() user: User,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.createNoteCollection(user, body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  updateNoteCollection(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.updateNoteCollection(user, id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: NoteCollectionEntity })
  deleteNoteCollection(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<NoteCollection> {
    return this.noteCollectionsService.deleteNoteCollection(user, id);
  }
}
