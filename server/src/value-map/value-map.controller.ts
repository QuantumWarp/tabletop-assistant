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
  CreateValueMap,
  UpdateValueMap,
  ValueMap,
} from 'tabletop-assistant-common';
import { MicrosoftGuard } from 'src/setup/microsoft.strategy';
import { UserId } from 'src/setup/user.decorator';
import { ValueMapService } from './value-map.service';

@UseGuards(MicrosoftGuard)
@Controller('value-maps')
export class ValueMapController {
  constructor(private service: ValueMapService) {}

  @Get()
  async getAll(
    @UserId() userId: string,
    @Query('tabletopId') tabletopId: string,
  ): Promise<ValueMap[]> {
    return this.service.getAll(userId, tabletopId);
  }

  @Get(':entityId')
  async get(
    @UserId() userId: string,
    @Param('entityId') entityId: string,
  ): Promise<ValueMap> {
    return this.service.get(userId, entityId);
  }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() valueMaps: CreateValueMap[],
  ): Promise<ValueMap[]> {
    return this.service.create(userId, valueMaps);
  }

  @Put()
  async update(
    @UserId() userId: string,
    @Body() valueMaps: UpdateValueMap[],
  ): Promise<ValueMap[]> {
    return this.service.update(userId, valueMaps);
  }

  @Delete(':entityId')
  async delete(
    @UserId() userId: string,
    @Param('entityId') entityId: string,
  ): Promise<void> {
    this.service.delete(userId, entityId);
  }
}
