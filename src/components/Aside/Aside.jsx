import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const linkBase =
    "flex items-center gap-3 p-3 rounded-lg transition text-sm font-medium";

const Aside = () => {
    return (
        <aside className="w-64 bg-gray-900 text-gray-200 min-h-screen p-5 flex flex-col">

            {/* Logo */}
            <div className="text-2xl font-bold mb-10 text-white tracking-wide">
                AdminPanel
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-3">
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                    }
                >
                    <HomeIcon className="h-5 w-5" />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/dashboard/add-request"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                    }
                >
                    <HomeIcon className="h-5 w-5" />
                    Add Request
                </NavLink>

                <NavLink
                    to="/dashboard/manage-product"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                    }
                >
                    <HomeIcon className="h-5 w-5" />
                    Manage Product
                </NavLink>

                <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                    }
                >
                    <UserCircleIcon className="h-5 w-5" />
                    Users
                </NavLink>

                <NavLink
                    to="/dashboard/settings"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                    }
                >
                    <Cog6ToothIcon className="h-5 w-5" />
                    Settings
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="mt-auto">
                <button className="flex items-center gap-3 p-3 w-full rounded-lg text-left text-red-400 hover:bg-red-600 hover:text-white transition">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Logout
                </button>
            </div>

        </aside>
    );
};

export default Aside;
