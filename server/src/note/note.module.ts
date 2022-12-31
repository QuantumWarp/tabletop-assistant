import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from './note.controller';
import { noteSchema } from './note.schema';
import { NoteService } from './note.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: noteSchema }])],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
