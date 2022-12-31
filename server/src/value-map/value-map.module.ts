import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValueMapController } from './value-map.controller';
import { valueMapSchema } from './value-map.schema';
import { ValueMapService } from './value-map.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ValueMap', schema: valueMapSchema }]),
  ],
  controllers: [ValueMapController],
  providers: [ValueMapService],
  exports: [ValueMapService],
})
export class ValueMapModule {}
