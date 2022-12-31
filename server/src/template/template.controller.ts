import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TemplateImport, TemplateSummaries } from 'tabletop-assistant-common';
import { MicrosoftGuard } from 'src/setup/microsoft.strategy';
import { UserId } from 'src/setup/user.decorator';
import { TemplateService } from './template.service';

@UseGuards(MicrosoftGuard)
@Controller('templates')
export class TemplateController {
  constructor(private service: TemplateService) {}

  @Get('summaries')
  async summaries(): Promise<TemplateSummaries> {
    return this.service.summaries();
  }

  @Post('import')
  async import(
    @UserId() userId: string,
    @Body() model: TemplateImport,
  ): Promise<void> {
    await this.service.import(userId, model);
  }
}
