import React, { useState } from 'react';
import '../styles/WorkflowRulesView.css';
import BackButton from '../components/BackButton';

const WorkflowRulesView = ({ onBack }) => {
    // Workflow State
    const [wfTitle, setWfTitle] = useState('');
    const [wfDesc, setWfDesc] = useState('');

    // Rules State
    const [ruleTitle, setRuleTitle] = useState('');
    const [ruleDesc, setRuleDesc] = useState('');

    const countChars = (str) => {
        return str.length;
    };

    const handleDescChange = (val, setter) => {
        if (val.length <= 600) {
            setter(val);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onBack();
    };

    return (
        <div className="wr-container">
            <BackButton onClick={onBack} />

            <div className="wr-header">
                <h2 className="wr-title">Workflow & Rules</h2>
                <p className="wr-subtitle">Define standard procedures and constraints</p>
            </div>

            <form className="wr-form" onSubmit={handleSubmit}>

                {/* Workflow Section */}
                <div className="wr-section">
                    <div className="section-header">
                        <span className="section-title">Workflow</span>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Code Review Process"
                            value={wfTitle}
                            onChange={(e) => setWfTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Describe the workflow steps..."
                            value={wfDesc}
                            onChange={(e) => handleDescChange(e.target.value, setWfDesc)}
                            required
                        />
                        <span className={`word-count ${countChars(wfDesc) >= 600 ? 'limit-reached' : ''}`}>
                            {countChars(wfDesc)}/600 characters
                        </span>
                    </div>
                </div>

                {/* Rules Section */}
                <div className="wr-section">
                    <div className="section-header">
                        <span className="section-title rules">Rules</span>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. No Direct Commits to Main"
                            value={ruleTitle}
                            onChange={(e) => setRuleTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Describe the rule..."
                            value={ruleDesc}
                            onChange={(e) => handleDescChange(e.target.value, setRuleDesc)}
                            required
                        />
                        <span className={`word-count ${countChars(ruleDesc) >= 600 ? 'limit-reached' : ''}`}>
                            {countChars(ruleDesc)}/600 characters
                        </span>
                    </div>
                </div>

                <button type="submit" className="submit-wr-btn">Save & Return</button>
            </form>
        </div>
    );
};

export default WorkflowRulesView;
