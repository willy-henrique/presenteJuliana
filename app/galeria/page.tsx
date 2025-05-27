"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/particle-background";

// Dados das páginas da galeria
const chapters = [
  {
    id: 1,
    title: "Página 1 e 2",
    photos: [
      { src: "/photos/foto1.jpg", alt: "Foto 1" },
      { src: "/photos/foto2.jpg", alt: "Foto 2" },
    ],
    text: "Cada momento é um capítulo da nossa história, cheio de amor e carinho.",
  },
  {
    id: 2,
    title: "Página 3 e 4",
    photos: [
      { src: "/photos/foto3.jpg", alt: "Foto 3" },
      { src: "/photos/foto4.jpg", alt: "Foto 4" },
    ],
    text: "Sorrisos, aventuras e cumplicidade... Cada clique é um pedaço da nossa história!",
  },
  {
    id: 3,
    title: "Página 5 e 6",
    photos: [
      { src: "/photos/foto5.jpg", alt: "Foto 5" },
      { src: "/photos/foto6.jpg", alt: "Foto 6" },
    ],
    text: "A cada olhar, um carinho. A cada abraço, um universo inteiro só nosso.",
  },
  {
    id: 4,
    title: "Página 7 e 8",
    photos: [
      { src: "/photos/foto7.jpg", alt: "Foto 7" },
      { src: "/photos/foto8.jpg", alt: "Foto 8" },
    ],
    text: "Juntos somos mais fortes, mais felizes e completos. ❤️",
  },
  {
    id: 5,
    title: "Página 9",
    photos: [
      { src: "/photos/foto9.jpg", alt: "Foto 9" },
      { src: "/photos/foto1.jpg", alt: "Foto 1 (Repetida para completar)" },
    ],
    text: "Promessa de amor eterno, construindo memórias para a vida inteira.",
  },
];

export default function Galeria() {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const goToJogos = () => {
    router.push("/jogos");
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Lógica de som pode ser implementada aqui
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 to-pink-100 p-4 relative overflow-hidden">
      <ParticleBackground type="hearts" />

      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <div />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-rose-600 font-dancing">
            Willy e Juliana
          </h1>
          <p className="text-pink-500 italic">
            Nossa Galeria em um Livro de Amor
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMusic}
          className="rounded-full bg-white/80 hover:bg-white/90 shadow-md"
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5 text-pink-500" />
          ) : (
            <VolumeX className="h-5 w-5 text-pink-500" />
          )}
        </Button>
      </div>

      {/* Livro */}
      <div
        className="relative w-full mx-auto bg-white rounded-xl shadow-2xl border-4 border-rose-200 overflow-hidden
        aspect-[4/5] md:aspect-[3/2] max-w-[500px] md:max-w-5xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={chapters[currentChapter].id}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {chapters[currentChapter].photos.map((photo, index) => (
              <div
                key={index}
                className="relative border-b md:border-b-0 md:border-r last:border-0 border-pink-200"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-xs p-1">
                  {photo.alt}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Texto na parte inferior */}
        <div className="absolute bottom-2 left-4 right-4 bg-white/70 backdrop-blur-md rounded-xl p-2 shadow-md">
          <h2 className="text-sm md:text-lg font-semibold text-rose-600 text-center">
            {chapters[currentChapter].title}
          </h2>
          <p className="text-gray-700 text-[10px] md:text-sm text-center">
            {chapters[currentChapter].text}
          </p>
        </div>

        {/* Navegação */}
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevChapter}
            disabled={currentChapter === 0}
            className="rounded-full bg-white/80 hover:bg-white/90 shadow-md"
          >
            <ChevronLeft className="h-5 w-5 text-rose-500" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextChapter}
            disabled={currentChapter >= chapters.length - 1}
            className="rounded-full bg-white/80 hover:bg-white/90 shadow-md"
          >
            <ChevronRight className="h-5 w-5 text-rose-500" />
          </Button>
        </div>
      </div>

      {/* Indicadores de página */}
      <div className="flex justify-center mt-4 gap-2">
        {chapters.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentChapter(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentChapter === index
                ? "bg-rose-600 scale-125"
                : "bg-pink-300"
            }`}
          />
        ))}
      </div>

      {/* Botão para Jogos */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={goToJogos}
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <Heart className="h-5 w-5" fill="currentColor" />
          <span>Ir para Jogos</span>
        </Button>
      </div>
    </div>
  );
}
