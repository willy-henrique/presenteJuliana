"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"
// Defina um contexto de áudio local simples se não houver módulo existente
const audioContext = {
  audio: typeof window !== "undefined" ? new Audio("/audio/background.mp3") : null,
  isPlaying: false,
}
import { Music, MicOffIcon as MusicOff } from "lucide-react"

export default function Capitulo2() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [showText, setShowText] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [lightsOn, setLightsOn] = useState(true)
  const [charactersMoving, setCharactersMoving] = useState(false)
  const [charactersMet, setCharactersMet] = useState(false)
  const [isPlaying, setIsPlaying] = useState(audioContext.isPlaying)
  const lightsInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const sequence = async () => {
      // Inicia a sequência após 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep(1)

      // Inicia o efeito de luzes piscando
      lightsInterval.current = setInterval(() => {
        setLightsOn((prev) => !prev)
      }, 800)

      // Inicia o movimento dos personagens após 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCharactersMoving(true)

      // Os personagens se encontram após 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setCharactersMet(true)

      // Mostra o texto após os personagens se encontrarem
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setShowText(true)

      // Mostra o botão após o texto aparecer
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowButton(true)
    }

    sequence()

    return () => {
      if (lightsInterval.current) {
        clearInterval(lightsInterval.current)
      }
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

  const goToNextChapter = () => {
    router.push("/capitulo-3")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4 relative overflow-hidden">
      <ParticleBackground type="party" />

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

      {/* Luzes da festa */}
      <div
        className={cn(
          "absolute top-10 left-1/4 w-20 h-20 rounded-full bg-pink-500/30 blur-xl transition-opacity duration-300",
          lightsOn ? "opacity-80" : "opacity-30",
        )}
      ></div>
      <div
        className={cn(
          "absolute bottom-20 right-1/4 w-16 h-16 rounded-full bg-blue-500/30 blur-xl transition-opacity duration-300",
          !lightsOn ? "opacity-80" : "opacity-30",
        )}
      ></div>
      <div
        className={cn(
          "absolute top-1/3 right-1/5 w-12 h-12 rounded-full bg-purple-500/30 blur-xl transition-opacity duration-300",
          lightsOn ? "opacity-80" : "opacity-30",
        )}
      ></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-black/70 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-purple-500">
          <h1 className="text-2xl font-bold text-pink-400 mb-4 text-center font-dancing">
            Capítulo 2 - A Festa no Fluxo de Goiânia
          </h1>

          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
            <Image src="/images/festa.jpg" alt="Festa" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {step >= 1 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Personagem Willy (eu) */}
                  <div
                    className={cn(
                      "absolute bottom-10 transition-all duration-3000 ease-in-out",
                      charactersMoving
                        ? charactersMet
                          ? "left-1/2 transform -translate-x-16" // Posição final próxima ao centro
                          : "left-1/3 transform -translate-x-8" // Posição intermediária
                        : "left-10", // Posição inicial
                    )}
                  >
                    <Image
                      src="/images/personagem-eu.jpg"
                      alt="Eu"
                      width={80}
                      height={150}
                      className="object-contain"
                    />
                  </div>

                  {/* Personagem Juliana */}
                  <div
                    className={cn(
                      "absolute bottom-10 transition-all duration-3000 ease-in-out",
                      charactersMoving
                        ? charactersMet
                          ? "right-1/2 transform translate-x-16" // Posição final próxima ao centro
                          : "right-1/3 transform translate-x-8" // Posição intermediária
                        : "right-10", // Posição inicial
                    )}
                  >
                    <Image
                      src="/images/personagem-juliana.jpg"
                      alt="Juliana"
                      width={80}
                      height={150}
                      className="object-contain animate-slide-in-right"
                    />
                  </div>

                  {/* Efeito de brilho quando se encontram */}
                  {charactersMet && (
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-pink-400/60 rounded-full animate-pulse blur-sm"></div>
                      <div className="absolute inset-0 w-8 h-8 bg-white/40 rounded-full animate-ping"></div>
                    </div>
                  )}

                  {/* Corações flutuando quando se encontram */}
                  {charactersMet && (
                    <>
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-4 text-red-400 text-lg animate-float">
                        💕
                      </div>
                      <div
                        className="absolute bottom-24 left-1/2 transform translate-x-2 text-pink-400 text-sm animate-float"
                        style={{ animationDelay: "0.5s" }}
                      >
                        ✨
                      </div>
                      <div
                        className="absolute bottom-18 left-1/2 transform -translate-x-6 text-red-300 text-xs animate-float"
                        style={{ animationDelay: "1s" }}
                      >
                        💖
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className={cn(
              "text-white text-center mb-6 transition-all duration-1000",
              showText ? "opacity-100" : "opacity-0",
            )}
          >
            <p className="text-lg italic font-dancing">
              {charactersMet
                ? "Ali, entre tantas pessoas… nossos olhares se encontraram e o mundo parou."
                : "Ali, entre tantas pessoas… um olhar me encontrou."}
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={goToNextChapter}
              className={cn(
                "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105",
                showButton ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4",
              )}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
