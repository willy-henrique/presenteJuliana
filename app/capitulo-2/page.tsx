"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"

export default function Capitulo2() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [showText, setShowText] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [lightsOn, setLightsOn] = useState(true)
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

      // Mostra o texto após 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setShowText(true)

      // Mostra o botão após 5 segundos
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

  const goToNextChapter = () => {
    router.push("/capitulo-3")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4 relative overflow-hidden">
      <ParticleBackground type="party" />

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
                  <div className="absolute left-10 bottom-10 transform transition-all duration-1000 ease-in-out animate-slide-left-right">
                    <Image
                      src="/images/personagem-eu.jpg"
                      alt="Eu"
                      width={60}
                      height={110}
                      className="object-contain"
                    />
                  </div>

                  <div className="absolute right-10 bottom-10">
                    <div className="relative">
                      <Image
                        src="/images/personagem-juliana.jpg"
                        alt="Juliana"
                        width={60}
                        height={110}
                        className="object-contain animate-slide-in-right"
                      />
                      {step >= 1 && (
                        <div className="absolute top-10 left-8 w-4 h-4 bg-yellow-300 rounded-full animate-glow"></div>
                      )}
                    </div>
                  </div>
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
            <p className="text-lg italic font-dancing">"Ali, entre tantas pessoas… um olhar me encontrou."</p>
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
