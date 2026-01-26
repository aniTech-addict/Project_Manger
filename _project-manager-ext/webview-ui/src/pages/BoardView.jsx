import React from 'react';
import '../styles/BoardView.css';
import BoardToolbar from '../components/BoardToolbar';
import BoardColumn from '../components/BoardColumn';

const BoardView = ({ onViewChange, columns }) => {
    return (
        <div className="board-container">
            <BoardToolbar onViewChange={onViewChange} />

            <div className="board-grid">
                {columns.map(col => (
                    <BoardColumn key={col.id} col={col} />
                ))}
            </div>
        </div>
    );
};

export default BoardView;
