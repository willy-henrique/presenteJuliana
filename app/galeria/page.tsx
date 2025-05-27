"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleBackground from "@/components/particle-background"

const chapters = [
  {
    id: 1,
    title: "Nossos Primeiros Momentos",
    photos: [
      { src: "/images/encontro.jpg", alt: "Nosso primeiro encontro" },
      { src: "/images/festa.jpg", alt: "Nosso momento especial" },
    ],
    text: "Cada foto guarda uma memória, cada olhar conta uma história. Esses são os registros dos primeiros momentos em que descobrimos o quanto éramos especiais um para o outro.",
  },
  {
    id: 2,
    title: "Risadas Compartilhadas",
    photos: [
      { src: "/images/fotovolei.jpg", alt: "Jogando Vôlei" },
      { src: "/images/encontro.jpg", alt: "Mais risadas juntos" },
    ],
    text: "Se tem algo que marcou nosso começo foram as risadas que ecoavam quando estávamos juntos. Até nos momentos mais simples, você conseguia tornar tudo especial.",
  },
  {
    id: 3,
    title: "Eternidade em Fotos",
    photos: [
      { src: "/images/personagem-eu.jpg", alt: "Eu te observando" },
      { src: "/images/bebedouro.jpg", alt: "Nosso lugar especial" },
    ],
    text: "Essas fotos são mais que imagens, são promessas de um amor que queremos viver todos os dias. Cada frame guarda a essência do que somos juntos.",
  },
]

export default function LivroDeAmor() {
  const router = useRouter()
  const [currentChapter, setCurrentChapter] = useState(0)

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const goToSurprise = () => {
    router.push("/mensagem-final")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 to-pink-100 p-4 relative overflow-hidden">
      <ParticleBackground type="hearts" />

      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-rose-600 mb-2 font-dancing">
            Willy e Juliana
          </h1>
          <p className="text-pink-500 italic">Nossa história em capítulos</p>
        </motion.div>

        <div className="relative w-full max-w-3xl aspect-[3/2] mx-auto bg-white rounded-xl shadow-2xl border-4 border-rose-200 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapters[currentChapter].id}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {chapters[currentChapter].photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative border-b md:border-b-0 md:border-r last:border-0 border-pink-200 h-full"
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

          {/* Texto do capítulo fixo na parte de baixo */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 rounded-t-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold text-rose-600 mb-1 text-center">
              {chapters[currentChapter].title}
            </h2>
            <p className="text-gray-700 text-sm text-center">
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

        {/* Indicador de capítulos */}
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

        {/* Botão para surpresa */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={goToSurprise}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <Heart className="h-5 w-5" fill="currentColor" />
            <span>A carta.</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
