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
import {
  CreateEntity,
  HistoryEntry,
  UpdateEntity,
} from 'tabletop-assistant-common';
import { MicrosoftGuard } from 'src/setup/microsoft.strategy';
import { UserId } from 'src/setup/user.decorator';
import { HistoryService } from './history.service';

@UseGuards(MicrosoftGuard)
@Controller('history')
export class HistoryController {
  constructor(private service: HistoryService) {}

  @Get()
  async getAll(
    @UserId() userId: string,
    @Query('tabletopId') tabletopId: string,
  ): Promise<HistoryEntry[]> {
    return this.service.getAll(userId, tabletopId);
  }

  @Get(':id')
  async get(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<HistoryEntry> {
    return this.service.get(userId, id);
  }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() entity: CreateEntity,
  ): Promise<HistoryEntry> {
    return this.service.create(userId, entity);
  }

  @Put()
  async update(
    @UserId() userId: string,
    @Body() entity: UpdateEntity,
  ): Promise<HistoryEntry> {
    return this.service.update(userId, entity);
  }

  @Delete(':id')
  async delete(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    this.service.delete(userId, id);
  }
}
