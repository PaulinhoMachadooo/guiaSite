import React from "react";
import {
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { Comercio } from "../types";

interface ComercioModalProps {
  comercio: Comercio;
  isOpen: boolean;
  onClose: () => void;
}

const ComercioModal: React.FC<ComercioModalProps> = ({
  comercio,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

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

  const handleLocationClick = () => {
    const address = encodeURIComponent(comercio.endereco);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
      "_blank"
    );
  };

  const handleCallClick = () => {
    window.location.href = `tel:${comercio.telefone}`;
  };

  const handleEmailClick = () => {
    if (comercio.email) {
      window.location.href = `mailto:${comercio.email}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header com imagem */}
        <div className="relative h-48 sm:h-64">
          <img
            src={comercio.imagem}
            alt={comercio.nome}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl" />

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Badge promocional 
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              PROMOCIONAL
            </span>
          </div>*/}

          {/* Título sobre a imagem */}
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-1">{comercio.nome}</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Descrição */}
          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">
              {comercio.descricao}
            </p>
          </div>

          {/* Especialidades */}
          {comercio.especialidades && comercio.especialidades.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Especialidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {comercio.especialidades.map((especialidade, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium"
                  >
                    {especialidade}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Informações de contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Contato
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{comercio.endereco}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <button
                    onClick={handleCallClick}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {comercio.telefone}
                  </button>
                </div>

                {comercio.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <button
                      onClick={handleEmailClick}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {comercio.email}
                    </button>
                  </div>
                )}

                {comercio.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <a
                      href={`https://${comercio.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {comercio.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Horário
              </h3>
              <div className="flex items-start space-x-3 mb-4">
                <Clock className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-600 text-sm whitespace-pre-line">
                  {comercio.horarios}
                </div>
              </div>

              {/* Redes sociais */}
              {(comercio.instagram ||
                comercio.facebook ||
                comercio.whatsapp) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Redes Sociais
                  </h3>
                  <div className="flex space-x-3">
                    {/*<button
                      onClick={handleLocationClick}
                      className="flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Ver no Google Maps"
                    >
                      <Navigation className="h-5 w-5" />
                    </button>*/}

                    {comercio.whatsapp && (
                      <button
                        onClick={handleWhatsAppClick}
                        className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    )}

                    {comercio.instagram && (
                      <button
                        onClick={handleInstagramClick}
                        className="flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </button>
                    )}

                    {comercio.facebook && (
                      <button
                        onClick={handleFacebookClick}
                        className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleCallClick}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg"
            >
              Ligar Agora
            </button>

            {comercio.whatsapp && (
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg"
              >
                WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComercioModal;
