import React, { useState } from 'react';
import '../styles/AddTaskView.css';
import BackButton from '../components/BackButton';

const AddTaskView = ({ onAddTask, onBack }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('todo');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            description,
            tags: tags.trim() ? tags.split(' ').filter(t => t.trim()) : ['General'],
            tag: tags || 'General',
            status
        };

        onAddTask(newTask);
    };

    return (
        <div className="add-task-container">
            <BackButton onClick={onBack} />

            <div className="add-task-header">
                <h2 className="add-task-title">Add New Task</h2>
                <p className="add-task-subtitle">Define the details of your new task</p>
            </div>

            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Task Title</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Update Documentation"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Describe the task..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Tags (Space separated)</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Design Backend API"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-task-btn">Create Task</button>
            </form>
        </div>
    );
};

export default AddTaskView;
