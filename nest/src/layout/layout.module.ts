import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LayoutController } from './layout.controller';
import { layoutSchema } from './layout.schema';
import { LayoutService } from './layout.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Layout', schema: layoutSchema }]),
  ],
  controllers: [LayoutController],
  providers: [LayoutService],
  exports: [LayoutService],
})
export class LayoutModule {}
