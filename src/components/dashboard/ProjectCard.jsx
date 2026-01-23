import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreHorizontalIcon } from "../ui/icons";

export const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projects/${project.id}`} className="block group">
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
    );
};
