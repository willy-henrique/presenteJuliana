"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function BotaoFoge() {
  const [showResult, setShowResult] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noButtonVisible, setNoButtonVisible] = useState(true)
  const [escapeCount, setEscapeCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Reposiciona o botão "Não" quando o componente é montado
    if (containerRef.current) {
      handleNoHover()
    }
  }, [])

  const handleYesClick = () => {
    setShowResult(true)

    // Tenta reproduzir som de coração
    try {
      const audio = new Audio("/sounds/heartbeat.mp3")
      audio.play().catch((err) => console.log("Erro ao reproduzir áudio:", err))
    } catch (error) {
      console.log("Erro ao criar objeto de áudio:", error)
    }
  }

  const handleNoHover = () => {
    if (!containerRef.current || !noButtonRef.current) return

    setEscapeCount((prev) => prev + 1)

    // A cada 3 tentativas, faz o botão desaparecer brevemente
    if (escapeCount % 3 === 2) {
      setNoButtonVisible(false)
      setTimeout(() => {
        setNoButtonVisible(true)
        moveButtonToRandomPosition()
      }, 500)
      return
    }

    moveButtonToRandomPosition()
  }

  const moveButtonToRandomPosition = () => {
    if (!containerRef.current || !noButtonRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const buttonRect = noButtonRef.current.getBoundingClientRect()

    // Gera uma posição aleatória dentro do container
    const maxX = containerRect.width - buttonRect.width
    const maxY = containerRect.height - buttonRect.height

    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)

    setNoButtonPosition({ x: randomX, y: randomY })
  }

  return (
    <div
      ref={containerRef}
      className="relative h-64 bg-gradient-to-br from-pink-50 to-lavender-50 rounded-lg p-6 shadow-inner overflow-hidden"
    >
      {!showResult ? (
        <>
          <h3 className="text-xl font-bold text-pink-600 text-center mb-8 font-dancing">Você me ama?</h3>

          <div className="flex justify-center">
            <Button
              onClick={handleYesClick}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sim
            </Button>
          </div>

          <Button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={{
              position: "absolute",
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: "all 0.2s ease-out",
              opacity: noButtonVisible ? 1 : 0,
            }}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            Não
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full space-y-4 animate-fade-in">
          <div className="relative">
            <Heart className="text-red-500 animate-pulse" size={64} />
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 className="text-xl font-bold text-pink-600 text-center font-dancing">Eu também te amo muito! ❤️</h3>
          <div className="text-center">
            <p className="text-pink-500">Você é o amor da minha vida!</p>
          </div>
        </div>
      )}
    </div>
  )
}
