"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"

export default function Capitulo6() {
  const router = useRouter()
  const [timeElapsedBeijo, setTimeElapsedBeijo] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [timeElapsedNamoro, setTimeElapsedNamoro] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [heartbeat, setHeartbeat] = useState(false)

  useEffect(() => {
    // Data do primeiro beijo: 09/08/2024
    const startDateBeijo = new Date(2024, 7, 9) // Mês é 0-indexed (7 = agosto)

    // Data do namoro oficial: 26/10/2024
    const startDateNamoro = new Date(2024, 9, 26) // Mês é 0-indexed (9 = outubro)

    // Atualiza o contador a cada segundo
    const timer = setInterval(() => {
      const now = new Date()

      // Cálculo para o primeiro beijo
      const diffBeijo = now.getTime() - startDateBeijo.getTime()
      const secondsBeijo = Math.floor(diffBeijo / 1000)
      const minutesBeijo = Math.floor(secondsBeijo / 60)
      const hoursBeijo = Math.floor(minutesBeijo / 60)
      const daysBeijo = Math.floor(hoursBeijo / 24)
      const monthsBeijo = Math.floor(daysBeijo / 30)

      setTimeElapsedBeijo({
        months: monthsBeijo,
        days: daysBeijo % 30,
        hours: hoursBeijo % 24,
        minutes: minutesBeijo % 60,
        seconds: secondsBeijo % 60,
      })

      // Cálculo para o namoro oficial
      const diffNamoro = now.getTime() - startDateNamoro.getTime()
      const secondsNamoro = Math.floor(diffNamoro / 1000)
      const minutesNamoro = Math.floor(secondsNamoro / 60)
      const hoursNamoro = Math.floor(minutesNamoro / 60)
      const daysNamoro = Math.floor(hoursNamoro / 24)
      const monthsNamoro = Math.floor(daysNamoro / 30)

      setTimeElapsedNamoro({
        months: monthsNamoro,
        days: daysNamoro % 30,
        hours: hoursNamoro % 24,
        minutes: minutesNamoro % 60,
        seconds: secondsNamoro % 60,
      })
    }, 1000)

    // Animação de batimento cardíaco
    const heartbeatInterval = setInterval(() => {
      setHeartbeat((prev) => !prev)
    }, 800)

    return () => {
      clearInterval(timer)
      clearInterval(heartbeatInterval)
    }
  }, [])

  const goToGallery = () => {
    router.push("/galeria")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100 p-4 relative overflow-hidden">
      <ParticleBackground type="stars" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-pink-300">
          <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center font-dancing">
            Capítulo 6 - Nosso Tempo Juntos
          </h1>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart
                className={cn("text-red-500 transition-all duration-500", heartbeat ? "scale-110" : "scale-100")}
                size={64}
              />
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
              <div className="text-center mb-4">
                <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  Desde 09 de Agosto de 2024
                </div>
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

              <p className="text-pink-600 italic text-center font-dancing text-lg">
                Desde o nosso primeiro beijo no fluxo de Goiânia 💋
              </p>
            </TabsContent>

            <TabsContent value="namoro" className="animate-fade-in">
              <div className="text-center mb-4">
                <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  Desde 26 de Outubro de 2024
                </div>
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

              <p className="text-pink-600 italic text-center font-dancing text-lg">
                Cada segundo do nosso namoro é um presente 💘
              </p>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button
              onClick={goToGallery}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Ver nossa galeria de fotos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
