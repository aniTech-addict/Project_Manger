import React from "react";

export const TaskTitleSection = ({ card }) => {
    return (
        <div>
            <div className="flex items-center space-x-3 mb-4">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 capitalize">
                    <svg className="mr-1.5 h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                    </svg>
                    {card?.status || "Open"}
                </div>
                <span className="text-gray-500 text-sm">
                    Created on {card?.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'Unknown date'}
                </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{card?.title}</h1>
        </div>
    );
};
