import React, { useState, useMemo } from "react";
import { Search, Store, Tag } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import ComercioCard from "../components/ComercioCard";
import { categorias, comercios } from "../data/comercios";
import { searchMatch } from "../utils/searchUtils";
import Searc from "../components/Searc";

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        categorias: categorias,
        comercios: [],
      };
    }

    const matchedCategorias = categorias.filter((categoria) =>
      searchMatch(categoria.nome, searchQuery),
    );

    const matchedComercios = comercios.filter(
      (comercio) =>
        searchMatch(comercio.nome, searchQuery) ||
        searchMatch(comercio.descricao, searchQuery) ||
        (comercio.especialidades &&
          comercio.especialidades.some((esp) => searchMatch(esp, searchQuery))),
    );

    return {
      categorias: matchedCategorias,
      comercios: matchedComercios,
    };
  }, [searchQuery]);

  const getCategoriaComerciosCount = (categoriaId: string) => {
    return comercios.filter((comercio) => comercio.categoria === categoriaId)
      .length;
  };

  const totalResults =
    searchResults.categorias.length + searchResults.comercios.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Todas as Categorias
          </h1>

          {!searchQuery ? (
            <p className="text-gray-600 mb-6">
              Explore diferentes tipos de estabelecimentos em nossa cidade
            </p>
          ) : (
            <p className="text-gray-600 mb-6">
              {totalResults}{" "}
              {totalResults === 1
                ? "resultado encontrado"
                : "resultados encontrados"}{" "}
              para "{searchQuery}"
            </p>
          )}
          <Searc onSearch={setSearchQuery} />
        </div>

        {/* Categorias Encontradas */}
        {searchResults.categorias.length > 0 && (
          <section className="mb-12" data-aos="fade-up" data-aos-delay="200">
            {searchQuery && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Tag className="h-6 w-6 mr-2 text-blue-500" />
                Categorias ({searchResults.categorias.length})
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.categorias.map((categoria) => (
                <CategoryCard
                  key={categoria.id}
                  categoria={categoria}
                  comerciosCount={getCategoriaComerciosCount(categoria.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Estabelecimentos Encontrados */}
        {searchResults.comercios.length > 0 && (
          <section className="mb-12" data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Store className="h-6 w-6 mr-2 text-green-500" />
              Estabelecimentos ({searchResults.comercios.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.comercios.map((comercio) => (
                <ComercioCard key={comercio.id} comercio={comercio} />
              ))}
            </div>
          </section>
        )}

        {/* Nenhum Resultado */}
        {totalResults === 0 && searchQuery && (
          <div className="text-center py-12" data-aos="fade-up">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-500 mb-6">
                Não encontramos nada para "{searchQuery}". Tente buscar por:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "restaurante",
                  "pizza",
                  "academia",
                  "salão",
                  "farmácia",
                  "pet shop",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
