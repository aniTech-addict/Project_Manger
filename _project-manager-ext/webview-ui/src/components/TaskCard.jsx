import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div key={task.id} className="task-card">
            <div className="task-title">{task.title}</div>
            <div className="task-meta">
                {task.tags && task.tags.length > 0 ? (
                    task.tags.map((t, idx) => (
                        <span key={idx} className="task-tag">{t}</span>
                    ))
                ) : (
                    <span className="task-tag">{task.tag}</span>
                )}
                <span className="task-id">#{task.id}</span>
            </div>
        </div>
    );
};

export default TaskCard;
