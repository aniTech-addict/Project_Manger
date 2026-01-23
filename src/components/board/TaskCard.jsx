import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';

export const TaskCard = ({ card, isOverlay }) => {
  const displayId =
    card.code ||
    card.key ||
    card.shortId ||
    (card.id ? `TASK-${String(card.id).slice(-6).toUpperCase()}` : 'TASK');

  // Get priority color
  const getPriorityColor = (priority) => {
    const p = priority?.toLowerCase();
    if (p === 'high' || p === 'urgent') return 'bg-red-500';
    if (p === 'medium') return 'bg-yellow-500';
    if (p === 'low') return 'bg-green-500';
    return 'bg-gray-400';
  };

  return (
    <div
      className={`p-4 rounded-lg bg-white border transition-all duration-200 group relative ${
        card.highlight
          ? 'border-blue-300 ring-2 ring-blue-500/20 shadow-md'
          : card.isBug
            ? 'border-red-200 bg-red-50/10 border-l-4 border-l-red-500 hover:shadow-lg'
            : 'border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5'
      } ${isOverlay ? 'rotate-2 shadow-2xl cursor-grabbing scale-105' : 'cursor-grab shadow-sm'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[10px] font-bold tracking-wide ${
            card.isBug
              ? 'text-red-500'
              : 'text-gray-400 group-hover:text-blue-500'
          } transition-colors duration-200`}
          title={card.id}
        >
          {displayId}
        </span>
        <div className="flex items-center gap-1.5">
          {card.priority && (
            <div
              className={`h-2 w-2 rounded-full ${getPriorityColor(card.priority)} animate-scaleIn`}
              title={`Priority: ${card.priority}`}
            />
          )}
          {card.completed && (
            <div className="h-4 w-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center animate-scaleIn">
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
      </div>

      <h2 className="text-md font-medium text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-200">
        {card.title}
      </h2>

      {/* Tags Section */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {card.tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant={tag.variant || 'secondary'}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium h-5 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              {typeof tag === 'string' ? tag : tag.label}
            </Badge>
          ))}
          {card.tags.length > 3 && (
            <span className="text-[10px] text-gray-400 font-medium px-1 flex items-center">
              +{card.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer Section */}
      <div className="flex items-center justify-between text-[10px] text-gray-400">
        <div className="flex items-center gap-2">
          {card.link && (
            <div className="flex items-center group-hover:text-blue-500 transition-colors duration-200">
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
          {card.comments && (
            <div className="flex items-center">
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
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              {card.comments}
            </div>
          )}
        </div>
        {card.progress && (
          <div className="h-4 w-4 rounded-full border-2 border-gray-200 grid place-items-center group-hover:border-blue-400 transition-colors duration-200">
            <div className="h-2 w-2 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors duration-200"></div>
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <div onClick={() => navigate(`/tasks/${card.id}`, { state: { card } })}>
        <TaskCard card={card} />
      </div>
    </div>
  );
};
