import React from 'react';
import { Button } from '../components/ui/button';
import { PlusIcon, GridIcon } from '../components/ui/icons';
import { CreateBoardModal } from '../components/CreateBoardModal';
import { useBoards, useDeleteBoard } from '../hooks/useBoards';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { ProjectListItem } from '../components/dashboard/ProjectListItem';
import { NewProjectCard } from '../components/dashboard/NewProjectCard';

// import { projects } from "../data/dashboard-data"; // Remove mock data import if not needed, or keep for reference but don't use

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState(null);
  const [viewMode, setViewMode] = React.useState('grid'); // 'grid' or 'list'
  const { data: boards = [], isLoading, error } = useBoards();
  const { mutate: deleteBoard } = useDeleteBoard();

  const handleCreateOpen = () => {
    setSelectedBoard(null);
    setIsCreateModalOpen(true);
  };

  const handleEditStart = (board) => {
    setSelectedBoard({
      id: board._id,
      title: board.title,
      description: board.description,
      tags: board.tags,
      // add other fields if necessary
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      deleteBoard(boardId);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Projects
        </h3>
        <p className="text-red-500">{error.message}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-slideDown">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
            Projects
          </h1>
          <p className="text-gray-600 text-base">
            Manage and track your organization's core initiatives.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" className="hidden md:flex">
            Status: All
            {/* Chevron Down */}
            <svg
              className="ml-2 h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
          <Button variant="outline" className="hidden md:flex">
            Sort: Recent
            {/* Sort Icon */}
            <svg
              className="ml-2 h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          </Button>

          <Button
            onClick={handleCreateOpen}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New project
          </Button>

          <div className="flex bg-white rounded-md border border-gray-200 p-0.5 ml-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded shadow-sm ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 bg-transparent'}`}
            >
              <GridIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded shadow-sm ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 bg-transparent'}`}
            >
              {/* List Icon */}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slideUp">
          {boards.map((board, index) => (
            <div
              key={board._id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-slideUp"
            >
              <ProjectCard
                project={{
                  id: board._id,
                  title: board.title,
                  description: board.description,
                  tags: board.tags.map((tag) => ({
                    label: tag,
                    variant: 'secondary',
                  })),
                  users: [],
                  updated: new Date(board.updatedAt).toLocaleDateString(),
                  iconColor: 'bg-blue-100 text-blue-600',
                }}
                onEdit={() => handleEditStart(board)}
                onDelete={() => handleDelete(board._id)}
              />
            </div>
          ))}

          <NewProjectCard onClick={handleCreateOpen} />
        </div>
      ) : (
        <div className="space-y-3 animate-slideUp">
          {boards.map((board, index) => (
            <div
              key={board._id}
              style={{ animationDelay: `${index * 30}ms` }}
              className="animate-slideUp"
            >
              <ProjectListItem
                project={{
                  id: board._id,
                  title: board.title,
                  description: board.description,
                  tags: board.tags.map((tag) => ({
                    label: tag,
                    variant: 'secondary',
                  })),
                  users: [],
                  updated: new Date(board.updatedAt).toLocaleDateString(),
                  iconColor: 'bg-blue-100 text-blue-600',
                }}
                onEdit={() => handleEditStart(board)}
                onDelete={() => handleDelete(board._id)}
              />
            </div>
          ))}
          {/* List view empty state or add button could go here, for now relying on top button */}
        </div>
      )}

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        boardToEdit={selectedBoard}
      />
    </div>
  );
};

export default Dashboard;
