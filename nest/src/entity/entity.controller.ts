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
import { CreateEntity, Entity, UpdateEntity } from 'tabletop-assistant-common';
import { MicrosoftGuard } from 'src/setup/microsoft.strategy';
import { UserId } from 'src/setup/user.decorator';
import { EntityService } from './entity.service';

@UseGuards(MicrosoftGuard)
@Controller('entities')
export class EntityController {
  constructor(private service: EntityService) {}

  @Get()
  async getAll(
    @UserId() userId: string,
    @Query('tabletopId') tabletopId: string,
  ): Promise<Entity[]> {
    return this.service.getAll(userId, tabletopId);
  }

  @Get(':id')
  async get(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<Entity> {
    return this.service.get(userId, id);
  }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() entity: CreateEntity,
  ): Promise<Entity> {
    return this.service.create(userId, entity);
  }

  @Put()
  async update(
    @UserId() userId: string,
    @Body() entity: UpdateEntity,
  ): Promise<Entity> {
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
