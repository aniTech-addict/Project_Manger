import ApiError from '../helpers/ApiError.helper.js';
import ApiResponse from '../helpers/ApiResponse.js';

import {
  createBoardService,
  listBoardService,
  listBoardsService,
  softDeleteBoardService,
  hardDeleteBoardService,
  updateBoardService,
} from '../services/boards.service.js';

import { listTasksService, createTaskService } from '../services/tasks.service.js';

export const listBoard = async (req, res) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    throw new ApiError(400, 'Board ID is required');
  }

  const result = await listBoardService(boardId);
  new ApiResponse(res, 200, result, 'Board retrieved successfully');
};

export const listBoards = async (req, res) => {
  const result = await listBoardsService();
  new ApiResponse(res, 200, result);
};

export const createBoard = async (req, res) => {
  const { title, description, tags } = req.body;
  if (!title) {
    throw new ApiError(400, 'Title not defined');
  }

  const result = await createBoardService({ title, description, tags });
  new ApiResponse(res, 201, { id: result._id }, 'Board created successfully');
};

export const softDeleteBoard = async (req, res) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    throw new ApiError(400, 'Board ID is required');
  }
  await softDeleteBoardService(boardId);
  new ApiResponse(res, 200, { id: boardId }, 'Board archived successfully');
};

export const hardDeleteBoard = async (req, res) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    throw new ApiError(400, 'Board ID is required');
  }
  await hardDeleteBoardService(boardId);
  new ApiResponse(
    res,
    200,
    { id: boardId },
    'Board permanently deleted successfully'
  );
};

export const updateBoard = async (req, res) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    throw new ApiError(400, 'Board ID is required');
  }
  const result = await updateBoardService(boardId, req.body);
  new ApiResponse(res, 200, result, 'Board updated successfully');
};

// ================================== TASK ===================================

export const listTasks = async (req, res) => {
  const boardId = req.params.boardId;
  if (!boardId) {
    throw new ApiError(400, 'Board id not defined');
  }
  const result = await listTasksService(boardId);
  new ApiResponse(res, 200, result, 'Tasks retrieved');
};

export const createTask = async (req, res) => {
  const boardId = req.params.boardId;
  const { title, description, status, tags } = req.body;
  if (!title) {
    throw new ApiError(400, 'Title not defined');
  }
  if (!description) {
    throw new ApiError(400, 'Description not defined');
  }
  if (!status) {
    throw new ApiError(400, 'Status not defined');
  }
  if (!tags) {
    throw new ApiError(400, 'Tags not defined');
  }

  const result = await createTaskService(
    { title, description, status, tags },
    boardId
  );
  new ApiResponse(res, 201, { id: result._id }, 'Task created successfully');
};
