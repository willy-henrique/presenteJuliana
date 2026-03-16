"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"
import { getDurationParts } from "@/lib/relationship-time"

type CounterParts = {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

const beijoStartAt = new Date("2024-08-09T00:00:00-03:00")
const namoroStartAt = new Date("2024-10-26T00:00:00-03:00")
const namoroEndAt = new Date("2026-03-15T15:00:00-03:00")

const emptyCounter: CounterParts = {
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

export default function Capitulo6() {
  const router = useRouter()
  const [timeElapsedBeijo, setTimeElapsedBeijo] = useState<CounterParts>(emptyCounter)
  const [timeElapsedNamoro, setTimeElapsedNamoro] = useState<CounterParts>(emptyCounter)
  const [heartbeat, setHeartbeat] = useState(false)

  useEffect(() => {
    setTimeElapsedBeijo(getDurationParts(beijoStartAt, namoroEndAt))
    setTimeElapsedNamoro(getDurationParts(namoroStartAt, namoroEndAt))

    const heartbeatInterval = setInterval(() => {
      setHeartbeat((prev) => !prev)
    }, 800)

    return () => {
      clearInterval(heartbeatInterval)
    }
  }, [])

  const goToGallery = () => {
    router.push("/galeria")
  }

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
      return
    }
    router.push("/capitulo-5")
  }

  const goToRelationshipEnd = () => {
    router.push("/mensagem-final")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100 p-4 relative overflow-hidden">
      <ParticleBackground type="stars" />
      <div className="absolute top-4 left-4 z-20">
        <Button
          onClick={goBack}
          variant="ghost"
          size="sm"
          className="bg-white/80 hover:bg-white text-pink-700 border border-pink-200 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pink-300">
          <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center font-dancing">Capitulo 6 - Nosso Tempo Juntos</h1>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart className={cn("text-red-500 transition-all duration-500", heartbeat ? "scale-110" : "scale-100")} size={64} />
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          <Tabs defaultValue="beijo" className="mb-6">
            <TabsList className="grid grid-cols-2 mb-4 bg-pink-50 p-1 rounded-full">
              <TabsTrigger
                value="beijo"
                className="rounded-full data-[state=active]:bg-pink-500 data-[state=active]:text-white flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" /> Primeiro Beijo
              </TabsTrigger>
              <TabsTrigger
                value="namoro"
                className="rounded-full data-[state=active]:bg-pink-500 data-[state=active]:text-white flex items-center gap-2"
              >
                <Heart className="h-4 w-4" /> Namoro Oficial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="beijo" className="animate-fade-in">
              <div className="text-center mb-4 space-y-2">
                <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  Desde 09 de Agosto de 2024
                </div>
                <p className="text-xs text-rose-600 font-semibold">Congelado em 15/03/2026 as 15:00 (-03:00)</p>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedBeijo.months}</span>
                  <span className="text-xs text-pink-500">meses</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedBeijo.days}</span>
                  <span className="text-xs text-pink-500">dias</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedBeijo.hours}</span>
                  <span className="text-xs text-pink-500">horas</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedBeijo.minutes}</span>
                  <span className="text-xs text-pink-500">min</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedBeijo.seconds}</span>
                  <span className="text-xs text-pink-500">seg</span>
                </div>
              </div>

              <p className="text-pink-600 italic text-center font-dancing text-lg">Desde o nosso primeiro beijo no fluxo de Goiania</p>
            </TabsContent>

            <TabsContent value="namoro" className="animate-fade-in">
              <div className="text-center mb-4 space-y-2">
                <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  Desde 26 de Outubro de 2024
                </div>
                <p className="text-xs text-rose-600 font-semibold">Congelado em 15/03/2026 as 15:00 (-03:00)</p>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedNamoro.months}</span>
                  <span className="text-xs text-pink-500">meses</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedNamoro.days}</span>
                  <span className="text-xs text-pink-500">dias</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedNamoro.hours}</span>
                  <span className="text-xs text-pink-500">horas</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedNamoro.minutes}</span>
                  <span className="text-xs text-pink-500">min</span>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2 flex flex-col items-center shadow-md">
                  <span className="text-2xl font-bold text-pink-600">{timeElapsedNamoro.seconds}</span>
                  <span className="text-xs text-pink-500">seg</span>
                </div>
              </div>

              <p className="text-pink-600 italic text-center font-dancing text-lg">Encerrado com carinho e respeito.</p>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={goToGallery}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Ver nossa galeria de fotos
            </Button>
            <Button
              onClick={goToRelationshipEnd}
              className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Fim do relacionamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
