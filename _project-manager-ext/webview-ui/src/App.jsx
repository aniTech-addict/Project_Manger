import { useState } from 'react'
import './App.css'

function App() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isEditMode ? 'editProject' : 'createProject';
        // Send message to VS Code extension
        if (window.acquireVsCodeApi) {
            const vscode = window.acquireVsCodeApi();
            vscode.postMessage({
                command: action,
                data: { projectName, description }
            });
        } else {
            console.log(`Action: ${action}`, { projectName, description });
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h2 className="title">{isEditMode ? 'Edit Project' : 'New Project'}</h2>
                <div className="toggle-wrapper" title="Toggle Mode">
                    <input
                        type="checkbox"
                        id="mode-switch"
                        className="toggle-checkbox"
                        checked={isEditMode}
                        onChange={(e) => setIsEditMode(e.target.checked)}
                    />
                    <label htmlFor="mode-switch" className="toggle-label">
                        <span className="toggle-inner" />
                        <span className="toggle-switch" />
                    </label>
                </div>
            </div>

            <p className="subtitle">
                {isEditMode
                    ? "Update your project details below."
                    : "Kickstart your new idea by filling out the details."}
            </p>

            <form onSubmit={handleSubmit} className="project-form">
                <div className="form-group">
                    <label htmlFor="projectName">Project Name</label>
                    <div className="input-wrapper">
                        <input
                            id="projectName"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="e.g. Supernova App"
                            required
                            autoComplete="off"
                        />
                        <div className="input-highlight"></div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className="input-wrapper">
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What is this project about?"
                            rows={4}
                            required
                        />
                        <div className="input-highlight"></div>
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    <span className="btn-text">{isEditMode ? 'Save Changes' : 'Create Project'}</span>
                    <div className="btn-glow"></div>
                </button>
            </form>
        </div>
    )
}

export default App
