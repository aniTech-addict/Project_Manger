import { Outlet, NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    SearchIcon,
    BellIcon,
    PlusIcon,
    GridIcon,
    SettingsIcon,
    LayoutTemplateIcon,
    ShareIcon
} from '../ui/icons';

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                {/* Brand */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 text-white">
                        <LayoutTemplateIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-gray-900 leading-none">Acme Projects</h1>
                        <span className="text-xs text-gray-500">Enterprise SaaS</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`
                        }
                    >
                        <GridIcon className="mr-3 h-5 w-5" />
                        All Boards
                    </NavLink>
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-100 space-y-1">
                    <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <SettingsIcon className="mr-3 h-5 w-5" />
                        Settings
                    </button>

                    <div className="pt-4 mt-2">
                        <div className="flex items-center px-3 py-2">
                            <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-medium text-gray-900">Alex Rivera</span>
                                <span className="text-xs text-gray-500">Admin View</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="w-96">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search projects, tasks, or teams..."
                                className="pl-10 bg-gray-50 border-transparent focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <ShareIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 relative">
                            <BellIcon className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto bg-gray-50 p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
