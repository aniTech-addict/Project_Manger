import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const BoardColumn = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef} className="flex-1 overflow-y-auto space-y-3 pr-2 pb-10">
            {children}
        </div>
    );
};
