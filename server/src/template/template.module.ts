import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityModule } from 'src/entity/entity.module';
import { LayoutModule } from 'src/layout/layout.module';
import { TemplateController } from './template.controller';
import { templateSchema } from './template.schema';
import { TemplateService } from './template.service';
import { templatedEntitySchema } from './templated-entity.schema';
import { TemplatedEntityService } from './templated-entity.service';
import { templatedLayoutSchema } from './templated-layout.schema';
import { TemplatedLayoutService } from './templated-layout.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Template', schema: templateSchema },
      { name: 'TemplatedEntity', schema: templatedEntitySchema },
      { name: 'TemplatedLayout', schema: templatedLayoutSchema },
    ]),
    EntityModule,
    LayoutModule,
  ],
  controllers: [TemplateController],
  providers: [TemplateService, TemplatedEntityService, TemplatedLayoutService],
  exports: [TemplateService, TemplatedEntityService, TemplatedLayoutService],
})
export class TemplateModule {}
