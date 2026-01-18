import { Board } from '../db/models/board.model.js';
import ApiError from '../helpers/ApiError.helper.js';

export const createBoardService = async (board) => {
  const createdBoard = new Board(board);
  return await createdBoard.save();
};

export const listBoard = async (boardId) => {
  const foundBoard = await Board.findById(boardId);
  if (!foundBoard) {
    return new ApiError(403, 'Board Not Found');
  }
  return foundBoard;
};
