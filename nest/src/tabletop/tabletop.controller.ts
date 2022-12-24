import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateTabletop,
  Tabletop,
  UpdateTabletop,
} from 'tabletop-assistant-common';
import TabletopRepository from './tabletop.repository';

@Controller('tabletop')
export class TabletopController {
  constructor(private repository: TabletopRepository) {}

  @Get()
  async getAll(): Promise<Tabletop[]> {
    return this.repository.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Tabletop> {
    return this.repository.get(id);
  }

  @Post()
  async create(@Body() tabletop: CreateTabletop): Promise<Tabletop> {
    return this.repository.create(tabletop);
  }

  @Put()
  async update(@Body() tabletop: UpdateTabletop): Promise<Tabletop> {
    return this.repository.update(tabletop);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
