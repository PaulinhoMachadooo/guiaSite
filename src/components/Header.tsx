import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Para busca em tempo real nas outras páginas
    if (onSearch && !value.trim()) {
      onSearch("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch && searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="" className="flex items-center space-x-2">
            <img src={logo} className="h-12 w-auto" alt="Guia Mais logo" />
            <div>
              <h1 className="text-xl font-bold text-[#112342]">GUIA+</h1>
              <p className="text-xs text-gray-500">Comércios locais</p>
            </div>
          </Link>

          {onSearch && (
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                />
              </form>
            </div>
          )}

          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/categorias"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              CATEGORIAS
            </Link>
            {/*<Link
              to="/cidade"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Cidade
            </Link>*/}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
