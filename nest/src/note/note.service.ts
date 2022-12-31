import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, CreateNote, UpdateNote } from 'tabletop-assistant-common';

export class NoteService {
  constructor(@InjectModel('Note') private noteModel: Model<Note>) {}

  async getAll(userId: string, tabletopId: string): Promise<Note[]> {
    return this.noteModel.find({ tabletopId, userId });
  }

  async get(userId: string, _id: string): Promise<Note> {
    const model = await this.noteModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    return model;
  }

  async create(userId: string, tabletop: CreateNote): Promise<Note> {
    const model = new this.noteModel({ ...tabletop, userId });
    await model.save();
    return model;
  }

  async update(userId: string, tabletop: UpdateNote): Promise<Note> {
    const model = await this.noteModel.findOne({ _id: tabletop._id, userId });
    if (!model) throw new NotFoundException();
    model.set(tabletop);
    await model.save();
    return model;
  }

  async delete(userId: string, _id: string): Promise<void> {
    const model = await this.noteModel.findOne({ _id, userId });
    if (!model) throw new NotFoundException();
    await model.delete();
  }
}
