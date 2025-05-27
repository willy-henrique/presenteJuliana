"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Music, MicOffIcon as MusicOff } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"
// Simple audio context singleton for background music control
const audioContext = {
  audio: typeof window !== "undefined" ? new Audio("/sounds/background.mp3") : null,
  isPlaying: false,
}

export default function Capitulo5() {
  const router = useRouter()
  const [heartbeat, setHeartbeat] = useState(false)
  const [heartScale, setHeartScale] = useState(1)
  const [showDate, setShowDate] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showKiss, setShowKiss] = useState(false)
  const [enrolarButtonPosition, setEnrolarButtonPosition] = useState({ x: 0, y: 0 })
  const [enrolarAttempts, setEnrolarAttempts] = useState(0)
  const [isPlaying, setIsPlaying] = useState(audioContext.isPlaying)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null)
  const heartScaleInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Detecta se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Inicia a animação de batimento cardíaco
    heartbeatInterval.current = setInterval(() => {
      setHeartbeat((prev) => !prev)
    }, 500)

    // Inicia a animação de escala do coração
    heartScaleInterval.current = setInterval(() => {
      setHeartScale((prev) => (prev === 1 ? 1.3 : 1))
    }, 500)

    // Mostra os botões após 2 segundos
    const buttonTimer = setTimeout(() => {
      setShowButton(true)
      // Posiciona o botão "Enrolar mais..." inicialmente
      if (containerRef.current) {
        moveEnrolarButton()
      }
    }, 2000)

    return () => {
      if (heartbeatInterval.current) clearInterval(heartbeatInterval.current)
      if (heartScaleInterval.current) clearInterval(heartScaleInterval.current)
      clearTimeout(buttonTimer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleMusic = () => {
    if (!audioContext.audio) return

    try {
      if (isPlaying) {
        audioContext.audio.pause()
        setIsPlaying(false)
        audioContext.isPlaying = false
      } else {
        const playPromise = audioContext.audio.play()

        // Trata a promise retornada por play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              audioContext.isPlaying = true
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

  const moveEnrolarButton = () => {
    if (!containerRef.current) return

    const container = containerRef.current.querySelector(".button-container")
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const buttonWidth = isMobile ? 120 : 150 // Largura menor para mobile
    const buttonHeight = 40

    // Gera uma posição aleatória dentro do container
    const maxX = Math.max(0, containerRect.width - buttonWidth)
    const maxY = Math.max(0, containerRect.height - buttonHeight)

    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)

    setEnrolarButtonPosition({ x: randomX, y: randomY })
  }

  const handleEnrolarHover = () => {
    setEnrolarAttempts((prev) => prev + 1)

    // No mobile, adiciona um pequeno delay antes de mover
    if (isMobile) {
      setTimeout(() => {
        moveEnrolarButton()
      }, 100)
    } else {
      moveEnrolarButton()
    }
  }

  const handleEnrolarClick = () => {
    // No mobile, permite alguns cliques antes de mover
    if (isMobile && enrolarAttempts < 3) {
      setEnrolarAttempts((prev) => prev + 1)
      return
    }
    handleEnrolarHover()
  }

  const handleAssumirClick = () => {
    setShowKiss(true)

    // Tenta reproduzir som romântico
    try {
      const audio = new Audio("/sounds/kiss.mp3")
      audio.play().catch((err) => console.log("Erro ao reproduzir áudio:", err))
    } catch (error) {
      console.log("Erro ao criar objeto de áudio:", error)
    }

    // Mostra a data após a animação do beijo
    setTimeout(() => {
      setShowDate(true)
    }, 1500)

    // Navega para o próximo capítulo após alguns segundos
    setTimeout(() => {
      router.push("/capitulo-6")
    }, 5000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden">
      <ParticleBackground type="sparkles" />

      {/* Efeitos de fundo decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-pink-200/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-200/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMusic}
          className="rounded-full bg-white/80 hover:bg-white/90 shadow-lg backdrop-blur-sm border border-white/20"
        >
          {isPlaying ? <MusicOff className="h-5 w-5 text-pink-500" /> : <Music className="h-5 w-5 text-pink-500" />}
        </Button>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/30 relative overflow-hidden">
          {/* Brilho sutil no fundo do card */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-blue-100/30 rounded-2xl"></div>

          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-6 text-center font-dancing">
              Capítulo 5 - O Ultimato no Bebedouro
            </h1>

            <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl shadow-lg">
              <Image src="/images/bebedouro.jpg" alt="Bebedouro" fill className="object-cover" />

              {!showKiss ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-black/60 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                    <p className="text-white text-lg md:text-xl font-bold font-dancing leading-relaxed">
                      "Eai Willy, vai ficar me enrolando até quando?"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white text-xl mb-4 font-dancing">O nosso primeiro beijo foi</div>
                    <div className="relative">
                      <Heart className="text-red-400 mx-auto animate-pulse" size={64} />
                      <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showDate ? (
              <div className="text-center mb-6 animate-fade-in">
                <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl text-xl font-bold animate-sparkle shadow-xl">
                  09 de Agosto de 2024
                </div>
                <p className="text-pink-600 mt-3 font-dancing text-lg">O dia do nosso primeiro beijo</p>
              </div>
            ) : showKiss ? (
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Heart
                    className={cn("text-red-500 transition-all duration-300", heartbeat ? "opacity-100" : "opacity-80")}
                    style={{ transform: `scale(${heartScale})` }}
                    size={64}
                  />
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            ) : (
              <div className="relative mb-6">
                {showButton && (
                  <div className="space-y-4">
                    {/* Botão principal - sempre visível e centralizado */}
                    <div className="flex justify-center">
                      <Button
                        onClick={handleAssumirClick}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 font-medium z-20 relative"
                      >
                        Resposta do Willy: Assumir o crush ❤️
                      </Button>
                    </div>

                    {/* Container para o botão que foge */}
                    <div className="button-container relative h-32 bg-gradient-to-br from-gray-50/50 to-gray-100/50 rounded-xl border border-gray-200/50 overflow-hidden">
  <Button
    onMouseEnter={!isMobile ? handleEnrolarHover : undefined}
    onClick={handleEnrolarClick}
    style={{
      position: "absolute",
      left: `${enrolarButtonPosition.x}px`,
      top: `${enrolarButtonPosition.y}px`,
      transition: "all 0.3s ease-in-out",
    }}
    variant="outline"
    size={isMobile ? "sm" : "default"}
    className={cn(
      "border-gray-300 text-gray-600 hover:bg-gray-50 bg-white/80 backdrop-blur-sm shadow-md z-10 text-xs md:text-sm",
      "animate-bounce"
    )}
  >
    Enrolar mais...
  </Button>

  {/* Mensagem divertida no mobile */}
  {isMobile && enrolarAttempts === 0 && (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <p className="text-gray-400 text-xs text-center px-4">
        Toque no botão "Enrolar mais..." e tente me pegar! 😏
      </p>
    </div>
  )}
</div>

                    {/* Contador de tentativas */}
                    {enrolarAttempts > 0 && (
                      <div className="text-center">
                        <p className="text-pink-500 text-sm font-dancing">Tentativas de fuga: {enrolarAttempts} 😄</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Efeito de água pingando */}
      <div className="absolute top-10 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce opacity-70"></div>
      <div
        className="absolute top-20 right-1/3 w-1 h-1 bg-blue-300/60 rounded-full animate-bounce opacity-50"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  )
}
