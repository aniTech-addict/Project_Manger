import mongoose, { Schema } from 'mongoose';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLen: 500,
    },
    tags: {
      type: [String],
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true

    }
  },
  { timestamps: true }
);

export const Board = mongoose.model('Board', boardSchema);
