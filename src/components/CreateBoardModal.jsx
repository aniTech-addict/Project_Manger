import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "./ui/modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { CloseIcon } from "./ui/icons";
import { cn } from "../lib/utils";
import { useCreateBoard, useUpdateBoard } from "../hooks/useBoards";

export function CreateBoardModal({ isOpen, onClose, boardToEdit = null }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState(["Engineering", "Roadmap"]);
    const [newTag, setNewTag] = useState("");
    const [visibility, setVisibility] = useState("private"); // 'private' or 'internal'

    const { mutate: createBoard, isPending: isCreating } = useCreateBoard();
    const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();

    const isPending = isCreating || isUpdating;

    useEffect(() => {
        if (isOpen && boardToEdit) {
            setTitle(boardToEdit.title);
            setDescription(boardToEdit.description || "");
            setTags(boardToEdit.tags || []);
            // Assuming visibility is not part of the board object yet based on the previous file content, 
            // but if it were, we would set it here. Defaulting to 'private' or whatever calls for it.
            // checking dashboard-data structure in my mind... usually it might be there.
        } else if (isOpen && !boardToEdit) {
            // Reset for create mode
            setTitle("");
            setDescription("");
            setTags(["Engineering", "Roadmap"]);
            setNewTag("");
            setVisibility("private");
        }
    }, [isOpen, boardToEdit]);

    const handleAddTag = (e) => {
        if (e.key === "Enter" && newTag.trim()) {
            e.preventDefault();
            if (!tags.includes(newTag.trim())) {
                setTags([...tags, newTag.trim()]);
            }
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSave = () => {
        if (boardToEdit) {
            updateBoard(
                { id: boardToEdit.id, title, description, tags },
                {
                    onSuccess: () => {
                        onClose();
                    }
                }
            );
        } else {
            createBoard(
                { title, description, tags, status: 'Active' },
                {
                    onSuccess: () => {
                        onClose();
                        setTitle("");
                        setDescription("");
                        setTags(["Engineering", "Roadmap"]);
                    }
                }
            );
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-[480px] rounded-lg">
            <ModalHeader className="px-5 pt-5 pb-0 text-left">
                <ModalTitle className="text-lg font-bold">{boardToEdit ? "Edit board" : "Create new board"}</ModalTitle>
                <ModalDescription className="text-left mt-1 text-xs text-gray-500">
                    {boardToEdit ? "Update the details of your board." : "A board helps you track tasks and manage workflows."}
                </ModalDescription>
            </ModalHeader>

            <ModalContent className="space-y-4 px-5 py-4">
                {/* Title Input */}
                <div className="space-y-1.5">
                    <label htmlFor="board-title" className="text-xs font-semibold text-gray-700">
                        Board title <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="board-title"
                        placeholder="e.g., Q4 Product Roadmap"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-9 text-sm"
                    />
                </div>

                {/* Description Input */}
                <div className="space-y-1.5 relative">
                    <div className="flex justify-between">
                        <label htmlFor="description" className="text-xs font-semibold text-gray-700">
                            Description (optional)
                        </label>
                        <span className="text-[10px] text-gray-400">{description.length}/500</span>
                    </div>
                    <Textarea
                        id="description"
                        placeholder="What is this board for?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                        className="resize-none h-20 text-sm p-3"
                    />
                </div>

                {/* Tags Input */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Tags</label>
                    <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-md border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 min-h-[40px]">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="flex items-center gap-1 font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded px-2 py-0.5 text-[11px]"
                            >
                                {tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                    <CloseIcon className="h-2.5 w-2.5" />
                                </button>
                            </Badge>
                        ))}
                        <input
                            type="text"
                            placeholder="Add tags..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="flex-1 min-w-[60px] text-xs outline-none bg-transparent placeholder:text-gray-400 h-6"
                        />
                    </div>
                </div>

                {/* Visibility Options */}
                <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group p-2 rounded-md hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="mt-0.5">
                            <input
                                type="radio"
                                name="visibility"
                                value="private"
                                checked={visibility === "private"}
                                onChange={(e) => setVisibility(e.target.value)}
                                className="sr-only"
                            />
                            <div className={cn(
                                "h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center transition-all",
                                visibility === "private" ? "border-blue-600 ring-2 ring-blue-50" : "group-hover:border-gray-400"
                            )}>
                                {visibility === "private" && (
                                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                                )}
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-900">Private</span>
                            <span className="block text-xs text-gray-500">
                                Only you and people you choose can see this board.
                            </span>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group p-2 rounded-md hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="mt-0.5">
                            <input
                                type="radio"
                                name="visibility"
                                value="internal"
                                checked={visibility === "internal"}
                                onChange={(e) => setVisibility(e.target.value)}
                                className="sr-only"
                            />
                            <div className={cn(
                                "h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center transition-all",
                                visibility === "internal" ? "border-blue-600 ring-2 ring-blue-50" : "group-hover:border-gray-400"
                            )}>
                                {visibility === "internal" && (
                                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                                )}
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-900">Internal</span>
                            <span className="block text-xs text-gray-500">
                                Anyone in your organization can see this board.
                            </span>
                        </div>
                    </label>
                </div>
            </ModalContent>

            <ModalFooter className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <Button variant="ghost" onClick={onClose} size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-9">
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!title.trim()} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-9 px-4">
                    {isPending ? (boardToEdit ? "Saving..." : "Creating...") : (boardToEdit ? "Save changes" : "Create board")}
                </Button>
            </ModalFooter>
        </Modal>
    );
}
