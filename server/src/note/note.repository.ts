import { Note, CreateNote, UpdateNote } from 'tabletop-assistant-common';
import { ResourceNotFound } from '../setup/error';
import NoteModel from './note.model';

export default class NoteRepository {
  constructor(
    private userId: string,
  ) {}

  async getAll(tabletopId: string): Promise<Note[]> {
    return NoteModel.find({ userId: this.userId, tabletopId });
  }

  async get(_id: string): Promise<Note> {
    const model = await NoteModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    return model;
  }

  async create(tabletop: CreateNote): Promise<Note> {
    const model = new NoteModel({ ...tabletop, userId: this.userId });
    await model.save();
    return model;
  }

  async update(tabletop: UpdateNote): Promise<Note> {
    const model = await NoteModel.findOne({ _id: tabletop._id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    model.set(tabletop);
    await model.save();
    return model;
  }

  async delete(_id: string): Promise<void> {
    const model = await NoteModel.findOne({ _id, userId: this.userId });
    if (!model) throw new ResourceNotFound();
    await model.delete();
  }
}
