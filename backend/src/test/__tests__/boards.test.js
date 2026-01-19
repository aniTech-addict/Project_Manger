import mongoose from 'mongoose';
import { describe, test, expect, beforeEach } from '@jest/globals';

import { Board } from '../../db/models/board.model';
import { Task } from '../../db/models/tasks.model';
import { createBoardService, listBoardsService, hardDeleteBoardService, updateBoardService } from '../../services/boards.service.js';
import { listTasksService, createTaskService } from '../../services/tasks.service.js';
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

describe('Hard Delete Board', () => {
  test('should delete an existing board', async () => {
    const board = await createBoardService({
      title: 'Test Board for Deletion',
      description: 'To be deleted',
      tags: ['test']
    });
    const deleteResult = await hardDeleteBoardService(board._id);
    expect(deleteResult).toBeDefined();
    const foundBoard = await Board.findById(board._id);
    expect(foundBoard).toBeNull();
  });

  test('should throw error for non-existing board', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await expect(hardDeleteBoardService(fakeId)).rejects.toThrow(ApiError);
  });
});

describe('Update Board', () => {
  test('should update an existing board', async () => {
    const board = await createBoardService({
      title: 'Original Title',
      description: 'Original Description',
      tags: ['original']
    });
    const updateData = {
      title: 'Updated Title',
      description: 'Updated Description',
      tags: ['updated']
    };
    const updatedBoard = await updateBoardService(board._id, updateData);
    expect(updatedBoard.title).toBe('Updated Title');
    expect(updatedBoard.description).toBe('Updated Description');
    expect(updatedBoard.tags).toEqual(['updated']);
  });

  test('should throw error for non-existing board', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const updateData = { title: 'New Title' };
    await expect(updateBoardService(fakeId, updateData)).rejects.toThrow(ApiError);
  });
});

describe('Create Task', () => {
  test('should create a task with valid data', async () => {
    const board = await createBoardService({
      title: 'Board for Task',
      description: 'Board description',
      tags: ['board']
    });
    const taskData = {
      title: 'Test Task',
      description: 'Task description',
      status: 'created',
      tags: ['task']
    };
    const createdTask = await createTaskService(taskData, board._id);
    expect(createdTask.title).toBe('Test Task');
    expect(createdTask.boardId.toString()).toBe(board._id.toString());
    expect(createdTask.status).toBe('created');
  });

  test('should throw error for missing required fields', async () => {
    const board = await createBoardService({
      title: 'Board for Task',
      description: 'Board description',
      tags: ['board']
    });
    const invalidTaskData = {
      description: 'Missing title',
      status: 'created',
      tags: ['task']
    };
    await expect(createTaskService(invalidTaskData, board._id)).rejects.toThrow();
  });
});

describe('List Tasks', () => {
  test('should list tasks for a board', async () => {
    const board = await createBoardService({
      title: 'Board for Tasks',
      description: 'Board description',
      tags: ['board']
    });
    const taskData = {
      title: 'Task 1',
      description: 'Description 1',
      status: 'created',
      tags: ['tag1']
    };
    await createTaskService(taskData, board._id);
    const tasks = await listTasksService(board._id);
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[0].boardId.toString()).toBe(board._id.toString());
  });

  test('should return empty array for board with no tasks', async () => {
    const board = await createBoardService({
      title: 'Empty Board',
      description: 'No tasks',
      tags: ['empty']
    });
    const tasks = await listTasksService(board._id);
    expect(tasks).toEqual([]);
  });
});