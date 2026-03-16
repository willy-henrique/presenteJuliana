"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, Clock3, HeartHandshake } from "lucide-react"
import { getDurationParts } from "@/lib/relationship-time"

const relationshipStartAt = new Date("2024-10-26T00:00:00-03:00")
const relationshipEndAt = new Date("2026-03-15T15:00:00-03:00")

export default function MensagemFinal() {
  const router = useRouter()
  const [showMessage, setShowMessage] = useState(false)

  const duration = getDurationParts(relationshipStartAt, relationshipEndAt)
  const years = Math.floor(duration.months / 12)
  const remainingMonths = duration.months % 12

  const openMessage = () => {
    setShowMessage(true)
  }

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
      return
    }
    router.push("/capitulo-6")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-stone-100 via-rose-50 to-zinc-100 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.08),transparent_55%)] pointer-events-none" />
      <div className="absolute top-4 left-4 z-20">
        <Button
          onClick={goBack}
          variant="ghost"
          size="sm"
          className="bg-white/80 hover:bg-white text-rose-700 border border-rose-200 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-rose-200">
          <h1 className="text-2xl font-bold text-rose-700 mb-4 text-center font-dancing">Nosso Ultimo Capitulo</h1>

          {!showMessage ? (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full h-64 bg-gradient-to-br from-rose-50 to-stone-100 rounded-lg border border-rose-200 flex items-center justify-center overflow-hidden">
                <div className="text-center z-10">
                  <HeartHandshake className="mx-auto text-rose-400 mb-3" size={44} />
                  <p className="text-rose-700 font-dancing text-xl">Uma carta de gratidao e despedida</p>
                </div>
              </div>

              <Button
                onClick={openMessage}
                className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Abrir a carta
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-rose-50 to-stone-50 rounded-lg p-6 border border-rose-200 mb-6 shadow-inner">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/80 rounded-md border border-rose-100 px-3 py-2 text-sm text-rose-800 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-rose-500" />
                    <span>Fim: 15/03/2026 as 15:00</span>
                  </div>
                  <div className="bg-white/80 rounded-md border border-rose-100 px-3 py-2 text-sm text-rose-800 flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-rose-500" />
                    <span>{duration.totalHours.toLocaleString("pt-BR")} horas</span>
                  </div>
                </div>

                <p className="text-rose-800 mb-4 font-dancing text-xl">Juliana,</p>
                <p className="text-rose-800 mb-4">
                  15/03/2026 as 15:00, nosso relacionamento chega ao fim. Foram {years} ano, {remainingMonths}{" "}
                  meses e {duration.days} dias de historia, equivalentes a {duration.months} meses e {duration.days} dias,
                  {" "}{duration.totalDays} dias e {duration.totalHours.toLocaleString("pt-BR")} horas.
                </p>
                <p className="text-rose-800 mb-4">
                  Quero agradecer por todos os momentos que vivemos, por cada sorriso, cada abraco, cada conversa e cada
                  aprendizado que dividimos nesse tempo.
                </p>
                <p className="text-rose-800 mb-4">
                  A gente se ama, e isso e verdadeiro. Mas as brigas e outros motivos nos trouxeram ate aqui, e seguir
                  separados virou a decisao mais honesta para nos dois.
                </p>
                <p className="text-rose-800 mb-4">
                  Levo comigo gratidao, respeito e carinho por tudo o que fomos. Obrigado por ter feito parte da minha
                  vida e da minha historia.
                </p>
                <p className="text-rose-800 mb-4 font-semibold">
                  Eu te amo, Obrigado por ser essa mulher perfeita!
                </p>
                <p className="text-rose-800 font-bold font-dancing text-xl">Com amor e paz,</p>
                <p className="text-rose-800 font-bold font-dancing text-xl">Willy Henrique</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
