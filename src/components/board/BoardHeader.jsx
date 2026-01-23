import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ShareIcon, PlusIcon } from "../ui/icons";

export const BoardHeader = ({ title, description, onNewTaskClick }) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-gray-200">
            <div>
                <div className="flex items-center text-sm text-gray-500 space-x-2 mb-1">
                    <span>Projects</span>
                    <span>/</span>
                    <span className="font-medium text-gray-900">{title || 'Board'}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {description || title || 'Project Board'}
                </h1>
            </div>

            <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <div className="flex -space-x-2 mr-2">
                    <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-xs font-medium text-gray-500 border-2 border-white">
                        +5
                    </span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
                <Button variant="outline" size="sm" className="hidden lg:flex">
                    <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                    Filters
                </Button>
                <Button variant="outline" size="sm">
                    <ShareIcon className="mr-2 h-4 w-4" />
                    Share
                </Button>
                <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={onNewTaskClick}
                >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Task
                </Button>
            </div>
        </div>
    );
};
