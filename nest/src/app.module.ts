import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { TabletopController } from './tabletop/tabletop.controller';
import { tabletopSchema } from './tabletop/tabletop.model';
import TabletopRepository from './tabletop/tabletop.repository';
import { userSchema } from './user/user.models';
import UserRepository from './user/user.repository';
import { MicrosoftStrategy } from './setup/microsoft.strategy';

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
    PassportModule,
  ],
  controllers: [TabletopController],
  providers: [TabletopRepository, UserRepository, MicrosoftStrategy],
})
export class AppModule {}
