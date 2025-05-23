"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"

export default function Capitulo3() {
  const router = useRouter()
  const [cantadaUsed, setCantadaUsed] = useState(false)
  const [beijoAttempt, setBeijoAttempt] = useState(false)
  const [showFinalOption, setShowFinalOption] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState({
    message: "",
    emoji: "",
  })
  const [showFirstKiss, setShowFirstKiss] = useState(false)

  const handleCantada = () => {
    setCantadaUsed(true)
    setDialogContent({
      message:
        "Nossa eu acho que me afoguei nessa sua beleza, será que a gente não pode da um beijo para eu recuperar meu ar não?",
      emoji: "😍",
    })
    setShowDialog(true)

    // 🔥 Toca a risada depois de 2 segundos
    setTimeout(() => {
      try {
        const audio = new Audio("/sounds/risada.mp3")
        audio.play().catch((error) => {
          console.log("Erro ao reproduzir áudio:", error)
        })
      } catch (error) {
        console.log("Erro ao criar objeto de áudio:", error)
      }
    }, 2000)

    // Mostra a opção final após 2 segundos
    setTimeout(() => {
      setShowFinalOption(true)
    }, 2000)
  }

  const handleBeijo = () => {
    setBeijoAttempt(true)
    setDialogContent({
      message: "Não!",
      emoji: "😜",
    })
    setShowDialog(true)

    // Mostra a opção final após 2 segundos
    setTimeout(() => {
      setShowFinalOption(true)
    }, 2000)
  }

  const handleFinalOption = () => {
    setShowFirstKiss(true)

    // Após a animação do beijo, navega para o próximo capítulo
    setTimeout(() => {
      router.push("/capitulo-4")
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-900 to-purple-900 p-4 relative overflow-hidden">
      <ParticleBackground type="hearts" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-black/70 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pink-500">
          <h1 className="text-2xl font-bold text-pink-400 mb-4 text-center font-dancing">Capítulo 3 - A Cantada</h1>

          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
            <Image
              src="/images/encontro.jpg"
              alt="Encontro"
              fill
              className={cn("object-cover transition-all duration-500", showFirstKiss ? "blur-sm scale-110" : "")}
            />

            {showFirstKiss && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm animate-fade-in">
                  <h3 className="text-white text-xl font-dancing text-center mb-2">Nosso primeiro beijo</h3>
                  <div className="flex justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                      <div className="relative flex items-center justify-center w-full h-full">
                        <span className="text-4xl">💋</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!showFirstKiss && (
            <>
              <p className="text-white mb-6 text-center">
                Nossos olhares se cruzaram. Era hora de tomar uma atitude...
              </p>

              <div className="flex flex-col gap-3 mb-6">
                <Button
                  onClick={handleCantada}
                  disabled={cantadaUsed}
                  className={cn(
                    "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300",
                    cantadaUsed && "opacity-50",
                  )}
                >
                  Soltar a cantada
                </Button>

                <Button
                  onClick={handleBeijo}
                  disabled={beijoAttempt}
                  className={cn(
                    "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300",
                    beijoAttempt && "opacity-50",
                  )}
                >
                  Pedir um beijo
                </Button>

                {showFinalOption && (
                  <Button
                    onClick={handleFinalOption}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 animate-bounce-in"
                  >
                    Juliana me puxou... 💘
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent
          className={cn("border-2", beijoAttempt ? "bg-red-50 border-red-300" : "bg-pink-50 border-pink-300")}
        >
          <DialogDescription
            className={cn(
              "text-center text-xl font-bold flex items-center justify-center gap-2",
              beijoAttempt ? "text-red-600 animate-shake" : "text-pink-600",
            )}
          >
            {dialogContent.message} <span className="text-2xl">{dialogContent.emoji}</span>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
