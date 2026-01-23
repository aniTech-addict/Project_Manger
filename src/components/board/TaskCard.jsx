import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

export const TaskCard = ({ card, isOverlay }) => {
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

export const SortableTaskCard = ({ card }) => {
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
