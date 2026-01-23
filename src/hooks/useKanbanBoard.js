import { useState, useEffect } from "react";
import {
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
} from "@dnd-kit/core";
import {
    sortableKeyboardCoordinates,
    arrayMove,
} from "@dnd-kit/sortable";
import { initialColumns } from "../data/board-data";

export const useKanbanBoard = (tasks = []) => {
    const [columns, setColumns] = useState(initialColumns);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        if (!tasks.length) return;

        const newColumns = [
            { id: 'created', title: 'To Do', cards: [] },
            { id: 'in progress', title: 'In Progress', cards: [] },
            { id: 'done', title: 'Done', cards: [] },
            { id: 'bugs', title: 'Bugs', cards: [] },
            { id: 'testing', title: 'Testing', cards: [] }
        ];

        tasks.forEach(task => {
            const col = newColumns.find(c => c.id === task.status) || newColumns[0];
            col.cards.push({
                id: task._id,
                title: task.title,
                description: task.description,
                tags: task.tags?.map(t => ({ label: t, variant: 'default' })) || []
            });
        });

        setColumns(newColumns);
    }, [tasks]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
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

                    if (overId === overContainer) {
                        newCards.push(item);
                    } else {
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
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            setActiveId(null);
            return;
        }

        const activeIndex = columns.find(c => c.id === activeContainer).cards.findIndex(i => i.id === active.id);
        const overIndex = columns.find(c => c.id === overContainer).cards.findIndex(i => i.id === over?.id);

        if (activeIndex !== overIndex) {
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

    return {
        columns,
        activeId,
        sensors,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    };
};
