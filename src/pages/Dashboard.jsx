import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { PlusIcon, MoreHorizontalIcon, GridIcon } from "../components/ui/icons";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { CreateBoardModal } from "../components/CreateBoardModal";

const projects = [
    {
        id: 1,
        title: "Q3 Marketing Website",
        description: "Revamping the main marketing site for Q3 campaign launch.",
        tags: [
            { label: "Frontend", variant: "default" }, // Blueish
            { label: "Q1 Goal", variant: "secondary" } // Gray
        ],
        users: [
            { name: "User 1", src: "https://github.com/shadcn.png" },
            { name: "User 2", src: "https://github.com/shadcn.png" }
        ],
        updated: "Updated 2h ago",
        iconColor: "bg-blue-100 text-blue-600"
    },
    {
        id: 2,
        title: "API Infrastructure v2",
        description: "Scaling the core API to handle 10k req/s and improve latency.",
        tags: [
            { label: "Backend", variant: "success" },
            { label: "High Priority", variant: "destructive" }
        ],
        users: [
            { name: "User 1", src: "https://github.com/shadcn.png" }
        ],
        updated: "Updated yesterday",
        iconColor: "bg-green-100 text-green-600"
    },
    {
        id: 3,
        title: "Mobile Onboarding Flow",
        description: "Optimizing the mobile signup and login flow to increase conversion.",
        tags: [
            { label: "Design", variant: "warning" },
            { label: "Mobile", variant: "default" }
        ],
        users: [
            { name: "User 1", src: "https://github.com/shadcn.png" }
        ],
        updated: "Updated 3h ago",
        iconColor: "bg-orange-100 text-orange-600"
    },
    {
        id: 4,
        title: "Design System Audit",
        description: "Comprehensive review of all Figma components to ensure consistency.",
        tags: [
            { label: "Design", variant: "default" },
            { label: "Backlog", variant: "secondary" }
        ],
        users: [
            { name: "User 1", src: "https://github.com/shadcn.png" },
            { name: "User 2", src: "https://github.com/shadcn.png" }
        ],
        updated: "Updated 5h ago",
        iconColor: "bg-purple-100 text-purple-600"
    },
    {
        id: 5,
        title: "Customer Data Platform",
        description: "Centralizing user data across all touchpoints to improve analytics.",
        tags: [
            { label: "Data", variant: "success" },
            { label: "Q1 Goal", variant: "secondary" }
        ],
        users: [
            { name: "User 1", src: "https://github.com/shadcn.png" }
        ],
        updated: "Updated 1d ago",
        iconColor: "bg-teal-100 text-teal-600"
    },
    {
        id: 6,
        title: "Security Patching",
        description: "Critical security updates for auth services following audit.",
        tags: [
            { label: "Security", variant: "destructive" },
            { label: "URGENT", variant: "destructive" }
        ],
        users: [
            { name: "User 1", src: "https://github.com/shadcn.png" },
            { name: "User 2", src: "https://github.com/shadcn.png" }
        ],
        updated: "Updated 4h ago",
        iconColor: "bg-red-100 text-red-600"
    }
];

const Dashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Projects</h1>
                    <p className="text-gray-500 mt-1">Manage and track your organization's core initiatives.</p>
                </div>

                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="hidden md:flex">
                        Status: All
                        {/* Chevron Down */}
                        <svg className="ml-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </Button>
                    <Button variant="outline" className="hidden md:flex">
                        Sort: Recent
                        {/* Sort Icon */}
                        <svg className="ml-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                    </Button>

                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        New project
                    </Button>

                    <div className="flex bg-white rounded-md border border-gray-200 p-0.5 ml-2">
                        <button className="p-1.5 rounded bg-gray-100 text-gray-900 shadow-sm">
                            <GridIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                            {/* List Icon */}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`} className="block group">
                        <Card className="h-full hover:shadow-md transition-shadow duration-200 border-gray-100 hover:border-gray-200">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${project.iconColor}`}>
                                    {/* Generic Project Icon */}
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontalIcon className="h-5 w-5" />
                                </button>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <CardTitle className="mb-2 text-base">{project.title}</CardTitle>
                                <CardDescription className="line-clamp-2 mb-4 h-10">
                                    {project.description}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <Badge key={i} variant={tag.variant}>
                                            {tag.label}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between pt-2">
                                <div className="flex -space-x-2">
                                    {project.users.map((user, i) => (
                                        <Avatar key={i} className="h-6 w-6 border-2 border-white ring-0">
                                            <AvatarImage src={user.src} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    ))}
                                    {project.id === 1 && (<span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-[10px] font-medium text-gray-500 border-2 border-white">+3</span>)}
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{project.updated}</span>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}

                {/* Create New Project Card */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="h-full min-h-[250px] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer group"
                >
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                        <PlusIcon className="h-6 w-6 group-hover:text-blue-600" />
                    </div>
                    <span className="font-medium text-sm">Create New Project</span>
                </button>
            </div>

            <CreateBoardModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    );
};

export default Dashboard;
