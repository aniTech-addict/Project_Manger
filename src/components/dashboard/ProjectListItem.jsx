import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreHorizontalIcon } from "../ui/icons";

export const ProjectListItem = ({ project, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(false);
        if (onEdit) onEdit();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(false);
        if (onDelete) onDelete();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    return (
        <Link to={`/projects/${project.id}`} className="block group">
            <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow mb-3 hover:border-gray-300">
                {/* Icon */}
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${project.iconColor}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>

                {/* Title & Desc */}
                <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{project.title}</h3>
                    <p className="text-xs text-gray-500 truncate h-4">{project.description}</p>
                </div>

                {/* Tags */}
                <div className="hidden md:flex gap-2 mr-4 flex-shrink-0">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant={tag.variant}>
                            {tag.label}
                        </Badge>
                    ))}
                    {project.tags.length > 3 && <span className="text-xs text-gray-400">+{project.tags.length - 3}</span>}
                </div>

                {/* Users */}
                <div className="hidden lg:flex -space-x-2 mr-6 flex-shrink-0">
                    {project.users.map((user, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-white ring-0">
                            <AvatarImage src={user.src} />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    ))}
                </div>

                {/* Date */}
                <div className="hidden sm:block text-xs text-gray-500 font-medium mr-4 flex-shrink-0 w-24 text-right">
                    {project.updated}
                </div>

                {/* Menu */}
                <div className="relative z-10 flex-shrink-0" ref={menuRef}>
                    <button
                        onClick={toggleMenu}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <MoreHorizontalIcon className="h-5 w-5" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 text-sm z-20">
                            <button
                                onClick={handleEdit}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};
