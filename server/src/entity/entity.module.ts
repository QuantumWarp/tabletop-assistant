import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValueMapModule } from '@/value-map/value-map.module';
import { EntityController } from './entity.controller';
import { entitySchema } from './entity.schema';
import { EntityService } from './entity.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entity', schema: entitySchema }]),
    ValueMapModule,
  ],
  controllers: [EntityController],
  providers: [EntityService],
  exports: [EntityService],
})
export class EntityModule {}
