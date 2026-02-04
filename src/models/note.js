import { Schema } from 'mongoose';

import { model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true, // прибирає пробіли на початку та в кінці
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      required: false,
      default: 'Todo',
      enum: TAGS,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
noteSchema.index(
  { title: 'text', content: 'text', tag: 'text' },
  {
    name: 'NoteTextIndex',
    weights: { title: 10, tag: 2 },
    default_language: 'english',
  },
);

export const Note = model('Note', noteSchema);
