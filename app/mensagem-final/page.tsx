"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Confetti from "@/components/confetti"
import ParticleBackground from "@/components/particle-background"

export default function MensagemFinal() {
  const [showMessage, setShowMessage] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const openMessage = () => {
    setShowMessage(true)
    setShowConfetti(true)

    // Tenta reproduzir o som de coração batendo com tratamento de erro
    try {
      const audio = new Audio("/sounds/heartbeat.mp3")

      // Adiciona um listener para tratar erros de carregamento
      audio.addEventListener("error", (e) => {
        console.log("Erro ao carregar o áudio:", e)
        // Continua com a interação mesmo sem o áudio
      })

      // Tenta reproduzir o áudio
      const playPromise = audio.play()

      // Trata a promise retornada por play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Erro ao reproduzir áudio:", error)
          // Continua com a interação mesmo sem o áudio
        })
      }
    } catch (error) {
      console.log("Erro ao criar objeto de áudio:", error)
      // Continua com a interação mesmo sem o áudio
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-100 to-pink-100 p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <ParticleBackground type="hearts" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pink-300">
          <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center font-dancing">Mensagem Final</h1>

          {!showMessage ? (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full h-64 bg-gradient-to-br from-pink-50 to-lavender-100 rounded-lg border-2 border-dashed border-pink-300 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-5 left-5 text-pink-200 text-4xl animate-float-delayed">✨</div>
                  <div className="absolute bottom-5 right-5 text-pink-200 text-4xl animate-float">✨</div>
                </div>
                <div className="text-center z-10">
                  <div className="relative">
                    <Heart className="mx-auto text-pink-400 mb-2 animate-pulse" size={48} />
                    <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <p className="text-pink-600 font-dancing text-xl">Uma carta especial para você</p>
                </div>
              </div>

              <Button
                onClick={openMessage}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Abrir a carta
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-pink-50 to-lavender-50 rounded-lg p-6 border border-pink-200 mb-6 shadow-inner">
                <p className="text-pink-800 mb-4 font-dancing text-xl">Querida Juliana,</p>
                <p className="text-pink-800 mb-4">
                  Feliz aniversário, meu amor! Este pequeno presente digital é apenas uma forma de expressar o quanto
                  você é especial para mim.
                </p>
                <p className="text-pink-800 mb-4">
                  Desde aquele dia no Fluxo de Goiânia, minha vida mudou completamente. Você trouxe cor, alegria e tanto
                  amor que às vezes nem acredito na sorte que tive em te encontrar.
                </p>
                <p className="text-pink-800 mb-4">
                  Obrigado por cada momento, cada risada, cada abraço. Obrigado por ser exatamente quem você é - a
                  pessoa mais incrível que já conheci.
                </p>
                <p className="text-pink-800 mb-4">
                  Que este novo ano da sua vida seja repleto de realizações, felicidade e muito amor. Estarei sempre ao
                  seu lado, celebrando cada conquista e apoiando em cada desafio.
                </p>
                <p className="text-pink-800 font-bold font-dancing text-xl">Te amo infinitamente,</p>
                <p className="text-pink-800 font-bold font-dancing text-xl">Seu amor Willy Henrique</p>
              </div>

              <div className="text-center">
                <p className="text-pink-600 mb-4">Escaneie o QR Code abaixo para acessar este site novamente:</p>
                <div className="bg-white p-4 rounded-lg inline-block shadow-md">
                  <div className="w-48 h-48 bg-gray-200 mx-auto relative">
                    {/* Aqui será inserido o QR Code gerado */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">QR Code</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
