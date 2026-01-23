import React, { useState } from "react";
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    useDroppable,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
    PlusIcon,
    MoreHorizontalIcon,
    ShareIcon,
} from "../components/ui/icons";
import { Link, useNavigate } from "react-router-dom";

const initialColumns = [
    {
        id: "created",
        title: "CREATED",
        count: 12,
        cards: [
            {
                id: "SAAS-412",
                title: "Refactor authentication middleware for OAuth2.0 flow",
                tag: { label: "Backend", variant: "default" },
                link: "SAAS-390",
            },
            {
                id: "SAAS-425",
                title: "Design system update: New navigation icons",
                tag: { label: "Design", variant: "secondary" },
            },
        ],
    },
    {
        id: "inprogress",
        title: "IN PROGRESS",
        count: 5,
        cards: [
            {
                id: "SAAS-398",
                title: "Implement real-time dashboard analytics",
                tag: { label: "Urgent", variant: "warning" },
                progress: 80,
            },
            {
                id: "SAAS-382",
                title: "Integrate Stripe Subscriptions with core engine",
                tag: { label: "Billing", variant: "success" },
                tag2: { label: "Feature", variant: "default" },
                highlight: true,
            },
            {
                id: "SAAS-401",
                title: "Cloud sync conflict resolution logic",
                tag: { label: "API", variant: "default" },
            },
        ],
    },
    {
        id: "done",
        title: "DONE",
        count: 42,
        cards: [
            {
                id: "SAAS-210",
                title: "Landing page V2 hero section rewrite",
                completed: true,
            },
            {
                id: "SAAS-205",
                title: "Persist theme toggle persistence",
                completed: true,
            },
        ],
    },
    {
        id: "bugs",
        title: "BUGS",
        count: 3,
        cards: [
            {
                id: "SAAS-450",
                title: "Mobile logout button not responsive on Safari",
                link: "SAAS-102",
                isBug: true,
            },
        ],
    },
];

const TaskCard = ({ card, isOverlay }) => {
    return (
        <div
            className={`p-4 rounded-lg bg-white border shadow-sm cursor-grab hover:shadow-md transition-all group relative ${card.highlight
                ? "border-blue-200 ring-2 ring-blue-500/20"
                : card.isBug
                    ? "border-red-200 bg-red-50/10 border-l-4 border-l-red-500"
                    : "border-gray-200 hover:border-blue-300"
                } ${isOverlay ? "rotate-2 shadow-xl cursor-grabbing scale-105" : ""}`}
        >
            <div className="flex justify-between items-start mb-2">
                <span
                    className={`text-[10px] font-bold ${card.isBug ? "text-red-500" : "text-gray-400"
                        }`}
                >
                    {card.id}
                </span>
                {card.completed && (
                    <div className="h-4 w-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                )}
            </div>

            <h3 className="text-sm font-medium text-gray-900 mb-3 leading-snug group-hover:text-blue-600">
                {card.title}
            </h3>

            <div className="flex items-center gap-2 mt-auto">
                {card.tag && (
                    <Badge
                        variant={card.tag.variant}
                        className="rounded px-1.5 py-0 text-[10px] font-medium h-5"
                    >
                        {card.tag.label}
                    </Badge>
                )}
                {card.tag2 && (
                    <Badge
                        variant={card.tag2.variant}
                        className="rounded px-1.5 py-0 text-[10px] font-medium h-5"
                    >
                        {card.tag2.label}
                    </Badge>
                )}
                {card.link && (
                    <div className="flex items-center text-[10px] text-gray-400 ml-auto">
                        <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                        {card.link}
                    </div>
                )}
                {card.progress && (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-200 ml-auto grid place-items-center">
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SortableTaskCard = ({ card }) => {
    const navigate = useNavigate();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: card.id, data: { ...card } });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
            <div onClick={() => navigate(`/tasks/${card.id}`, { state: { card } })}>
                <TaskCard card={card} />
            </div>
        </div>
    );
};

const BoardColumn = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef} className="flex-1 overflow-y-auto space-y-3 pr-2 pb-10">
            {children}
        </div>
    );
};

const Board = () => {
    const [columns, setColumns] = useState(initialColumns);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement before drag starts
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findContainer = (id) => {
        if (columns.find((col) => col.id === id)) {
            return id;
        }
        return columns.find((col) => col.cards.find((card) => card.id === id))?.id;
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setColumns((prev) => {
            const activeItems = prev.find((col) => col.id === activeContainer).cards;
            const overItems = prev.find((col) => col.id === overContainer).cards;
            const activeIndex = activeItems.findIndex((item) => item.id === active.id);
            const overIndex = overItems.findIndex((item) => item.id === overId);

            let newIndex;
            if (overItems.find((item) => item.id === overId)) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return prev.map((col) => {
                if (col.id === activeContainer) {
                    return {
                        ...col,
                        cards: col.cards.filter((item) => item.id !== active.id),
                    };
                } else if (col.id === overContainer) {
                    const newCards = [
                        ...col.cards.slice(0, newIndex),
                        activeItems[activeIndex],
                        ...col.cards.slice(newIndex, col.cards.length),
                    ];
                    // Remove duplicates just in case
                    const uniqueCards = Array.from(new Set(newCards.map(a => a.id)))
                        .map(id => {
                            return newCards.find(a => a.id === id)
                        })

                    // Calculate correct index for non-dup
                    // For simpler logic here since we are moving across containers:
                    // Just appending or inserting is usually done by arrayMove or similar splice logic.
                    // Since it's dragOver, we just move it into the new container.

                    // Simplified cross-container move:
                    const newColCards = [...col.cards];
                    // Find if we are over a card
                    const isOverCard = col.cards.find(c => c.id === overId);
                    if (isOverCard) {
                        const overCardIndex = col.cards.findIndex(c => c.id === overId);
                        // Insert at index
                        // We need to know if above or below. 
                        // Logic above tried to guess.
                        // Simplest: insert at overIndex
                        newColCards.splice(overIndex, 0, activeItems[activeIndex]);
                    } else {
                        // We are over the container
                        newColCards.push(activeItems[activeIndex]);
                    }

                    // Re-clean duplicates if any (due to React Strict Mode double invocation sometimes)
                    // Actually create new array correctly
                    const cleanActive = prev.find(c => c.id === activeContainer).cards.filter(c => c.id !== active.id);
                    const activeCard = prev.find(c => c.id === activeContainer).cards.find(c => c.id === active.id);

                    if (col.id === overContainer) {
                        const newCardsTarget = [...col.cards];
                        const overCardIndex = col.cards.findIndex(c => c.id === overId);

                        if (overCardIndex >= 0) {
                            newCardsTarget.splice(overCardIndex, 0, activeCard);
                        } else {
                            newCardsTarget.push(activeCard);
                        }
                        return { ...col, cards: newCardsTarget };
                    }

                    return col;
                }
                return col;
            });
        });
    };

    // Improved handleDragOver using arrayMove concepts adapted for multi-container
    const handleDragOverRefined = (event) => {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setColumns((prev) => {
            const activeColumn = prev.find(c => c.id === activeContainer);
            const overColumn = prev.find(c => c.id === overContainer);

            const activeItems = activeColumn.cards;
            const overItems = overColumn.cards;

            const activeIndex = activeItems.findIndex(i => i.id === active.id);
            const overIndex = overItems.findIndex(i => i.id === overId);

            let newIndex;
            if (overId in prev.find(c => c.id === overContainer)) {
                // We're over the column container itself
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return prev.map(c => {
                if (c.id === activeContainer) {
                    return { ...c, cards: c.cards.filter(item => item.id !== active.id) };
                } else if (c.id === overContainer) {
                    const newCards = [...c.cards];
                    // If overIndex is valid, insert there. Else append.
                    // NOTE: activeItems[activeIndex] might be undefined if state hasn't updated yet in a fast path, but usually fine.
                    const itemToMove = activeItems[activeIndex];

                    if (overIndex >= 0) {
                        newCards.splice(overIndex, 0, itemToMove);
                    } else {
                        newCards.push(itemToMove);
                    }
                    return { ...c, cards: newCards };
                }
                return c;
            });
        });
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = columns.find(c => c.id === activeContainer).cards.findIndex(i => i.id === active.id);
        const overIndex = columns.find(c => c.id === overContainer).cards.findIndex(i => i.id === over?.id);

        if (activeIndex !== overIndex && overContainer !== over?.id) {
            setColumns((prev) => {
                return prev.map(col => {
                    if (col.id === activeContainer) {
                        return {
                            ...col,
                            cards: arrayMove(col.cards, activeIndex, overIndex)
                        };
                    }
                    return col;
                });
            });
        }

        setActiveId(null);
    };

    const handleDragOverReal = (event) => {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) return;

        setColumns((prev) => {
            const activeItems = prev.find(c => c.id === activeContainer).cards;
            const overItems = prev.find(c => c.id === overContainer).cards;

            const activeIndex = activeItems.findIndex((item) => item.id === active.id);
            const overIndex = overItems.findIndex((item) => item.id === overId);

            let newIndex;
            if (overId === overContainer) {
                newIndex = overItems.length;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return prev.map((c) => {
                if (c.id === activeContainer) {
                    return { ...c, cards: c.cards.filter((item) => item.id !== active.id) };
                } else if (c.id === overContainer) {
                    const newCards = [...c.cards];
                    const item = activeItems[activeIndex];

                    // Insert at calculated index
                    // If we are over the container, push to end
                    if (overId === overContainer) {
                        newCards.push(item);
                    } else {
                        // We are over a card
                        // If we are dragging down, insert after. If up, insert before.
                        // The modifier calculates this roughly.
                        // However, dnd-kit sortable strategy usually handles the 'make space' visual.
                        // For cross-container, we physically move the item in data.
                        if (newIndex >= newCards.length) {
                            newCards.push(item);
                        } else {
                            newCards.splice(newIndex, 0, item);
                        }
                    }

                    return { ...c, cards: newCards };
                }
                return c;
            });
        });
    }


    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Board Header - Same as before */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-gray-200">
                <div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mb-1">
                        <span>Enterprise SaaS</span>
                        <span>/</span>
                        <span className="font-medium text-gray-900">Sprint 24 Board</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Active Development Cycle
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
                </div>
            </div>

            {/* Kanban Columns */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOverReal}
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
                                        <button className="text-gray-400 hover:text-gray-600">
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
                                        <button className="w-full py-2 flex items-center justify-center text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors border border-transparent hover:border-gray-200">
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
                        <TaskCard card={
                            columns.find(col => col.cards.find(c => c.id === activeId))
                                ?.cards.find(c => c.id === activeId)
                        } isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default Board;
