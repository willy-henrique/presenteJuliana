"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Gamepad2, Music, VolumeX, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/particle-background";
import Confetti from "react-confetti";

type Chapter = {
  id: number;
  title: string;
  photos: string[];
  text: string;
  bgColor?: string;
};

const chapters: Chapter[] = [
  {
    id: 1,
    title: "Nosso Primeiro Encontro",
    photos: ["/photos/foto3.jpg", "/photos/foto4.jpg"],
    text: "O dia em que nossos olhares se cruzaram e o mundo parou. Cada momento desde então tem sido uma página escrita com amor e carinho.",
    bgColor: "bg-gradient-to-br from-rose-100 to-pink-100"
  },
  {
    id: 2,
    title: "Nossas Primeiras Aventuras",
    photos: ["/photos/foto1.jpg", "/photos/foto2.jpg"],
    text: "Descobrindo o mundo juntos, nossos sorrisos e olhares constroem os capítulos mais felizes dessa história.",
    bgColor: "bg-gradient-to-br from-blue-50 to-purple-50"
  },
  {
    id: 3,
    title: "Momentos Especiais",
    photos: ["/photos/foto5.jpg", "/photos/foto6.jpg"],
    text: "Nos pequenos gestos e nas grandes conquistas, cada instante ao seu lado se torna eterno.",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
  },
  {
    id: 4,
    title: "Amor em Crescimento",
    photos: ["/photos/foto7.jpg", "/photos/foto8.jpg"],
    text: "A cada abraço, uma certeza: somos feitos um para o outro. Nosso amor cresce mais forte a cada dia.",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50"
  },
  {
    id: 5,
    title: "Para Sempre Juntos",
    photos: ["/photos/foto9.jpg", "/photos/foto10.jpg"],
    text: "Prometo escrever ao seu lado os capítulos mais lindos da vida, até que as páginas do tempo se esgotem. Te amo infinitamente. ❤️",
    bgColor: "bg-gradient-to-br from-purple-100 to-pink-200"
  },
];

export default function Livro() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  // Efeito para carregar a música
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/music/background-music.mp3");
      audioRef.current.loop = true;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const next = () => {
    if (current < chapters.length - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrent(current + 1);
        setIsFlipping(false);
        if (current + 1 === chapters.length - 1) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }, 600);
    }
  };

  const prev = () => {
    if (current > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrent(current - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Erro ao reproduzir música:", e));
    }
  };

  const goToGames = () => {
    router.push("/jogos");
  };

  const goToChapter = (index: number) => {
    if (index !== current) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrent(index);
        setIsFlipping(false);
        if (index === chapters.length - 1) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }, 600);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden ${chapters[current].bgColor} transition-colors duration-500`}>
      {/* Efeitos de fundo */}
      <ParticleBackground type="hearts" />
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      {/* Cabeçalho */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center w-full max-w-6xl mb-4 md:mb-8"
      >
        <div />
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-rose-600 font-dancing animate-glow">
            Livro do Nosso Amor
          </h1>
          <p className="text-pink-500 italic text-sm md:text-base mt-1">
            Cada página, um pedaço da nossa história
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMusic}
          className="rounded-full bg-white/80 hover:bg-white/90 shadow-md hover:scale-110 transition-transform"
          aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        >
          {isPlaying ? (
            <Music className="h-5 w-5 text-pink-500 animate-pulse" />
          ) : (
            <VolumeX className="h-5 w-5 text-pink-500" />
          )}
        </Button>
      </motion.div>

      {/* Livro */}
      <div className="relative w-full max-w-md md:max-w-2xl lg:max-w-4xl h-[70vh] perspective-1000">
        <motion.div
          ref={bookRef}
          className={`relative w-full h-full bg-white rounded-xl shadow-2xl border-8 border-rose-100 overflow-hidden preserve-3d transition-all duration-500 ${isFlipping ? "rotate-y-180" : ""}`}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipping ? 180 : 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={chapters[current].id}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
              initial={{ opacity: 0, x: current === 0 ? 0 : (isFlipping ? -100 : 100) }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isFlipping ? 100 : -100 }}
              transition={{ duration: 0.6 }}
            >
              {chapters[current].photos.map((photo, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden ${index === 0 ? 'border-r-0 md:border-r border-pink-200' : ''}`}
                >
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1} do capítulo ${chapters[current].title}`}
                    fill
                    className="object-cover"
                    priority={current === 0 && index === 0}
                  />
                  {/* Efeito de brilho nas fotos */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Rodapé da página */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-rose-600 font-dancing text-center">
              {chapters[current].title}
            </h2>
            <p className="text-gray-700 text-sm md:text-base text-center mt-2">
              {chapters[current].text}
            </p>
          </motion.div>

          {/* Marcador de página */}
          <div className="absolute top-1/2 right-0 w-8 h-16 bg-rose-500/80 transform -translate-y-1/2 translate-x-1/2 rounded-r-lg shadow-md flex items-center justify-center">
            <Heart className="h-5 w-5 text-white animate-pulse" />
          </div>
        </motion.div>

        {/* Controles de navegação */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prev}
          disabled={current === 0}
          className="absolute top-1/2 left-2 md:-left-12 transform -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-transform"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-6 w-6 text-rose-500" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={next}
          disabled={current === chapters.length - 1}
          className="absolute top-1/2 right-2 md:-right-12 transform -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-transform"
          aria-label="Próxima página"
        >
          <ChevronRight className="h-6 w-6 text-rose-500" />
        </Button>
      </div>

      {/* Indicadores de página */}
      <div className="flex justify-center mt-6 gap-2">
        {chapters.map((_, index) => (
          <button
            key={index}
            onClick={() => goToChapter(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 relative ${current === index ? "bg-rose-600 scale-125" : "bg-pink-300 hover:bg-pink-400"}`}
            aria-label={`Ir para o capítulo ${index + 1}`}
          >
            {current === index && (
              <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-75" />
            )}
          </button>
        ))}
      </div>

      {/* Botão de ação */}
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={goToGames}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full shadow-xl text-base md:text-lg flex items-center gap-2 group animate-float"
        >
          <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Ir para Jogos</span>
          <Sparkles className="w-4 h-4 ml-1 animate-sparkle" />
        </Button>
      </motion.div>

      {/* Nota romântica */}
      <motion.div 
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md max-w-xs text-sm italic text-pink-600 hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Heart className="h-4 w-4 inline mr-1 text-rose-500" />
        Nossa história é meu conto de fadas favorito.
      </motion.div>
    </div>
  );
}