import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const TaskSidebar = () => {
    return (
        <div className="space-y-8">
            {/* Status Widget */}
            <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</h4>
                <button className="w-full flex items-center justify-between px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">
                    <span>IN PROGRESS</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Property List */}
            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Priority</h4>
                    <div className="flex items-center text-sm font-medium text-red-600">
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        High
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Assignee</h4>
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">Sarah Chen</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Labels</h4>
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Security
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Auth
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h4 className="text-xs font-medium text-gray-500 mb-3">Linked PRs</h4>
                <div className="flex items-center text-sm text-gray-600 hover:text-blue-600 hover:underline cursor-pointer transition-colors">
                    <svg className="mr-2 h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    #812 - OAuth flow
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4 text-xs text-gray-500">
                <div className="flex justify-between">
                    <span>Reporter</span>
                    <div className="flex items-center text-gray-900">
                        <Avatar className="h-4 w-4 mr-1.5">
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                        Alex Rivera
                    </div>
                </div>
                <div className="flex justify-between">
                    <span>Created</span>
                    <span className="text-gray-900">Oct 24, 2023</span>
                </div>
                <div className="flex justify-between">
                    <span>Updated</span>
                    <span className="text-gray-900">2 hours ago</span>
                </div>
            </div>

            <div className="pt-12">
                <button className="flex items-center text-xs text-gray-500 hover:text-red-600 transition-colors">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Archive Task
                </button>
            </div>
        </div>
    );
};
