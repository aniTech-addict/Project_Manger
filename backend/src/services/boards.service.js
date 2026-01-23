import { Board } from '../db/models/board.model.js';
import ApiError from '../helpers/ApiError.helper.js';

export const createBoardService = async (board) => {
  const createdBoard = new Board(board);
  return await createdBoard.save();
};

export const listBoardService = async (boardId) => {
  const foundBoard = await Board.findById(boardId);
  if (!foundBoard || foundBoard.isDeleted) {
    throw new ApiError(404, 'Board Not Found');
  }
  return foundBoard;
};

export const listBoardsService = async () => {
  const boards = await Board.find({ isDeleted: false });
  if (!boards) {
    throw new ApiError(404, 'No Boards Found');
  }
  return boards;
};

export const softDeleteBoardService = async (boardId) => {
  const updatedBoard = await Board.findByIdAndUpdate(boardId, { isDeleted: true }, { new: true });
  if (!updatedBoard) {
    throw new ApiError(404, 'No Board Found, Delete Unsuccessful');
  }
  return { id: updatedBoard._id, isDeleted: updatedBoard.isDeleted };
};


export const hardDeleteBoardService = async (boardId) => {
  const deleteCount = await Board.findByIdAndDelete(boardId)
  if (!deleteCount) {
    throw new ApiError(404, 'No Board Found, Delete Unsuccessful')
  }
  return deleteCount;
};

export const updateBoardService = async (boardId, updateData) => {
  const updatedBoard = await Board.findByIdAndUpdate(boardId, updateData, { new: true });
  if (!updatedBoard) {
    throw new ApiError(404, 'Board not found');
  }
  return updatedBoard;
};
