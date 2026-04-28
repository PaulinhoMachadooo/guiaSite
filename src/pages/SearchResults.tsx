import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import ComercioCard from "../components/ComercioCard";
import CategoryCard from "../components/CategoryCard";
import { comercios, categorias } from "../data/comercios";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const goBack = () => navigate(-1);

  const initialQuery = searchParams.get("q") || "";

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        categorias: [],
        comercios: [],
      };
    }

    const query = searchQuery.toLowerCase();

    const matchedCategorias = categorias.filter(
      (categoria) =>
        categoria.nome.toLowerCase().includes(query) ||
        categoria.descricao.toLowerCase().includes(query),
    );

    const matchedComercios = comercios.filter(
      (comercio) =>
        comercio.nome.toLowerCase().includes(query) ||
        comercio.descricao.toLowerCase().includes(query) ||
        (comercio.especialidades &&
          comercio.especialidades.some((esp) =>
            esp.toLowerCase().includes(query),
          )),
    );

    return {
      categorias: matchedCategorias,
      comercios: matchedComercios,
    };
  }, [searchQuery]);

  const totalResults =
    searchResults.categorias.length + searchResults.comercios.length;

  const getCategoriaComerciosCount = (categoriaId: string) => {
    return comercios.filter((comercio) => comercio.categoria === categoriaId)
      .length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={goBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Resultados da Busca
            </h1>
            {searchQuery && (
              <p className="text-gray-600">
                {totalResults}{" "}
                {totalResults === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"}
                para "{searchQuery}"
              </p>
            )}
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchQuery && (
          <>
            {/* Categorias Encontradas */}
            {searchResults.categorias.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Categorias ({searchResults.categorias.length})
                </h2>
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

            {/* Comércios Encontrados */}
            {searchResults.comercios.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
              <div className="text-center py-12">
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
                      "salão",
                      "farmácia",
                      "escola",
                      "academia",
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
          </>
        )}

        {/* Estado Inicial */}
        {!searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Digite algo para buscar
            </h3>
            <p className="text-gray-500">
              Encontre comércios, categorias e serviços da sua cidade
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
