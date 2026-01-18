import { Router } from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { listBoards, listBoard, listTasks, createTask, createBoard, softDeleteBoard, updateBoard } from '../controllers/boards.controller.js'

export const boardRouter = Router()



boardRouter.get('/', asyncHandler(listBoards) )  
boardRouter.get('/:boardId', asyncHandler(listBoard) )

boardRouter.get('/:taskId', asyncHandler(listTasks) )

boardRouter.post('/taskId', asyncHandler(createTask) ) 
boardRouter.post('/', asyncHandler(createBoard))

boardRouter.delete('/:boardId', asyncHandler(softDeleteBoard) )

boardRouter.patch('/:boardId', asyncHandler(updateBoard) )
