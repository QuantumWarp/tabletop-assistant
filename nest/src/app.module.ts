import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MicrosoftStrategy } from './setup/auth';
import { TabletopController } from './tabletop/tabletop.controller';
import { tabletopSchema } from './tabletop/tabletop.model';
import TabletopRepository from './tabletop/tabletop.repository';
import { userSchema } from './user/user.models';
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
    MongooseModule.forFeature([
      { name: 'Tabletop', schema: tabletopSchema },
      { name: 'User', schema: userSchema },
    ]),
  ],
  controllers: [TabletopController],
  providers: [TabletopRepository, UserRepository, MicrosoftStrategy],
})
export class AppModule {}
