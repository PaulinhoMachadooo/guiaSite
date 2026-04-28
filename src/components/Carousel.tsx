import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  //title: string;
  //description: string;
  //buttonText: string;
  //buttonLink: string;
}

const slides: Slide[] = [
  /*{
    id: 1,
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczNAlysX06Uvd0h-zqnWj9w0POB8tqU0ALnUp5F07UEnRG76PxzeUofvcNkUpirJl4c1NYVfomOjg49CoKGgd8ADS7fb5q32CguJgNDn-YcW-aVG_d5PQWvUyOw3m2M7kbLRwiY1Bkw9cjICld6gTgPG=w521-h250-s-no-gm?authuser=4",
    //title: 'Descubra os Melhores Restaurantes',
    //description: 'Sabores únicos e experiências gastronômicas incríveis te aguardam',
    //buttonText: 'Ver Restaurantes',
    //buttonLink: '/categoria/restaurantes'
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczODVVhLzewvW90RwHg9iHA5-20pCj0VvmKYTXJlhbHKXsCuUZgGTkLJbxpiEo6D3e-R7khjAf-owTbM4AU8KsFMIGg4ueZcTA--_WoyyLOSuM61mnVL8uvItfyjO0Khs_5tLNezPw-KQXLMzlKFEM8n=w1218-h720-s-no-gm?authuser=4",
    //title: 'Serviços de Qualidade',
    // description: 'Profissionais qualificados para atender todas as suas necessidades',
    //buttonText: 'Ver Serviços',
    //buttonLink: '/categoria/servicos'
  },*/
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczM_qASed7u0tUaEM0Xbp7WZfLQtA7TKExMAcSjVH6SIP6dFpzLN3HlgIMBFwvvLFTyBPy9_Am4XJpbl-7_c9p1hNM3MREfhuceJWKGY9EVdU-NTCMTaproZVRD_KRfynVkewwd-dQXlweEGuh5YzvoZ=w1218-h748-s-no-gm?authuser=4",
    //title: 'Moda & Estilo',
    //description: 'As melhores lojas e boutiques da cidade em um só lugar',
    // buttonText: 'Ver Lojas',
    //buttonLink: '/categoria/varejo'
  },
  {
    id: 4,
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOX36mhhITU64y4-NO2gUtwja4CrXnLKo8eOV9cd4mPnLKJ52wXx4DhSq0s0v9STDm7e8BqVsdMog2JMc1LPgQ6m78-ehvG8vuZR2aPECVFI9XfKhU4Z8mjH2FStd_UGPuYVJfOJ2j2Ww-nVumfj7uO=w858-h412-s-no-gm?authuser=4",
    //title: 'Cuidados com a Saúde',
    // description: 'Clínicas, farmácias e profissionais da saúde de confiança',
    //buttonText: 'Ver Saúde',
    //buttonLink: '/categoria/saude'
  },
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // Muda slide a cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Reativa o auto-play após 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl shadow-lg group">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/*<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-lg text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-gray-200">
                    {slide.description}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>*/}
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Indicador de auto-play */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-2 h-2 rounded-full ${
            isAutoPlaying ? "bg-green-400" : "bg-gray-400"
          } animate-pulse`}
        />
      </div>
    </div>
  );
};

export default Carousel;
