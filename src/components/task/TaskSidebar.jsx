import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const TaskSidebar = ({ card }) => {
    return (
        <div className="space-y-8">
            {/* Status Widget */}
            <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</h4>
                <button className="w-full flex items-center justify-between px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors uppercase">
                    <span>{card?.status || "Unknown"}</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Property List */}
            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Priority</h4>
                    <div className="flex items-center text-sm font-medium text-gray-700">
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {card?.priority || "Medium"}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Assignee</h4>
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback>UA</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">Unassigned</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Labels</h4>
                    <div className="flex flex-wrap gap-2">
                        {card?.tags && card.tags.length > 0 ? (
                            card.tags.map((tag, i) => (
                                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-400">No labels</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4 text-xs text-gray-500">
                <div className="flex justify-between">
                    <span>Created</span>
                    <span className="text-gray-900">{card?.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Updated</span>
                    <span className="text-gray-900">{card?.updatedAt ? new Date(card.updatedAt).toLocaleDateString() : 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};
