import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateNote, Note, UpdateNote } from 'tabletop-assistant-common';
import { MicrosoftGuard } from 'src/setup/microsoft.strategy';
import { UserId } from 'src/setup/user.decorator';
import { NoteService } from './note.service';

@UseGuards(MicrosoftGuard)
@Controller('notes')
export class NoteController {
  constructor(private service: NoteService) {}

  @Get()
  async getAll(
    @UserId() userId: string,
    @Query('tabletopId') tabletopId: string,
  ): Promise<Note[]> {
    return this.service.getAll(userId, tabletopId);
  }

  @Get(':id')
  async get(@UserId() userId: string, @Param('id') id: string): Promise<Note> {
    return this.service.get(userId, id);
  }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() note: CreateNote,
  ): Promise<Note> {
    return this.service.create(userId, note);
  }

  @Put()
  async update(
    @UserId() userId: string,
    @Body() note: UpdateNote,
  ): Promise<Note> {
    return this.service.update(userId, note);
  }

  @Delete(':id')
  async delete(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    this.service.delete(userId, id);
  }
}
