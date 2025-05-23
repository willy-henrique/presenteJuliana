"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Heart, Music, MicOffIcon as MusicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import TypewriterEffect from "@/components/typewriter-effect"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"

// Removed stray ThemeProvider usage that caused the error



export default function WelcomePage() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [showButton, setShowButton] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Inicializa o áudio com tratamento de erro
    try {
      const audioElement = new Audio("/music/background-music.mp3")
      audioElement.loop = true
      audioElement.volume = 0.5

      // Adiciona um listener para tratar erros de carregamento
      audioElement.addEventListener("error", (e) => {
        console.log("Erro ao carregar o áudio de fundo:", e)
        // Continua sem o áudio
      })

      audioRef.current = audioElement
      setAudio(audioElement)

      // Mostra o botão após a animação de digitação
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 5000)

      setLoaded(true)

      return () => {
        if (audioElement) {
          audioElement.pause()
        }
        clearTimeout(timer)
      }
    } catch (error) {
      console.log("Erro ao criar objeto de áudio:", error)
      // Continua sem o áudio
      setLoaded(true)
    }
  }, [])

  const toggleMusic = () => {
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audio.play()

        // Trata a promise retornada por play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.log("Erro ao reproduzir áudio de fundo:", error)
              // Não altera o estado se houver erro
            })
        }
      }
    } catch (error) {
      console.log("Erro ao controlar áudio:", error)
    }
  }

  const startJourney = () => {
    router.push("/capitulo-1")
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-lavender-100">
        <Heart className="h-12 w-12 text-pink-500 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-lavender-100 p-4 relative overflow-hidden">
      <ParticleBackground type="hearts" />

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMusic}
          className="rounded-full bg-white/80 hover:bg-white/90 shadow-md"
        >
          {isPlaying ? <MusicOff className="h-5 w-5 text-pink-500" /> : <Music className="h-5 w-5 text-pink-500" />}
        </Button>
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <Heart className="h-12 w-12 text-red-500 animate-pulse" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 font-dancing">Feliz Aniversário, Juliana!</h1>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pink-200">
          <TypewriterEffect
            text="Prepare-se para uma viagem no tempo… com muito amor, diversão e surpresas 💘"
            speed={50}
          />

          <div
            className={cn(
              "mt-8 transition-all duration-1000 ease-in-out",
              showButton ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4",
            )}
          >
            <Button
              onClick={startJourney}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Começar nossa história
            </Button>
          </div>
        </div>

        <div className="text-sm text-pink-700 mt-4 animate-fade-in font-dancing text-lg">
          Um presente especial para você ❤️
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-pink-200/50 to-transparent" />
    </div>
  )
}
