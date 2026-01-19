import mongoose from 'mongoose';
import { describe, test, expect } from '@jest/globals';

import { Board } from '../../db/models/board.model';
import { createBoardService, listBoardsService } from '../../services/boards.service.js';
import { softDeleteBoard } from '../../controllers/boards.controller.js';
import ApiError from '../../helpers/ApiError.helper.js';

describe('Creating Board', () => {
  (test('with all parameters should pass', async () => {
    const board = {
      title: 'Auth',
      description: 'Manage auth related functionalities',
      tags: ['auth', 'learning'],
    };

    const createdBoard = await createBoardService(board);

    const foundBoard = await Board.findById(createdBoard._id);
    expect(foundBoard).toEqual(expect.objectContaining(board));
    expect(foundBoard.createdAt).toBeInstanceOf(Date);
    expect(foundBoard.updatedAt).toBeInstanceOf(Date);
  }),
    test('creating board without title should fail', async () => {
      const board = {
        description: 'Manage auth related functionalities',
        tags: ['auth', 'learning'],
      };

      try {
        await Board(board);
      } catch (error) {
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.message).toContain('Title not defined');
      }
    }));
});

describe('Deleting board', ()=>{
  test('No board Id given, delete should fail', async()=>{
    const mockReq = { params: { boardId: "" } };
    const mockRes = {};
    await expect(softDeleteBoard(mockReq, mockRes)).rejects.toThrow(ApiError);
  })
})

describe( 'List Boards', ()=> {
  test('List all boards', async()=>{
    const result = await listBoardsService();
    const expectedResult = await Board.find()
    expect(result).toEqual(expectedResult)
  })
})