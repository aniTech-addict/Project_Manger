import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TaskHeader } from "../components/task/TaskHeader";
import { TaskTitleSection } from "../components/task/TaskTitleSection";
import { TaskDescription } from "../components/task/TaskDescription";
import { TaskTimeline } from "../components/task/TaskTimeline";
import { TaskSidebar } from "../components/task/TaskSidebar";

const TaskDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const card = location.state?.card;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header / Breadcrumb */}
            <TaskHeader id={id} card={card} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title Section */}
                    <TaskTitleSection card={card} />

                    {/* Description Card */}
                    <TaskDescription />

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
                    <TaskTimeline />
                </div>

                {/* Right Sidebar */}
                <TaskSidebar />
            </div>
        </div>
    );
};

export default TaskDetail;
