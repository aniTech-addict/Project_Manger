export const initialColumns = [
    {
        id: 'todo',
        title: 'To Do',
        className: 'col-todo',
        tasks: [
            { id: 1, title: 'Design Landing Page', tag: 'Design' },
            { id: 2, title: 'Setup Repo', tag: 'Dev' }
        ]
    },
    {
        id: 'inprogress',
        title: 'In Progress',
        className: 'col-progress',
        tasks: [
            { id: 3, title: 'Auth Implementation', tag: 'Backend' }
        ]
    },
    {
        id: 'done',
        title: 'Done',
        className: 'col-done',
        tasks: [
            { id: 4, title: 'Requirements Gathering', tag: 'Product' }
        ]
    }
];
