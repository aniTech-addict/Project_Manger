import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ShareIcon, MoreHorizontalIcon } from '../ui/icons';

export const TaskHeader = ({ id, card, board, onEdit, onDelete }) => {
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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900 transition-colors">
          Projects
        </Link>
        {board && (
          <>
            <span className="mx-2">/</span>
            <Link
              to={`/projects/${board._id}`}
              className="hover:text-gray-900 transition-colors"
            >
              {board.title}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-900">{card?.title || id}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <ShareIcon className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button size="sm" onClick={onEdit} className="shadow-sm">
          Edit task
        </Button>
        <div className="relative" ref={menuRef}>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 text-sm z-20">
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
    </div>
  );
};
