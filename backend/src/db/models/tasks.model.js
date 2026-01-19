import mongoose, { Schema } from 'mongoose';
import { Board } from './board.model';
const taskSchema = new Schema(
  {
    // ------(later) to maintain info about task owner ----
    // user_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },

    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['created', 'in progress', 'done', 'bugs', 'testing'], // bugs,testing set disabled by default
      required: true,
    },
    parent_task: {
      type: Schema.Types.ObjectId, // to change -> childTask [tasksID]
      ref: 'Task',
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },

    // createdAt -> defined in timestamps
    // due_date:{
    //     type: Date,
    // },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export { Task };
