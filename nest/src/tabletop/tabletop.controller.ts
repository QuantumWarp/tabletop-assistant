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
import {
  CreateTabletop,
  Tabletop,
  UpdateTabletop,
} from 'tabletop-assistant-common';
import { MicrosoftGuard } from 'src/setup/microsoft.strategy';
import { UserId } from 'src/setup/user.decorator';
import { TabletopService } from './tabletop.service';

@UseGuards(MicrosoftGuard)
@Controller('tabletops')
export class TabletopController {
  constructor(private service: TabletopService) {}

  @Get()
  async getAll(@UserId() userId: string): Promise<Tabletop[]> {
    return this.service.getAll(userId);
  }

  @Get(':id')
  async get(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<Tabletop> {
    return this.service.get(userId, id);
  }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() tabletop: CreateTabletop,
  ): Promise<Tabletop> {
    return this.service.create(userId, tabletop);
  }

  @Put()
  async update(
    @UserId() userId: string,
    @Body() tabletop: UpdateTabletop,
  ): Promise<Tabletop> {
    return this.service.update(userId, tabletop);
  }

  @Delete(':id')
  async delete(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.service.delete(userId, id);
  }
}
