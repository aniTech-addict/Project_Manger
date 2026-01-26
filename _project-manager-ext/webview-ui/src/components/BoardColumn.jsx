import React, { useState } from 'react';
import { Icons } from '../data/icons';
import TaskCard from './TaskCard';

const BoardColumn = ({ col }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggle = (e) => {
        if (e) e.stopPropagation();
        setCollapsed(!collapsed);
    };

    return (
        <div className={`board-column ${col.className} ${collapsed ? 'collapsed' : ''}`} onClick={() => collapsed && toggle()}>
            <div className="column-header" onClick={toggle}>
                <div className="column-header-left">
                    <span className="toggle-icon">
                        {collapsed ? <Icons.ChevronRight /> : <Icons.ChevronDown />}
                    </span>
                    <span className="column-title">
                        {col.title}
                        <span className="task-count">{col.tasks.length}</span>
                    </span>
                </div>
                <div className="column-actions" onClick={(e) => e.stopPropagation()}>
                    <Icons.More />
                </div>
            </div>

            {!collapsed && (
                <div className="task-list">
                    {col.tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    <div style={{ height: '30px' }}></div>
                </div>
            )}
        </div>
    );
};

export default BoardColumn;
