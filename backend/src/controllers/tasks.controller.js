import ApiError from '../helpers/ApiError.helper.js';
import ApiResponse from '../helpers/ApiResponse.js';

import {
  listTaskService,
  // deleteTaskService,
  updateTaskService,
  // deleteTasksService
} from '../services/tasks.service.js';

export const listTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(400, 'Missing task identifier');
  }

  const result = await listTaskService(taskId);
  new ApiResponse(res, 200, result, 'Task retrieved successfully');
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(400, 'Task ID is required');
  }
  const deleteCount = await deleteTaskService(taskId);
  new ApiResponse(res, 200, { deleteCount }, 'Task deleted successfully');
};

export const deleteTasksService = async(req, res) => {
  const tasks = req.body.taskIds
  if (tasks.length == 0){
    throw ApiError(400, "Empty tasksIds provided")
  }
  const result = await deleteTasksService(tasks)
  new ApiResponse(res, result, "Tasks deleted")
}

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const updateData = req.body

  if (!taskId) {
    throw new ApiError(400, 'Task ID is required');
  }

  const result = await updateTaskService(taskId, updateData);
  new ApiResponse(res, 200, result, 'Task updated successfully');
};
