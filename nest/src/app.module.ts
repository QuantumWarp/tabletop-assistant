import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MicrosoftStrategy } from './setup/auth';
import { TabletopController } from './tabletop/tabletop.controller';
import TabletopRepository from './tabletop/tabletop.repository';
import UserRepository from './user/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_CONNECTION'),
      }),
    }),
  ],
  controllers: [TabletopController],
  providers: [TabletopRepository, UserRepository, MicrosoftStrategy],
})
export class AppModule {}
