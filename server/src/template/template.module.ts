import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityModule } from 'src/entity/entity.module';
import { LayoutModule } from 'src/layout/layout.module';
import { TemplateController } from './template.controller';
import { templateRootSchema } from './template-root.schema';
import { TemplateService } from './template.service';
import { templateEntitySchema } from './template-entity.schema';
import { TemplateEntityService } from './template-entity.service';
import { templateLayoutSchema } from './template-layout.schema';
import { TemplateLayoutService } from './template-layout.service';
import { templateGroupSchema } from './template-group.schema';
import { TemplateGroupService } from './template-group.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TemplateRoot', schema: templateRootSchema },
      { name: 'TemplateGroup', schema: templateGroupSchema },
      { name: 'TemplateEntity', schema: templateEntitySchema },
      { name: 'TemplateLayout', schema: templateLayoutSchema },
    ]),
    EntityModule,
    LayoutModule,
  ],
  controllers: [TemplateController],
  providers: [
    TemplateService,
    TemplateGroupService,
    TemplateEntityService,
    TemplateLayoutService,
  ],
  exports: [
    TemplateService,
    TemplateGroupService,
    TemplateEntityService,
    TemplateLayoutService,
  ],
})
export class TemplateModule {}
