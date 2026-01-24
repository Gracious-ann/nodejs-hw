import { Schema } from 'mongoose';

import { model } from 'mongoose';

const noteSchema = new Schema(
  {
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
      // enum: [
      //   'Work',
      //   'Personal',
      //   'Meeting',
      //   'Shopping',
      //   'Ideas',
      //   'Travel',
      //   'Finance',
      //   'Health',
      //   'Important',
      //   'Todo',
      // ],
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
