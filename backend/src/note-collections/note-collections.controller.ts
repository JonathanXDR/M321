import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NoteCollection, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { NoteCollectionRequest } from './dto/note-collection.request';
import { NoteCollectionEntity } from './note-collection.entity';
import { NoteCollectionsService } from './note-collections.service';

@UseGuards(JwtAuthGuard)
@Controller('note-collections')
@ApiTags('note-collections')
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
