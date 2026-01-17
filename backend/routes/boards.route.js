import { Router } from 'express'

export const boardRouter = Router()

// list -> collection
// get -> single resource

boardRouter.get('/boards',listBoards )

boardRouter.get('/boards/:id', getBoard )

boardRouter.get('/boards', createBoard )

boardRouter.get('/boards/:id', deleteBoard )

boardRouter.get('/boards/:id', updateBoard )
