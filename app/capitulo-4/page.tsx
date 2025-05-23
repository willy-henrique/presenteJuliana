"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"

export default function Capitulo4() {
  const router = useRouter()
  const [showButton, setShowButton] = useState(false)
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 0 })
  const [ballDirection, setBallDirection] = useState(1)
  const [ballClicked, setBallClicked] = useState(false)
  const animationRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mostra o botão após 3 segundos
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 3000)

    // Inicia a animação da bola
    startBallAnimation()

    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const startBallAnimation = () => {
    let y = 0
    let velocity = 2
    const gravity = 0.2
    const bounce = 0.8
    let direction = 1

    const animate = () => {
      // Aplica gravidade
      velocity += gravity
      y += velocity

      // Verifica colisão com o "chão"
      if (y > 70) {
        y = 70
        velocity = -velocity * bounce
      }

      // Movimento horizontal
      const newX = ballPosition.x + direction * 0.5
      if (newX > 80 || newX < 20) {
        direction *= -1
      }

      setBallPosition({ x: newX, y })
      setBallDirection(direction)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const handleBallClick = () => {
    setBallClicked(true)

    // Tenta reproduzir som de bola quicando
    try {
      const audio = new Audio("/sounds/bola-quicando.mp3")
      audio.play().catch((err) => console.log("Erro ao reproduzir áudio:", err))
    } catch (error) {
      console.log("Erro ao criar objeto de áudio:", error)
    }

    // Adiciona um impulso à bola
    const newVelocity = -8
    let y = ballPosition.y
    let velocity = newVelocity
    const gravity = 0.2
    const bounce = 0.8
    let direction = ballDirection

    // Cancela a animação atual
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    // Inicia uma nova animação com impulso
    const animate = () => {
      velocity += gravity
      y += velocity

      if (y > 70) {
        y = 70
        velocity = -velocity * bounce
      }

      const newX = ballPosition.x + direction * 0.5
      if (newX > 80 || newX < 20) {
        direction *= -1
      }

      setBallPosition({ x: newX, y })
      setBallDirection(direction)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Remove o efeito de clique após 300ms
    setTimeout(() => {
      setBallClicked(false)
    }, 300)
  }

  const goToNextChapter = () => {
    router.push("/capitulo-5")
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-green-100 p-4 relative overflow-hidden"
      ref={containerRef}
    >
      <ParticleBackground type="sparkles" />

      {/* Efeito de vento na rede */}
      <div className="absolute left-1/4 top-1/3 w-1/2 h-1 bg-white/30 animate-pulse-slow"></div>
      <div
        className="absolute left-1/4 top-1/3 w-1/2 h-px bg-white/50 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute left-1/4 top-1/3 w-1/2 h-px bg-white/40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-blue-300">
          <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center font-dancing">
            Capítulo 4 - Nosso Primeiro Encontro: Jogando Vôlei
          </h1>

          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg bg-gradient-to-b from-blue-200 to-green-200">
            {/* Céu e grama */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300/30 to-green-300/30"></div>

            {/* Rede de vôlei */}
            <div className="absolute left-0 right-0 top-1/3 h-16 border-t-2 border-dashed border-white/70"></div>
            <div className="absolute left-1/2 top-1/4 bottom-1/4 w-px bg-white/70 transform -translate-x-1/2"></div>

            {/* Bola de vôlei animada */}
            <div
              className={cn(
                "absolute w-12 h-12 rounded-full bg-white border-2 border-gray-300 cursor-pointer transition-transform",
                ballClicked && "scale-90",
              )}
              style={{
                left: `${ballPosition.x}%`,
                top: `${ballPosition.y}%`,
                backgroundImage: "radial-gradient(circle at 30% 30%, white 60%, #f0f0f0 70%)",
                transform: `rotate(${ballDirection > 0 ? ballPosition.y * 2 : -ballPosition.y * 2}deg)${ballClicked ? " scale(0.9)" : ""}`,
              }}
              onClick={handleBallClick}
            >
              <div
                className="absolute inset-0 border-2 border-gray-300 rounded-full"
                style={{ borderTopColor: "transparent", borderLeftColor: "transparent", transform: "rotate(45deg)" }}
              ></div>
              <div
                className="absolute inset-0 border-2 border-gray-300 rounded-full"
                style={{ borderTopColor: "transparent", borderRightColor: "transparent", transform: "rotate(-45deg)" }}
              ></div>
            </div>

            {/* Foto do encontro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 h-32 rounded-lg overflow-hidden shadow-lg border-2 border-blue-300">
                <Image
                  src="/images/fotovolei.jpg"
                  alt="Foto do nosso primeiro encontro jogando vôlei"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-700 italic font-dancing text-lg">
              "Nosso primeiro encontro foi especial… jogando vôlei, conversando, rindo e nos conhecendo de verdade."
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={goToNextChapter}
              className={cn(
                "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105",
                showButton ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4",
              )}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>

      {/* Efeitos adicionais */}
      <div className="absolute bottom-10 left-10 w-4 h-4 bg-yellow-300/30 rounded-full animate-float"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-pink-300/30 rounded-full animate-float-delayed"></div>
    </div>
  )
}
