import React from "react";
import { PlusIcon } from "../ui/icons";

export const NewProjectCard = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="h-full min-h-[250px] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer group"
        >
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                <PlusIcon className="h-6 w-6 group-hover:text-blue-600" />
            </div>
            <span className="font-medium text-sm">Create New Project</span>
        </button>
    );
};
