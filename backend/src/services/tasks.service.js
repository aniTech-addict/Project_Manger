import { Task } from '../db/models/tasks.model';
import ApiError from '../helpers/ApiError.helper';

// ========================= imported in Boards.controller ===============================

export const listTasksService = async (boardId) => {
  const result = await Task.find({ boardId });
  return result;
};

export const createTaskService = async (taskData, boardId) => {
  const newTask = new Task({ ...taskData, boardId });
  return await newTask.save();
};

// ----------------------------------------------------------------------------------------

export const listTaskService = async (listId) => {
  const foundTask = Task.findById(listId);
  if (!foundTask) {
    throw new ApiError(400, 'Task not found');
  }
  return foundTask;
};

export const deleteTask = async (taskId) => {
  const deleteCount = Task.findByIdAndDelete(taskId);
  if (!deleteCount) {
    throw new ApiError(404, 'error: Task not found');
  }
  return taskId;
};

export const updateTaskService = async (taskId, updateData) => {
  const result = await Task.findByIdAndUpdate(taskId, updateData, {
    new: true,
  });
  if (!result) {
    throw new ApiError(400, 'Task not found');
  }
  return result;
};
