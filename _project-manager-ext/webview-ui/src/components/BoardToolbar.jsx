import React from 'react';
import { Icons } from '../data/icons';

const BoardToolbar = ({ onViewChange }) => {
    return (
        <div className="board-toolbar">
            <div className="toolbar-left">
                <button className="icon-btn active" title="Recent Tasks">
                    <Icons.Clock />
                </button>

                <button className="icon-btn" title="Add Task" onClick={() => onViewChange('add-task')}>
                    <Icons.Plus />
                </button>
                <button className="icon-btn" title="Workflow and Rules" onClick={() => onViewChange('workflow-rules')}>
                    <Icons.Workflow />
                </button>
            </div>
            <div className="toolbar-right">
                <button className="icon-btn" title="Chat with your Board" onClick={() => onViewChange('ai-chat')}>
                    <Icons.Bot />
                    <span style={{ marginLeft: '8px', fontSize: '0.85rem' }}>Ask AI</span>
                </button>
            </div>
        </div>
    );
};

export default BoardToolbar;
