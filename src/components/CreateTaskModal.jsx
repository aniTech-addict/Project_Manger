import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "./ui/modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
    CloseIcon,
    CheckCircleIcon,
    PaperclipIcon,
    AtSignIcon,
    SearchIcon
} from "./ui/icons";
import { cn } from "../lib/utils";

export function CreateTaskModal({ isOpen, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState(["Frontend", "High Priority"]);
    const [newTag, setNewTag] = useState("");
    const [status] = useState("created");

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
        console.log({ title, description, tags, status });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-[650px] p-0 overflow-hidden rounded-xl">
            {/* Custom Close Button - Absolute */}
            <div className="absolute top-3 right-3 z-50">
                <button
                    onClick={onClose}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <CloseIcon className="h-4 w-4" />
                </button>
            </div>

            <ModalHeader className="px-6 pt-5 pb-0">
                <div className="flex items-center gap-2.5">
                    <div className="bg-blue-100/50 p-1.5 rounded-full">
                        <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <ModalTitle className="text-lg font-bold text-gray-900">Create Task</ModalTitle>
                </div>
            </ModalHeader>

            <ModalContent className="px-6 py-4 space-y-4">
                {/* Task Title */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                        <label htmlFor="task-title" className="text-xs font-semibold text-gray-700">
                            Task Title <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider">REQUIRED</span>
                    </div>

                    <Input
                        id="task-title"
                        placeholder="E.g. Implement user authentication flow"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-9 text-sm placeholder:text-gray-400"
                    />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label htmlFor="description" className="text-xs font-semibold text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Textarea
                            id="description"
                            placeholder="Add a detailed description about the requirements..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="resize-none min-h-[100px] text-sm leading-relaxed p-3"
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-1 px-1">
                        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors group">
                            <PaperclipIcon className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-600" />
                            Attach files
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors group">
                            <AtSignIcon className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-600" />
                            Mention someone
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Status */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700">Status</label>
                        <div className="relative group cursor-pointer">
                            <div className="flex items-center justify-between h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm shadow-sm hover:border-blue-400 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                    <span className="font-medium text-gray-700 text-xs">Created</span>
                                </div>
                                {/* Gradient box mockup */}
                                <div className="h-4 w-4 rounded bg-gradient-to-br from-teal-400 to-blue-500 opacity-80"></div>
                            </div>
                        </div>
                    </div>

                    {/* Parent Task */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700">Parent Task (Optional)</label>
                        <div className="relative">
                            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                            <Input
                                placeholder="Search tasks..."
                                className="pl-8 h-9 text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Tags Input */}
                <div className="space-y-1.5Wrapper">
                    <label className="text-xs font-semibold text-gray-700">Tags</label>
                    <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-md border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 min-h-[40px]">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className={cn(
                                    "flex items-center gap-1 font-medium rounded-md px-2 py-0.5 text-[11px] transition-colors",
                                    tag === "Frontend" ? "text-blue-700 bg-blue-50 border border-blue-100" :
                                        tag === "High Priority" ? "text-purple-700 bg-purple-50 border border-purple-100" :
                                            "text-gray-700 bg-gray-50 border border-gray-200"
                                )}
                            >
                                {tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-gray-900 focus:outline-none ml-0.5"
                                >
                                    <CloseIcon className="h-2.5 w-2.5" />
                                </button>
                            </Badge>
                        ))}
                        <input
                            type="text"
                            placeholder={tags.length === 0 ? "Add tags..." : "Add tag..."}
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="flex-1 min-w-[60px] text-xs outline-none bg-transparent placeholder:text-gray-400 h-6"
                        />
                    </div>
                </div>

                {/* Assign To */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Assign To</label>
                    <div className="flex items-center justify-between p-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7 bg-blue-600 text-white ring-2 ring-white">
                                <AvatarFallback className="text-xs bg-blue-600 text-white">JD</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-gray-900">Jane Doe (You)</span>
                        </div>
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                            Change
                        </button>
                    </div>
                </div>

            </ModalContent>

            <ModalFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 hidden sm:flex select-none">
                    <div className="flex items-center gap-1">
                        <span className="h-5 w-5 rounded border border-gray-200 flex items-center justify-center bg-white shadow-sm font-sans font-medium text-gray-500">⌘</span>
                        <span className="h-5 px-1.5 rounded border border-gray-200 flex items-center justify-center bg-white shadow-sm font-sans font-medium text-gray-500">Enter</span>
                    </div>
                    <span className="ml-0.5">to submit</span>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <Button variant="ghost" onClick={onClose} size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-9">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={!title.trim()} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-9 px-4">
                        Create Task
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}
