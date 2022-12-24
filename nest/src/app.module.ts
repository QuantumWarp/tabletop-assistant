import { Module } from '@nestjs/common';
import { TabletopController } from './tabletop/tabletop.controller';
import TabletopRepository from './tabletop/tabletop.repository';

@Module({
  imports: [],
  controllers: [TabletopController],
  providers: [TabletopRepository],
})
export class AppModule {}
