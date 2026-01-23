import React from "react";

export const TaskDescription = ({ description }) => {
    return (
        <div className="bg-white border rounded-lg border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Description</h3>
            </div>
            <div className="p-6 text-sm text-gray-800 leading-relaxed font-normal whitespace-pre-wrap">
                {description || "No description provided."}
            </div>
        </div>
    );
};
