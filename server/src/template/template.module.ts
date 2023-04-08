import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityModule } from 'src/entity/entity.module';
import { LayoutModule } from 'src/layout/layout.module';
import { TemplateController } from './template.controller';
import { templateRootSchema } from './template-root.schema';
import { TemplateService } from './template.service';
import { templateGroupSchema } from './template-group.schema';
import { TemplateGroupService } from './template-group.service';
import { ValueMapModule } from '../value-map/value-map.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TemplateRoot', schema: templateRootSchema },
      { name: 'TemplateGroup', schema: templateGroupSchema },
    ]),
    EntityModule,
    LayoutModule,
    ValueMapModule,
  ],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateGroupService],
  exports: [TemplateService, TemplateGroupService],
})
export class TemplateModule {}
