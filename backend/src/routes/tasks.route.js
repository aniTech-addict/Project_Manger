import { Router } from 'express';
import {
  deleteTask,
  listTask,
  updateTask,
} from '../controllers/tasks.controller.js';

export const tasksRouter = Router();
//api/v1/tasks

tasksRouter.get('/:taskId', listTask);

tasksRouter.delete('/:taskId', deleteTask);

//taskRouter.delete('/', deleteTasks)

tasksRouter.patch('/:taskId', updateTask);
