import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ShareIcon, MoreHorizontalIcon } from "../ui/icons";

export const TaskHeader = ({ id, card }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-sm text-gray-500">
                <Link to="/" className="hover:text-gray-900 transition-colors">Engineering</Link>
                <span className="mx-2">/</span>
                <Link to="/projects/1" className="hover:text-gray-900 transition-colors">Project Alpha</Link>
                <span className="mx-2">/</span>
                <span className="font-semibold text-gray-900">{card?.id || id || "PROJ-42"}</span>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                    <ShareIcon className="mr-2 h-4 w-4" />
                    Share
                </Button>
                <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
