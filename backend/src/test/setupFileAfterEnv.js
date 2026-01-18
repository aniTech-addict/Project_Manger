import mongoose from 'mongoose';
import { beforeAll, afterAll } from '@jest/globals';
import { initDB } from '../db/initDB.js';

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});
