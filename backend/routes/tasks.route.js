import {Router} from 'express'

export const tasksRouter = Router()


tasksRouter.get('/tasks',listTasks )

tasksRouter.get('/tasks/:id', getTask )

tasksRouter.post('/tasks', createTask )

tasksRouter.delete('/tasks/:id', deleteTask )

tasksRouter.patch('/tasks/:id', updateTask )
