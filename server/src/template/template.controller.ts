import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  TemplateImport,
  TemplateRoot,
  TemplateSummary,
} from 'tabletop-assistant-common';
import { MicrosoftGuard } from 'src/setup/microsoft.strategy';
import { UserId } from 'src/setup/user.decorator';
import { TemplateService } from './template.service';

@UseGuards(MicrosoftGuard)
@Controller('templates')
export class TemplateController {
  constructor(private service: TemplateService) {}

  @Get()
  async getAll(): Promise<TemplateRoot[]> {
    return this.service.getAll();
  }

  @Get('summary')
  async getSummary(
    @Query('templateRootId') templateRootId?: string,
  ): Promise<TemplateSummary> {
    return this.service.summaries(templateRootId);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<TemplateRoot> {
    return this.service.get(id);
  }

  @Post('import')
  async import(
    @UserId() userId: string,
    @Body() model: TemplateImport,
  ): Promise<void> {
    await this.service.import(userId, model);
  }
}
