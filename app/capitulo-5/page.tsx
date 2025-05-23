"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleBackground from "@/components/particle-background"

// Fotos do casal
const photos = [
  { id: 1, src: "/photos/foto1.jpg", alt: "Nós juntos" },
  { id: 2, src: "/photos/foto2.jpg", alt: "Momento especial" },
  { id: 3, src: "/photos/foto3.jpg", alt: "Nosso passeio" },
  { id: 4, src: "/photos/foto4.jpg", alt: "Aniversário" },
  { id: 5, src: "/photos/foto5.jpg", alt: "Viagem juntos" },
  { id: 6, src: "/photos/foto6.jpg", alt: "Momentos felizes" },
  { id: 7, src: "/photos/foto7.jpg", alt: "Nosso amor" },
  { id: 8, src: "/photos/foto8.jpg", alt: "Dia especial" },
  { id: 9, src: "/photos/foto9.jpg", alt: "Juntos" },
]

export default function Galeria() {
  const router = useRouter()
  const [page, setPage] = useState(0)

  const nextPage = () => {
    if (page < Math.ceil(photos.length / 2) - 1) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const goToGames = () => {
    router.push("/jogos")
  }

  const getPhotosForPage = (pageIndex: number) => {
    const startIndex = pageIndex * 2
    return photos.slice(startIndex, startIndex + 2)
  }

  const currentPhotos = getPhotosForPage(page)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-lavender-100 to-pink-100 p-4 relative overflow-hidden">
      <ParticleBackground type="bubbles" />

      <div className="container mx-auto max-w-4xl z-10">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center font-dancing">
          Nosso Livro de Memórias
        </h1>

        <div className="relative w-full max-w-md aspect-[3/4] mx-auto bg-white rounded-xl shadow-2xl border border-pink-200 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="absolute inset-0 grid grid-cols-2"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {currentPhotos.map((photo) => (
                <div key={photo.id} className="relative border-r last:border-r-0 border-pink-200">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black/60 text-white text-center text-xs p-1">
                    {photo.alt}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navegação */}
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPage}
              disabled={page === 0}
              className="rounded-full bg-white/80 hover:bg-white/90 shadow-md"
            >
              <ChevronLeft className="h-5 w-5 text-pink-500" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPage}
              disabled={page >= Math.ceil(photos.length / 2) - 1}
              className="rounded-full bg-white/80 hover:bg-white/90 shadow-md"
            >
              <ChevronRight className="h-5 w-5 text-pink-500" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={goToGames}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Vamos jogar?
          </Button>
        </div>
      </div>
    </div>
  )
}
