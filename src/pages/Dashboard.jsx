import React from "react";
import { Button } from "../components/ui/button";
import { PlusIcon, GridIcon } from "../components/ui/icons";
import { CreateBoardModal } from "../components/CreateBoardModal";
import { useBoards } from "../hooks/useBoards";
import { ProjectCard } from "../components/dashboard/ProjectCard";
import { NewProjectCard } from "../components/dashboard/NewProjectCard";

// import { projects } from "../data/dashboard-data"; // Remove mock data import if not needed, or keep for reference but don't use

const Dashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const { data: boards = [], isLoading, error } = useBoards();

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading projects...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading projects: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Projects</h1>
                    <p className="text-gray-500 mt-1">Manage and track your organization's core initiatives.</p>
                </div>

                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="hidden md:flex">
                        Status: All
                        {/* Chevron Down */}
                        <svg className="ml-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </Button>
                    <Button variant="outline" className="hidden md:flex">
                        Sort: Recent
                        {/* Sort Icon */}
                        <svg className="ml-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                    </Button>

                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        New project
                    </Button>

                    <div className="flex bg-white rounded-md border border-gray-200 p-0.5 ml-2">
                        <button className="p-1.5 rounded bg-gray-100 text-gray-900 shadow-sm">
                            <GridIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                            {/* List Icon */}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {boards.map((board) => (
                    <ProjectCard
                        key={board._id}
                        project={{
                            id: board._id,
                            title: board.title,
                            description: board.description,
                            tags: board.tags.map(tag => ({ label: tag, variant: 'secondary' })),
                            users: [], // Mock or fetch users if available
                            updated: new Date(board.updatedAt).toLocaleDateString(),
                            iconColor: "bg-blue-100 text-blue-600"
                        }}
                    />
                ))}

                {/* Create New Project Card */}
                <NewProjectCard onClick={() => setIsCreateModalOpen(true)} />
            </div>

            <CreateBoardModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    );
};

export default Dashboard;
