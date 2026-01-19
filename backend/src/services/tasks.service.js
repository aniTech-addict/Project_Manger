import {Task } from '../db/models/tasks.model'

export const listTasksService = async (boardId) => {
    const result = await Task.find({boardId})
    return result
}

export const createTaskService = async (taskData, boardId) => {
    const newTask = new Task({ ...taskData, boardId });
    return await newTask.save();
}