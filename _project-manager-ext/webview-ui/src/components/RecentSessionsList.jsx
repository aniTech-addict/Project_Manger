import React, { useState } from 'react';
import { Icons } from '../data/icons';

const RecentSessionsList = ({ sessions, onDelete, onExpand, isExpanded }) => {
    const visibleSessions = isExpanded ? sessions : sessions.slice(0, 2);

    return (
        <div className="recent-sessions-container">
            <div className="recent-header" onClick={onExpand}>
                <span>RECENT SESSIONS</span>
                <div className="header-icon">
                    <Icons.RecentList />
                </div>
            </div>

            <div className={`recent-list ${isExpanded ? 'expanded' : ''}`}>
                {visibleSessions.map((session) => (
                    <div key={session.id} className="session-item">
                        <div className="session-left">
                            <div className="session-title-row">
                                <span className="status-dot"></span>
                                <span className="session-title">{session.title}</span>
                            </div>
                            <div className="session-sub">{session.status}</div>
                        </div>
                        <div className="session-right">
                            <div className="session-icon" onClick={(e) => onDelete(e, session.id)} title="Delete Session">
                                <Icons.Trash />
                            </div>
                            <div className="session-meta">{session.meta}</div>
                        </div>
                    </div>
                ))}
                {sessions.length === 0 && <div style={{ padding: '1rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>No recent sessions</div>}
            </div>

            {sessions.length > 2 && (
                <div className="show-more" onClick={onExpand}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </div>
            )}
        </div>
    );
};

export default RecentSessionsList;
