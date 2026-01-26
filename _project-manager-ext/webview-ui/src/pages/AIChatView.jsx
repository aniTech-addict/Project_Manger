import React, { useState } from 'react';
import '../styles/AIChatView.css';
import { Icons } from '../data/icons';
import BackButton from '../components/BackButton';
import RecentSessionsList from '../components/RecentSessionsList';
import ChatMessage from '../components/ChatMessage';

const AIChatView = ({ onBack }) => {
    const [query, setQuery] = useState('');
    const [hasAsked, setHasAsked] = useState(false);
    const [messages, setMessages] = useState([]);

    // Recent Sessions State
    const [sessions, setSessions] = useState([
        { id: 1, title: "Casual conversation request", status: "Completed in 22s", meta: "Local • 1 min" },
        { id: 2, title: "Bug fix: Login page", status: "Completed in 5m", meta: "Local • 2h" },
        { id: 3, title: "New Feature: Dashboard", status: "Aborted", meta: "Local • 1d" },
        { id: 4, title: "Refactor: API", status: "Completed in 12s", meta: "Local • 3d" },
        { id: 5, title: "Test implementation", status: "Completed in 1m", meta: "Local • 4d" }
    ]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showRecent, setShowRecent] = useState(true);

    const handleSend = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = { role: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);

        setHasAsked(true);
        setQuery('');

        setTimeout(() => {
            const aiMsg = { role: 'ai', text: "this is the answer of the ai" };
            setMessages(prev => [...prev, aiMsg]);
        }, 600);
    };

    const handleDeleteSession = (e, id) => {
        e.stopPropagation();
        setSessions(prev => prev.filter(s => s.id !== id));
    };

    const toggleRecent = () => {
        setShowRecent(!showRecent);
    };

    const toggleExpand = () => {
        setShowRecent(!showRecent);
    };

    const handleExpandToggle = () => setIsExpanded(!isExpanded);

    return (
        <div className="chat-container">
            <div className="recent-sessions-wrapper">
                <RecentSessionsList
                    sessions={sessions}
                    onDelete={handleDeleteSession}
                    onExpand={handleExpandToggle}
                    isExpanded={isExpanded}
                />
            </div>

            {/* Back Button */}
            <BackButton onClick={onBack} />

            {/* Main Content Area */}
            <div className="chat-content">
                {!hasAsked ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Icons.Sparkle />
                            <div className="sparkle">✦</div>
                        </div>
                        <h2 className="empty-title">Build with Agent</h2>
                        <p className="empty-desc">AI responses may be inaccurate.</p>
                    </div>
                ) : (
                    <div className="messages-area">
                        {messages.map((msg, idx) => (
                            <ChatMessage key={idx} msg={msg} />
                        ))}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form className="input-container simple" onSubmit={handleSend}>
                <input
                    type="text"
                    className="main-input"
                    placeholder="Describe what to build next..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="submit-arrow" disabled={!query.trim()}>
                    <Icons.Send />
                </button>
            </form>
        </div>
    );
};

export default AIChatView;
