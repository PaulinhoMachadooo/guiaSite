import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import * as Icons from "lucide-react";
import Header from "../components/Header";
import ComercioCard from "../components/ComercioCard";
import { categorias, comercios } from "../data/comercios";
import { searchMatch } from "../utils/searchUtils";

function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const categoria = categorias.find((cat) => cat.id === id);

  const categoryComercios = useMemo(() => {
    const filtered = comercios.filter((comercio) => comercio.categoria === id);
    if (!searchQuery) return filtered;
    return filtered.filter(
      (comercio) =>
        searchMatch(comercio.nome, searchQuery) ||
        searchMatch(comercio.descricao, searchQuery) ||
        (comercio.especialidades &&
          comercio.especialidades.some((esp) => searchMatch(esp, searchQuery))),
    );
  }, [id, searchQuery]);

  if (!categoria) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Categoria não encontrada
            </h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = Icons[
    categoria.icone as keyof typeof Icons
  ] as React.ComponentType<any>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8" data-aos="fade-up">
          {/* <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>*/}

          <div
            className="flex items-center space-x-4 mb-6"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className={`${categoria.cor} p-4 rounded-xl`}>
              {IconComponent && (
                <IconComponent className="h-8 w-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {/*{categoria.nome}*/}
              </h1>
              <p className="text-gray-600 mt-1">{categoria.descricao}</p>
              <p className="text-sm text-blue-600 mt-2">
                {categoryComercios.length}{" "}
                {categoryComercios.length === 1
                  ? "estabelecimento"
                  : "estabelecimentos"}
              </p>
            </div>
          </div>

          <div
            className="relative max-w-md"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar estabelecimentos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {categoryComercios.map((comercio) => (
            <ComercioCard key={comercio.id} comercio={comercio} />
          ))}
        </div>

        {categoryComercios.length === 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? "Nenhum estabelecimento encontrado"
                : "Nenhum estabelecimento cadastrado nesta categoria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetail;
