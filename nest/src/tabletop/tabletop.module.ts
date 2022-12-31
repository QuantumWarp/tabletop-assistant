import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TabletopController } from './tabletop.controller';
import { tabletopSchema } from './tabletop.schema';
import { TabletopService } from './tabletop.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tabletop', schema: tabletopSchema }]),
  ],
  controllers: [TabletopController],
  providers: [TabletopService],
  exports: [TabletopService],
})
export class TabletopModule {}
