import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "./ui/modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { CloseIcon } from "./ui/icons";
import { cn } from "../lib/utils";

export function CreateBoardModal({ isOpen, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState(["Engineering", "Roadmap"]);
    const [newTag, setNewTag] = useState("");
    const [visibility, setVisibility] = useState("private"); // 'private' or 'internal'

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

    const handleCreate = () => {
        // Here you would call an API or parent handler
        console.log({ title, description, tags, visibility });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-[550px]">
            <ModalHeader>
                <ModalTitle className="text-2xl text-center">Create new board</ModalTitle>
                <ModalDescription className="text-center mt-2">
                    A board helps you track tasks, manage workflows, and collaborate with your team.
                </ModalDescription>
            </ModalHeader>

            <ModalContent className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                    <label htmlFor="board-title" className="text-sm font-medium text-gray-900">
                        Board title <span className="text-red-500">*</span>
                    </label>
                    <Input
                        id="board-title"
                        placeholder="e.g., Q4 Product Roadmap"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-11"
                    />
                </div>

                {/* Description Input */}
                <div className="space-y-2 relative">
                    <div className="flex justify-between">
                        <label htmlFor="description" className="text-sm font-medium text-gray-900">
                            Description (optional)
                        </label>
                        <span className="text-xs text-gray-400">{description.length}/500</span>
                    </div>
                    <Textarea
                        id="description"
                        placeholder="What is this board for? Provide context for your team."
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                        className="resize-none h-24"
                    />
                </div>

                {/* Tags Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Tags</label>
                    <div className="flex flex-wrap items-center gap-2 p-2 rounded-md border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="flex items-center gap-1 font-normal text-blue-600 bg-blue-50 hover:bg-blue-100 rounded px-2 py-0.5"
                            >
                                {tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    className="text-blue-400 hover:text-blue-600 focus:outline-none"
                                >
                                    <CloseIcon className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                        <input
                            type="text"
                            placeholder="Add tags..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="flex-1 min-w-[80px] text-sm outline-none bg-transparent placeholder:text-gray-400 h-6"
                        />
                    </div>
                </div>

                {/* Visibility Options */}
                <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
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
                                "h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center transition-all",
                                visibility === "private" ? "border-blue-600 ring-4 ring-blue-50" : "group-hover:border-gray-400"
                            )}>
                                {visibility === "private" && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                )}
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-900">Private</span>
                            <span className="block text-sm text-gray-500">
                                Only you and people you choose can see this board.
                            </span>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
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
                                "h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center transition-all",
                                visibility === "internal" ? "border-blue-600 ring-4 ring-blue-50" : "group-hover:border-gray-400"
                            )}>
                                {visibility === "internal" && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                )}
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-900">Internal</span>
                            <span className="block text-sm text-gray-500">
                                Anyone in your organization can see this board.
                            </span>
                        </div>
                    </label>
                </div>
            </ModalContent>

            <ModalFooter className="border-t border-gray-100 bg-gray-50/50">
                <Button variant="ghost" onClick={onClose} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                    Cancel
                </Button>
                <Button onClick={handleCreate} disabled={!title.trim()} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    Create board
                </Button>
            </ModalFooter>
        </Modal>
    );
}
