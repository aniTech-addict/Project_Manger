const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class SidebarProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    resolveWebviewView(webviewView, context, token) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'build')
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.command) {
                case 'createProject':
                    vscode.window.showInformationMessage(`Creating Project: ${data.data.projectName}`);
                    break;
                case 'editProject':
                    vscode.window.showInformationMessage(`Editing Project: ${data.data.projectName}`);
                    break;
            }
        });
    }

    _getHtmlForWebview(webview) {
        // Use the build output from the React app
        const buildPath = vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'build');
        const indexHtmlPath = path.join(buildPath.fsPath, 'index.html');

        try {
            let html = fs.readFileSync(indexHtmlPath, 'utf-8');

            // URIs for assets
            const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(buildPath, 'assets', 'index.js'));
            const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(buildPath, 'assets', 'index.css'));

            // Replace relative paths with Webview URIs
            html = html.replace('./assets/index.js', scriptUri.toString());
            html = html.replace('./assets/index.css', styleUri.toString());

            // Optional: Inject CSP
            // <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
            // For now, allow scripts to run.

            return html;
        } catch (error) {
            console.error('Error loading webview html:', error);
            return `<!DOCTYPE html><html><body>Error loading sidebar: ${error.message}</body></html>`;
        }
    }
}

module.exports = SidebarProvider;
