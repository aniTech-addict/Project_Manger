import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "../ui/icons";

export const TaskTimeline = () => {
    return (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">

            {/* Comment Item */}
            <div className="relative flex group">
                <div className="absolute top-0 left-0 mt-1">
                    <Avatar className="h-10 w-10 border-2 border-white ring-1 ring-gray-100">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                </div>
                <div className="ml-16 w-full">
                    <div className="bg-white border md:rounded-lg overflow-hidden border-gray-200 shadow-sm">
                        <div className="bg-gray-50/50 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-900">James Smith</span>
                                <span className="text-xs text-gray-500">commented 2 hours ago</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">CONTRIBUTOR</span>
                                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontalIcon className="h-4 w-4" /></button>
                            </div>
                        </div>
                        <div className="p-4 text-sm text-gray-800">
                            Working on the redirect URL. Need to verify the development environment secrets before pushing the final PR. I've already tested the Google strategy locally and it works as expected.
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Change Item */}
            <div className="relative flex items-center mb-6">
                <div className="relative z-10 flex items-center justify-center h-10 w-10 rounded-full bg-white border border-gray-200 shadow-sm ml-0.5">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
                <div className="ml-6 py-2">
                    <span className="text-sm font-semibold text-gray-900 mr-2">Sarah Chen</span>
                    <span className="text-sm text-gray-500">changed status from</span>
                    <span className="mx-1.5 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">TO DO</span>
                    <span className="text-sm text-gray-500">to</span>
                    <span className="mx-1.5 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">IN PROGRESS</span>
                    <span className="text-xs text-gray-400 ml-1">• 3h ago</span>
                </div>
            </div>

            {/* Input Area */}
            <div className="relative flex group">
                <div className="absolute top-0 left-0 mt-1">
                    <Avatar className="h-10 w-10 border-2 border-white ring-1 ring-gray-100">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                </div>
                <div className="ml-16 w-full">
                    <div className="bg-white border rounded-lg border-gray-200 shadow-sm p-2">
                        <div className="border-b border-gray-100 pb-2 mb-2 flex space-x-4">
                            <button className="px-3 py-1 text-sm font-medium text-gray-900 border-b-2 border-black -mb-[9px]">Write</button>
                            <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">Preview</button>
                        </div>
                        <textarea
                            rows={4}
                            className="w-full p-2 text-sm text-gray-800 border-0 focus:ring-0 resize-none outline-none"
                            placeholder="Leave a comment"
                        ></textarea>
                        <div className="flex justify-end pt-2 border-t border-gray-100 space-x-2">
                            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">Close task</Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Comment</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
