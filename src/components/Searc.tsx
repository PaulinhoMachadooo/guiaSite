import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearcProps {
  onSearch?: (query: string) => void;
}

const Searc: React.FC<SearcProps> = ({ onSearch }) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
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
      </div>
    </div>
  );
};

export default Searc;
