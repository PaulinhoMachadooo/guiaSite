import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { Categoria } from "../types";

interface CategoryCardProps {
  categoria: Categoria;
  comerciosCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoria,
  comerciosCount,
}) => {
  const IconComponent = Icons[
    categoria.icone as keyof typeof Icons
  ] as React.ComponentType<any>;

  return (
    <Link
      to={`/categoria/${categoria.id}`}
      className="group block p-2 bg-blue-950 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <div className="flex items-center justify-between  ">
        <div className="flex-1 items-center ml-6 ">
          <h3 className="text-lg font-semibold  text-white  group-hover:text-orange-600 transition-colors">
            {categoria.nome}
          </h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            {comerciosCount}{" "}
            {comerciosCount === 1 ? "estabelecimento" : "estabelecimentos"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
