import ApiError from '../helpers/ApiError.helper.js';
import ApiResponse from '../helpers/ApiResponse.js';

// import {
//   // listTaskService,
//   // softDeleteTaskByIdService,
//   // hardDeleteTaskService,
//   updateTaskService,
// } from '../services/tasks.service.js';

export const listTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(400, 'Missing task identifier');
  }

  const result = await listTaskService(taskId);
  new ApiResponse(res, 200, result, 'Task retrieved successfully');
};

export const softDeleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(400, 'Task ID is required');
  }
  const deleteCount = await softDeleteTaskByIdService(taskId);
  new ApiResponse(res, 200, { deleteCount }, 'Task deleted successfully');
};

export const hardDeleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(400, 'Task ID is required');
  }
  const deleteCount = await hardDeleteTaskService(taskId);
  new ApiResponse(
    res,
    200,
    { deleteCount },
    'Task permanently deleted successfully'
  );
};

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    throw new ApiError(400, 'Task ID is required');
  }
  const result = await updateTaskService(taskId);
  new ApiResponse(res, 200, result, 'Task updated successfully');
};
