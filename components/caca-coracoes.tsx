"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

// Posições dos corações escondidos
const heartPositions = [
  { id: 1, x: 10, y: 20, size: 24 },
  { id: 2, x: 80, y: 15, size: 20 },
  { id: 3, x: 40, y: 70, size: 22 },
  { id: 4, x: 85, y: 60, size: 18 },
  { id: 5, x: 20, y: 80, size: 26 },
  { id: 6, x: 60, y: 40, size: 20 },
  { id: 7, x: 30, y: 50, size: 22 },
]

export default function CacaCoracoes() {
  const [foundHearts, setFoundHearts] = useState<number[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [hintActive, setHintActive] = useState(false)

  useEffect(() => {
    // Ativa a dica a cada 5 segundos
    const hintInterval = setInterval(() => {
      setHintActive(true)
      setTimeout(() => {
        setHintActive(false)
      }, 500)
    }, 5000)

    return () => clearInterval(hintInterval)
  }, [])

  const handleHeartClick = (id: number) => {
    if (!foundHearts.includes(id)) {
      const newFoundHearts = [...foundHearts, id]
      setFoundHearts(newFoundHearts)

      // Tenta reproduzir som de coração
      try {
        const audio = new Audio("/sounds/heart-click.mp3")
        audio.play().catch((err) => console.log("Erro ao reproduzir áudio:", err))
      } catch (error) {
        console.log("Erro ao criar objeto de áudio:", error)
      }

      // Verifica se todos os corações foram encontrados
      if (newFoundHearts.length === heartPositions.length) {
        setShowMessage(true)

        // Tenta reproduzir som de batimento cardíaco
        try {
          const heartbeatAudio = new Audio("/sounds/heartbeat.mp3")
          heartbeatAudio.play().catch((err) => console.log("Erro ao reproduzir áudio:", err))
        } catch (error) {
          console.log("Erro ao criar objeto de áudio:", error)
        }
      }
    }
  }

  return (
    <div className="relative h-64 bg-gradient-to-br from-pink-50 to-lavender-50 rounded-lg overflow-hidden shadow-inner">
      {/* Corações escondidos */}
      {heartPositions.map((heart) => (
        <div
          key={heart.id}
          className={cn(
            "absolute cursor-pointer transition-all duration-300",
            foundHearts.includes(heart.id)
              ? "opacity-100 scale-125 z-20"
              : cn("opacity-20 hover:opacity-30 z-10", hintActive && !foundHearts.includes(heart.id) && "opacity-40"),
          )}
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          onClick={() => handleHeartClick(heart.id)}
        >
          <Heart className={cn("text-red-500", foundHearts.includes(heart.id) && "animate-pulse")} size={heart.size} />
        </div>
      ))}

      {/* Contador de corações */}
      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-pink-600 font-medium shadow-sm z-30">
        {foundHearts.length} / {heartPositions.length}
      </div>

      {/* Mensagem quando todos os corações forem encontrados */}
      {showMessage && (
        <div className="absolute inset-0 bg-pink-100/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fade-in z-30">
          <div className="relative">
            <Heart className="text-red-500 animate-pulse mb-4" size={64} />
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 className="text-xl font-bold text-pink-600 text-center mb-2 font-dancing">
            Você encontrou todos os corações!
          </h3>
          <p className="text-pink-600 text-center">
            Assim como você encontrou o meu coração e o conquistou para sempre! ❤️
          </p>
        </div>
      )}
    </div>
  )
}
