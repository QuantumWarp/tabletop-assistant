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
import { CreateLayout, Layout, UpdateLayout } from '@/common';
import { MicrosoftGuard } from '@/setup/microsoft.strategy';
import { UserId } from '@/setup/user.decorator';
import { LayoutService } from './layout.service';

@UseGuards(MicrosoftGuard)
@Controller('layouts')
export class LayoutController {
  constructor(private service: LayoutService) {}

  @Get()
  async getAll(
    @UserId() userId: string,
    @Query('tabletopId') tabletopId: string,
  ): Promise<Layout[]> {
    return this.service.getAll(userId, tabletopId);
  }

  @Get(':id')
  async get(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<Layout> {
    return this.service.get(userId, id);
  }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() layout: CreateLayout,
  ): Promise<Layout> {
    return this.service.create(userId, layout);
  }

  @Put()
  async update(
    @UserId() userId: string,
    @Body() layout: UpdateLayout,
  ): Promise<Layout> {
    return this.service.update(userId, layout);
  }

  @Delete(':id')
  async delete(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.service.delete(userId, id);
  }

  @Post()
  async order(@UserId() userId: string, @Body() ids: string[]): Promise<void> {
    await this.service.order(userId, ids);
  }
}
