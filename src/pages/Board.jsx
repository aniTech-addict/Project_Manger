import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    DndContext,
    closestCorners,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusIcon, MoreHorizontalIcon } from "../components/ui/icons";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { TaskCard, SortableTaskCard } from "../components/board/TaskCard";
import { BoardColumn } from "../components/board/BoardColumn";
import { BoardHeader } from "../components/board/BoardHeader";
import { useKanbanBoard } from "../hooks/useKanbanBoard";
import { useBoard, useBoardTasks } from "../hooks/useBoards";

const Board = () => {
    const { id } = useParams();
    const { data: board, isLoading: boardLoading } = useBoard(id);
    const { data: tasks = [], isLoading: tasksLoading } = useBoardTasks(id);

    const {
        columns,
        activeId,
        sensors,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    } = useKanbanBoard(tasks);

    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

    if (boardLoading || tasksLoading) return <div className="p-8 text-center text-gray-500">Loading board...</div>;

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const getActiveCard = () => {
        if (!activeId) return null;
        return columns.find(col => col.cards.find(c => c.id === activeId))
            ?.cards.find(c => c.id === activeId);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <BoardHeader
                title={board?.title}
                description={board?.description}
                onNewTaskClick={() => setIsCreateTaskModalOpen(true)}
            />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex-1 overflow-x-auto overflow-y-hidden">
                    <div className="flex h-full p-6 space-x-6 min-w-[1000px]">
                        {columns.map((col) => (
                            <div
                                key={col.id}
                                className="flex-shrink-0 w-80 flex flex-col h-full"
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`text-xs font-bold uppercase tracking-wider ${col.id === "bugs" ? "text-red-600" : "text-gray-500"
                                                }`}
                                        >
                                            {col.title}
                                        </span>
                                        <span
                                            className={`flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${col.id === "bugs"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {col.cards.length}
                                        </span>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => setIsCreateTaskModalOpen(true)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                        </button>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontalIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Cards Area */}
                                <SortableContext
                                    id={col.id}
                                    items={col.cards.map((c) => c.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <BoardColumn id={col.id}>
                                        {col.cards.map((card) => (
                                            <SortableTaskCard key={card.id} card={card} />
                                        ))}
                                        <button
                                            onClick={() => setIsCreateTaskModalOpen(true)}
                                            className="w-full py-2 flex items-center justify-center text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors border border-transparent hover:border-gray-200"
                                        >
                                            <PlusIcon className="w-4 h-4 mr-2" />
                                            Add item
                                        </button>
                                    </BoardColumn>
                                </SortableContext>
                            </div>
                        ))}
                    </div>
                </div>
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? (
                        <TaskCard card={getActiveCard()} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <CreateTaskModal
                isOpen={isCreateTaskModalOpen}
                onClose={() => setIsCreateTaskModalOpen(false)}
                boardId={id}
            />
        </div>
    );
};

export default Board;
