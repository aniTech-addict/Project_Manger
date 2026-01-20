import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { MoreHorizontalIcon, ShareIcon, PlusIcon } from "../components/ui/icons";
import { Link } from "react-router-dom";

const TaskDetail = () => {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-gray-900 transition-colors">Engineering</Link>
                    <span className="mx-2">/</span>
                    <Link to="/projects/1" className="hover:text-gray-900 transition-colors">Project Alpha</Link>
                    <span className="mx-2">/</span>
                    <span className="font-semibold text-gray-900">PROJ-42</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <ShareIcon className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title Section */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                <svg className="mr-1.5 h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                </svg>
                                Open
                            </div>
                            <span className="text-gray-500 text-sm">Sarah Chen opened this task 2 days ago • 4 comments</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Implement OAuth2.0 Authentication Flow</h1>
                    </div>

                    {/* Description Card */}
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

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <a href="#" className="border-orange-500 text-orange-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                Conversation
                            </a>
                            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                Checks
                            </a>
                        </nav>
                    </div>

                    {/* Timeline */}
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
                </div>

                {/* Right Sidebar */}
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
            </div>
        </div>
    );
};

export default TaskDetail;
