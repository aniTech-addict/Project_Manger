import React from "react";

export const TaskDescription = () => {
    return (
        <div className="bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Description</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
            </div>
            <div className="p-6 text-sm text-gray-800 leading-relaxed font-normal">
                <p className="mb-4">User needs to be able to login via GitHub and Google to access the primary dashboard. This implementation should handle the redirect flow and state validation to prevent CSRF.</p>
                <p className="font-bold mb-2 text-gray-900">KEY REQUIREMENTS:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Register application on GitHub Developer portal</li>
                    <li>Configure Passport.js strategies</li>
                    <li>Implement callback routes</li>
                    <li>Secure session management with Redis</li>
                </ul>
            </div>
        </div>
    );
};
