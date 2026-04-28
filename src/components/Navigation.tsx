import React from "react";
import { Link } from "react-router-dom";
import { Home, Grid3X3, Search, Info, Phone } from "lucide-react";
import { useAppNavigation } from "../hooks/useNavigation";
import { ROUTES } from "../types/routes";

interface NavigationProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const Navigation: React.FC<NavigationProps> = ({
  className = "",
  orientation = "horizontal",
}) => {
  const { isCurrentRoute } = useAppNavigation();

  const navigationItems = [
    {
      path: ROUTES.HOME,
      label: "Início",
      icon: Home,
    },
    {
      path: ROUTES.CATEGORIES,
      label: "Categorias",
      icon: Grid3X3,
    },
    {
      path: ROUTES.SEARCH,
      label: "Buscar",
      icon: Search,
    },
  ];

  const containerClass =
    orientation === "horizontal" ? "flex space-x-6" : "flex flex-col space-y-2";

  return (
    <nav className={`${containerClass} ${className}`}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = isCurrentRoute(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
              ${
                isActive
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }
            `}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
