
import mongoose from 'mongoose';
import { Board } from './models/board.model.js';
import { Task } from './models/tasks.model.js';
import { config } from '../../config/.env.config.js';

const seedData = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to DB for seeding');

        // Clear existing data
        console.log('Clearing existing data...');
        await Task.deleteMany({});
        await Board.deleteMany({});
        console.log('Cleared existing Boards and Tasks');

        // Create Boards
        console.log('Seeding Boards...');
        const boards = await Board.insertMany([
            {
                title: 'Website Redesign',
                description: 'Redesigning the corporate website for better UX',
                tags: ['design', 'frontend'],
                isDeleted: false
            },
            {
                title: 'Mobile App Development',
                description: 'Building the new mobile app for iOS and Android',
                tags: ['mobile', 'app', 'dev'],
                isDeleted: false
            },
            {
                title: 'Backend Refactoring',
                description: 'Optimizing and refactoring backend API services',
                tags: ['backend', 'api', 'optimization'],
                isDeleted: false
            }
        ]);

        console.log(`Created ${boards.length} boards`);

        // Create Tasks
        console.log('Seeding Tasks...');
        const tasks = [
            {
                boardId: boards[0]._id,
                title: 'Design Home Page',
                description: 'Create high-fidelity mockups for the home page',
                status: 'done',
                tags: ['ui', 'figma'],
                parent_task: null,
                isDeleted: false
            },
            {
                boardId: boards[0]._id,
                title: 'Implement Dark Mode',
                description: 'Add support for dark mode using CSS variables',
                status: 'in progress',
                tags: ['css', 'frontend'],
                parent_task: null,
                isDeleted: false
            },
            {
                boardId: boards[0]._id,
                title: 'Fix Navigation Bug',
                description: 'Navigation menu does not close on mobile click',
                status: 'bugs',
                tags: ['bug', 'responsive'],
                parent_task: null,
                isDeleted: false
            },
            {
                boardId: boards[1]._id,
                title: 'Setup React Native',
                description: 'Initialize the React Native project structure',
                status: 'done',
                tags: ['setup', 'react-native'],
                parent_task: null,
                isDeleted: false
            },
            {
                boardId: boards[1]._id,
                title: 'User Authentication',
                description: 'Implement login and registration screens',
                status: 'created',
                tags: ['auth', 'security'],
                parent_task: null,
                isDeleted: false
            },
            {
                boardId: boards[2]._id,
                title: 'Optimize Database Queries',
                description: 'Analyze slow queries and add indexes',
                status: 'testing',
                tags: ['db', 'performance'],
                parent_task: null,
                isDeleted: false
            }
        ];

        await Task.insertMany(tasks);
        console.log(`Created ${tasks.length} tasks`);

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
