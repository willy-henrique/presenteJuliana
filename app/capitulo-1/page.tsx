"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function Capitulo1() {
  const router = useRouter()
  const [showDialog, setShowDialog] = useState(false)
  const [dialogStep, setDialogStep] = useState(0)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [animateObjects, setAnimateObjects] = useState(false)

  const dialogContent = [
    {
      title: "Ana Beatriz",
      message: "Ei, vamos sair hoje! Tem uma festa incrível no Fluxo de Goiânia!",
      emoji: "🎉",
    },
    {
      title: "Ana Beatriz",
      message: "Ah, não seja chato! Vai ser divertido, prometo!",
      emoji: "😜",
    },
    {
      title: "Ana Beatriz",
      message:
        "Olha, eu não aceito não como resposta. Você PRECISA ir! Tem alguém especial que você precisa conhecer...",
      emoji: "😏",
    },
  ]

  useEffect(() => {
    // Inicia a animação dos objetos após um pequeno delay
    const timer = setTimeout(() => {
      setAnimateObjects(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefuse = () => {
    setButtonClicked(true)
    setTimeout(() => {
      setShowDialog(true)
    }, 500)
  }

  const handleNextDialog = () => {
    if (dialogStep < dialogContent.length - 1) {
      setDialogStep(dialogStep + 1)
    } else {
      setShowDialog(false)
      router.push("/capitulo-2")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Objetos animados do quarto */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-300/70 rounded-full animate-pulse-slow opacity-70"></div>
      <div
        className={cn(
          "absolute top-20 right-20 w-12 h-16 bg-blue-200/50 rounded-md transition-all duration-1000",
          animateObjects ? "transform translate-y-2" : "",
        )}
      ></div>
      <div
        className={cn(
          "absolute bottom-20 left-1/4 w-10 h-10 border-2 border-pink-300/50 rounded-full transition-all duration-2000",
          animateObjects ? "transform scale-110" : "",
        )}
      ></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pink-200">
          <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center font-dancing">
            Capítulo 1 - O Convite da Ana Beatriz
          </h1>

          <div className="relative w-full aspect-[3/4] mb-6 rounded-xl overflow-hidden shadow-xl border-2 border-pink-200">
  <Image
    src="/images/quarto.jpg"
    alt="Quarto"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

  {/* Cortina animada */}
  <div
    className={cn(
      "absolute top-0 right-10 w-20 h-40 bg-purple-100/30 transition-all duration-[3000ms]",
      animateObjects ? "transform translate-x-1" : ""
    )}
  ></div>
</div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Era uma sexta-feira comum. Você estava em casa, relaxando depois de uma semana cansativa, quando seu celular
            tocou com uma mensagem da Ana Beatriz...
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleRefuse}
              className={cn(
                "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg",
                buttonClicked && "opacity-50 pointer-events-none",
              )}
            >
              "Não quero sair hoje..."
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-pink-50 border-2 border-pink-300 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-pink-600 flex items-center gap-2 font-dancing text-xl">
              {dialogContent[dialogStep].title} <span className="text-2xl">{dialogContent[dialogStep].emoji}</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 text-base">{dialogContent[dialogStep].message}</DialogDescription>
          <div className="flex justify-end">
            <Button
              onClick={handleNextDialog}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              {dialogStep < dialogContent.length - 1 ? "Continuar" : "Tudo bem, vamos lá..."}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
