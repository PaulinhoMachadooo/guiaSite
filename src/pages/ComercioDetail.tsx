import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import * as Icons from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ImageGallery from "../components/ImageGallery";
import { comercios, categorias } from "../data/comercios";

const ComercioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const comercio = comercios.find((c) => c.id === id);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!comercio) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Estabelecimento não encontrado
            </h1>
            <Link to="/" className="text-blue-950 hover:text-blue-950">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Redirecionar anúncios gratuitos para home
  if (comercio.tipoAnuncio === "gratuito") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Página não disponível
            </h1>
            <p className="text-gray-600 mb-6">
              Este é um anúncio gratuito. Para mais informações, entre em
              contato diretamente.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoria = categorias.find((cat) => cat.id === comercio.categoria);
  const IconComponent = categoria
    ? (Icons[categoria.icone as keyof typeof Icons] as React.ComponentType<any>)
    : null;

  const handleWhatsAppClick = () => {
    if (comercio.whatsapp) {
      const phone = comercio.whatsapp.replace(/\D/g, "");
      window.open(`https://wa.me/${phone}`, "_blank");
    }
  };

  const handleInstagramClick = () => {
    if (comercio.instagram) {
      const username = comercio.instagram.replace("@", "");
      window.open(`https://instagram.com/${username}`, "_blank");
    }
  };

  const handleFacebookClick = () => {
    if (comercio.facebook) {
      window.open(`https://facebook.com/${comercio.facebook}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*<Header />*/}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          data-aos="fade-right"
          onClick={handleGoBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>

        <div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          data-aos="fade-up"
        >
          <div className="relative h-64 sm:h-80">
            {comercio.mediaType === 'video' && comercio.video ? (
              <video
                src={comercio.video}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            ) : (
              <img
                src={comercio.imagem}
                alt={comercio.nome}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-3 mb-2">
                {categoria && (
                  <div className={`${categoria.cor} p-2 rounded-lg`}>
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 text-white" />
                    )}
                  </div>
                )}
                <span className="text-sm font-medium bg-black/30 px-2 py-1 rounded">
                  {categoria?.nome}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{comercio.nome}</h1>
            </div>
          </div>

          <div className="p-6" data-aos="fade-up" data-aos-delay="200">
            {/* Galeria de Imagens */}
            {comercio.galeria && comercio.galeria.length > 0 && (
              <ImageGallery
                images={comercio.galeria}
                businessName={comercio.nome}
              />
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Sobre
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {comercio.descricao}
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Informações de Contato
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">{comercio.endereco}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <a
                      href={`tel:${comercio.telefone}`}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      {comercio.telefone}
                    </a>
                  </div>

                  {comercio.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <a
                        href={`mailto:${comercio.email}`}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {comercio.email}
                      </a>
                    </div>
                  )}

                  {comercio.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <a
                        href={`https://${comercio.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {comercio.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Horário de Funcionamento
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{comercio.horarios}</span>
                </div>

                {(comercio.instagram ||
                  comercio.facebook ||
                  comercio.whatsapp) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Redes Sociais
                    </h3>
                    <div className="flex space-x-3">
                      {comercio.whatsapp && (
                        <button
                          onClick={handleWhatsAppClick}
                          className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <MessageCircle className="h-5 w-5" />
                        </button>
                      )}

                      {comercio.instagram && (
                        <button
                          onClick={handleInstagramClick}
                          className="flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </button>
                      )}

                      {comercio.facebook && (
                        <button
                          onClick={handleFacebookClick}
                          className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {comercio.especialidades && comercio.especialidades.length > 0 && (
              <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Especialidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {comercio.especialidades.map((especialidade, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-[#ff5e00] text-[#ffffff] rounded-full text-sm font-bold"
                    >
                      {especialidade}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div
              className="flex space-x-4 pt-6 border-t border-gray-200"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <a
                href={`tel:${comercio.telefone}`}
                className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ligar
              </a>

              {comercio.whatsapp && (
                <button
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComercioDetail;
