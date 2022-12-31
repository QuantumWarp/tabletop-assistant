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
import { MicrosoftGuard } from 'src/setup/auth';
import {
  CreateTabletop,
  Tabletop,
  UpdateTabletop,
} from 'tabletop-assistant-common';
import TabletopRepository from './tabletop.repository';
import { UserId } from 'src/setup/user.decorator';

@UseGuards(MicrosoftGuard)
@Controller('tabletops')
export class TabletopController {
  constructor(private repository: TabletopRepository) {}

  @Get()
  async getAll(@UserId() userId: string): Promise<Tabletop[]> {
    console.log(userId);
    return this.repository.getAll(userId);
  }

  @Get(':id')
  async get(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<Tabletop> {
    return this.repository.get(userId, id);
  }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() tabletop: CreateTabletop,
  ): Promise<Tabletop> {
    return this.repository.create(userId, tabletop);
  }

  @Put()
  async update(
    @UserId() userId: string,
    @Body() tabletop: UpdateTabletop,
  ): Promise<Tabletop> {
    return this.repository.update(userId, tabletop);
  }

  @Delete(':id')
  async delete(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.repository.delete(userId, id);
  }
}
