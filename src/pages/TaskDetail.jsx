import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TaskHeader } from "../components/task/TaskHeader";
import { TaskTitleSection } from "../components/task/TaskTitleSection";
import { TaskDescription } from "../components/task/TaskDescription";
import { TaskTimeline } from "../components/task/TaskTimeline";
import { TaskSidebar } from "../components/task/TaskSidebar";
import { useTask, useDeleteTask } from "../hooks/useTasks";
import { useBoard } from "../hooks/useBoards";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { useNavigate } from "react-router-dom";

const TaskDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const { data: fetchedTask, isLoading: isLoadingTask, error: taskError } = useTask(id);
    const { data: fetchedBoard, isLoading: isLoadingBoard } = useBoard(fetchedTask?.boardId);
    const { mutate: deleteTask } = useDeleteTask();
    const navigate = useNavigate();

    // Derived state for the UI
    const card = fetchedTask ? {
        id: fetchedTask._id,
        title: fetchedTask.title,
        description: fetchedTask.description,
        status: fetchedTask.status,
        priority: fetchedTask.priority || 'Medium', // Default if not in model yet
        tags: fetchedTask.tags || [],
        boardId: fetchedTask.boardId,
        createdAt: fetchedTask.createdAt,
        updatedAt: fetchedTask.updatedAt
    } : location.state?.card;

    const isLoading = isLoadingTask || (fetchedTask && isLoadingBoard);
    const error = taskError;

    const handleEditStart = () => {
        setIsEditModalOpen(true);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteTask(card.id, {
                onSuccess: () => {
                    navigate(`/projects/${fetchedBoard._id}`);
                }
            });
        }
    };

    if (isLoading && !card) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );
    if (error) return <div className="p-8 text-center text-red-500">Error loading task: {error.message}</div>;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header / Breadcrumb */}
            <TaskHeader
                id={id}
                card={card}
                board={fetchedBoard}
                onEdit={handleEditStart}
                onDelete={handleDelete}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title Section */}
                    <TaskTitleSection card={card} />

                    {/* Description Card */}
                    <TaskDescription description={card?.description} />

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
                <TaskSidebar card={card} onDelete={handleDelete} />
            </div>

            <CreateTaskModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                taskToEdit={card}
                boardId={fetchedTask?.boardId}
            />
        </div>
    );
};

export default TaskDetail;
