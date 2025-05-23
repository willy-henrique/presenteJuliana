"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import QuizDoAmor from "@/components/quiz-do-amor"
import BotaoFoge from "@/components/botao-foge"
import CacaCoracoes from "@/components/caca-coracoes"
import ParticleBackground from "@/components/particle-background"

export default function Jogos() {
  const router = useRouter()

  const goToFinalMessage = () => {
    router.push("/mensagem-final")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-100 to-purple-100 p-4 relative overflow-hidden">
      <ParticleBackground type="confetti" />

      <div className="container mx-auto max-w-4xl z-10">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center font-dancing">
          Joguinhos Interativos do Amor
        </h1>

        <Tabs defaultValue="quiz" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-4 bg-white/70 p-1 rounded-full">
            <TabsTrigger
              value="quiz"
              className="rounded-full data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Quiz do Amor
            </TabsTrigger>
            <TabsTrigger
              value="botao"
              className="rounded-full data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Botão que Foge
            </TabsTrigger>
            <TabsTrigger
              value="caca"
              className="rounded-full data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Caça-Corações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz">
            <Card className="border-pink-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-t-lg">
                <CardTitle className="text-pink-600 font-dancing">Quiz do Amor</CardTitle>
                <CardDescription>Vamos ver o quanto você conhece nossa história!</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <QuizDoAmor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="botao">
            <Card className="border-pink-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-t-lg">
                <CardTitle className="text-pink-600 font-dancing">Botão que Foge</CardTitle>
                <CardDescription>Tente responder a pergunta mais importante...</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <BotaoFoge />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="caca">
            <Card className="border-pink-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-t-lg">
                <CardTitle className="text-pink-600 font-dancing">Caça-Corações</CardTitle>
                <CardDescription>Encontre todos os corações escondidos!</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <CacaCoracoes />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button
            onClick={goToFinalMessage}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Ver mensagem final
          </Button>
        </div>
      </div>
    </div>
  )
}
