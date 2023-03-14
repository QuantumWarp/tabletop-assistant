import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { MicrosoftStrategy } from './setup/microsoft.strategy';
import { EntityModule } from './entity/entity.module';
import { HistoryModule } from './history/history.module';
import { LayoutModule } from './layout/layout.module';
import { NoteModule } from './note/note.module';
import { TabletopModule } from './tabletop/tabletop.module';
import { UserModule } from './user/user.module';
import { ValueMapModule } from './value-map/value-map.module';
import { TemplateModule } from './template/template.module';
import { ImageModule } from './image/image.module';

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
    PassportModule,

    // Features
    EntityModule,
    HistoryModule,
    ImageModule,
    LayoutModule,
    NoteModule,
    TabletopModule,
    TemplateModule,
    UserModule,
    ValueMapModule,
  ],
  providers: [MicrosoftStrategy],
})
export class AppModule {}
