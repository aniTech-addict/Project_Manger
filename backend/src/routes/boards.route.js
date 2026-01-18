import { Router } from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import {
  listBoards,
  listBoard,
  listTasks,
  createTask,
  createBoard,
  softDeleteBoard,
  updateBoard,
} from '../controllers/boards.controller.js';

export const boardRouter = Router();
// api/v1/boards

boardRouter.get('/', asyncHandler(listBoards));
boardRouter.get('/:boardId', asyncHandler(listBoard));

boardRouter.get('/:boardId/tasks', asyncHandler(listTasks));

boardRouter.post('/:boardId/tasks', asyncHandler(createTask)); // boards/:id/createTask
boardRouter.post('/', asyncHandler(createBoard));

boardRouter.delete('/:boardId', asyncHandler(softDeleteBoard));

boardRouter.patch('/:boardId', asyncHandler(updateBoard));
