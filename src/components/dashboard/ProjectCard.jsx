import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MoreHorizontalIcon } from '../ui/icons';

export const ProjectCard = ({ project, onEdit, onDelete }) => {
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
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="block group relative h-full"
    >
      <Card className="h-full transition-all duration-300 border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 bg-white">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${project.iconColor}`}
          >
            {/* Generic Project Icon */}
            <svg
              className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div className="relative z-10" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              aria-label="More options"
            >
              <MoreHorizontalIcon className="h-5 w-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-200 py-1 text-sm z-20 animate-scaleIn">
                <button
                  onClick={handleEdit}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 rounded-md mx-1 my-0.5"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 rounded-md mx-1 my-0.5"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <CardTitle className="mb-2 text-base font-semibold group-hover:text-blue-600 transition-colors duration-200">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 mb-4 h-10 text-sm text-gray-600">
            {project.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <Badge
                key={i}
                variant={tag.variant}
                className="transition-transform duration-200 hover:scale-105"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            {project.users.map((user, i) => (
              <Avatar
                key={i}
                className="h-6 w-6 border-2 border-white ring-0 transition-transform duration-200 hover:scale-125 hover:z-10"
              >
                <AvatarImage src={user.src} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
            {project.id === 1 && (
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-[10px] font-medium text-gray-500 border-2 border-white transition-transform duration-200 hover:scale-125">
                +3
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-200">
            {project.updated}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};
