import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Clock,
  MapPin,
  Building,
  Heart,
  Shield,
  Flame,
  Bus,
  AlertCircle,
  Calendar,
} from "lucide-react";
import Header from "../components/Header";

const CityInfo: React.FC = () => {
  const emergencyContacts = [
    {
      name: "Bombeiros",
      phone: "193",
      icon: Flame,
      color: "bg-red-500",
      description: "Emergências e incêndios",
    },
    {
      name: "Polícia Militar",
      phone: "190",
      icon: Shield,
      color: "bg-blue-600",
      description: "Emergências policiais",
    },
    {
      name: "SAMU",
      phone: "192",
      icon: Heart,
      color: "bg-red-600",
      description: "Emergências médicas",
    },
    {
      name: "Polícia Civil",
      phone: "197",
      icon: Shield,
      color: "bg-gray-600",
      description: "Ocorrências policiais",
    },
  ];

  const publicServices = [
    {
      name: "Prefeitura Municipal",
      phone: "(15) 3261-9200",
      address: "Rua Tiradentes, 252 - Centro",
      hours: "Seg-Sex: 8h às 17h",
      icon: Building,
      color: "bg-blue-500",
    },
    {
      name: "UBS Centro",
      phone: "(15) 3261-2847",
      address: "Rua Dr. Cardoso de Almeida, 456 - Centro",
      hours: "Seg-Sex: 7h às 17h",
      icon: Heart,
      color: "bg-green-500",
    },
    {
      name: "UBS Vila Progresso",
      phone: "(15) 3261-3421",
      address: "Rua João Silva, 123 - Vila Progresso",
      hours: "Seg-Sex: 7h às 17h",
      icon: Heart,
      color: "bg-green-500",
    },
    {
      name: "Pronto Socorro",
      phone: "(15) 3261-1234",
      address: "Av. Getúlio Vargas, 789 - Centro",
      hours: "24 horas",
      icon: AlertCircle,
      color: "bg-red-500",
    },
  ];

  const busSchedules = [
    {
      route: "Circular Centro",
      routes: [
        {
          destination: "Centro → Vila Progresso",
          times: [
            "06:00",
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
          ],
        },
        {
          destination: "Vila Progresso → Centro",
          times: [
            "06:30",
            "08:30",
            "10:30",
            "12:30",
            "14:30",
            "16:30",
            "18:30",
          ],
        },
        {
          destination: "Centro → Bambu",
          times: ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00"],
        },
        {
          destination: "Bambu → Centro",
          times: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30"],
        },
        {
          destination: "Centro → Vila Alcalá",
          times: [
            "06:15",
            "08:15",
            "10:15",
            "12:15",
            "14:15",
            "16:15",
            "18:15",
          ],
        },
        {
          destination: "Vila Alcalá → Centro",
          times: [
            "06:45",
            "08:45",
            "10:45",
            "12:45",
            "14:45",
            "16:45",
            "18:45",
          ],
        },
      ],
    },
  ];

  const publicHours = [
    {
      sector: "Atendimento ao Público",
      hours: "Segunda a Sexta: 8h às 17h",
      break: "Almoço: 12h às 13h",
    },
    {
      sector: "Protocolo",
      hours: "Segunda a Sexta: 8h às 16h",
      break: "Almoço: 12h às 13h",
    },
    {
      sector: "Secretaria de Saúde",
      hours: "Segunda a Sexta: 7h às 17h",
      break: "Almoço: 12h às 13h",
    },
    {
      sector: "Secretaria de Educação",
      hours: "Segunda a Sexta: 8h às 17h",
      break: "Almoço: 12h às 13h",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8" data-aos="fade-up">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Informações da Cidade
          </h1>
          <p className="text-gray-600">
            Telefones úteis, horários de funcionamento e informações importantes
            de Porto Feliz
          </p>
        </div>

        {/* Telefones de Emergência */}
        <section className="mb-12" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
            Telefones de Emergência
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                data-aos="zoom-in"
                data-aos-delay={300 + index * 100}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`${contact.color} p-3 rounded-lg`}>
                    <contact.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {contact.description}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Serviços Públicos */}
        <section className="mb-12" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Building className="h-6 w-6 mr-2 text-blue-500" />
            Serviços Públicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`${service.color} p-3 rounded-lg flex-shrink-0`}
                  >
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{service.address}</span>
                      </div>

                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{service.hours}</span>
                      </div>
                    </div>

                    <a
                      href={`tel:${service.phone}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {service.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Horários dos Setores Públicos */}
        <section className="mb-12" data-aos="fade-up" data-aos-delay="600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-purple-500" />
            Horários dos Setores Públicos
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Setor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horário de Funcionamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Intervalo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publicHours.map((sector, index) => (
                    <tr
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={700 + index * 50}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sector.sector}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sector.hours}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sector.break}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Horários do Ônibus Circular */}
        <section className="mb-12" data-aos="fade-up" data-aos-delay="800">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Bus className="h-6 w-6 mr-2 text-green-500" />
            Horários do Ônibus Circular
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            {busSchedules.map((route, routeIndex) => (
              <div key={routeIndex}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {route.route}
                </h3>
                <div className="space-y-4">
                  {route.routes.map((routeInfo, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg"
                      data-aos="fade-up"
                      data-aos-delay={900 + index * 100}
                    >
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {routeInfo.destination}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {routeInfo.times.map((time, timeIndex) => (
                            <span
                              key={timeIndex}
                              className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Observação:</strong> Horários sujeitos a alterações.
                    Para informações atualizadas, entre em contato com a
                    Prefeitura.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informações Adicionais */}
        <section className="mb-12" data-aos="fade-up" data-aos-delay="1000">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Informações Importantes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Em caso de emergência:
                </h3>
                <p className="text-blue-100">
                  Mantenha a calma e ligue para o número apropriado. Tenha
                  sempre em mãos informações como endereço completo e pontos de
                  referência.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Atendimento Público:
                </h3>
                <p className="text-blue-100">
                  Para melhor atendimento, procure os serviços públicos
                  preferencialmente pela manhã e evite os horários de pico.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CityInfo;
