import { Router } from 'express';
import {
  listTask,
  softDeleteTask,
  updateTask,
} from '../controllers/tasks.controller.js';

export const tasksRouter = Router();

tasksRouter.get('/:taskId', listTask);

tasksRouter.delete('/:taskId', softDeleteTask);

tasksRouter.patch('/:taskId', updateTask);
