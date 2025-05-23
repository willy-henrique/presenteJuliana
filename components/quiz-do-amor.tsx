"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const questions = [
  {
    id: 1,
    question: "Onde nos conhecemos?",
    options: [
      { id: "a", text: "Na faculdade" },
      { id: "b", text: "No Fluxo de Goiânia" },
      { id: "c", text: "No trabalho" },
      { id: "d", text: "Em uma festa de amigos" },
    ],
    correctAnswer: "b",
  },
  {
    id: 2,
    question: "Qual foi a data do nosso primeiro beijo?",
    options: [
      { id: "a", text: "09 de Agosto de 2024" },
      { id: "b", text: "15 de Setembro de 2024" },
      { id: "c", text: "26 de Outubro de 2024" },
      { id: "d", text: "01 de Novembro de 2024" },
    ],
    correctAnswer: "a",
  },
  {
    id: 3,
    question: "Quando começamos a namorar oficialmente?",
    options: [
      { id: "a", text: "09 de Agosto de 2024" },
      { id: "b", text: "15 de Setembro de 2024" },
      { id: "c", text: "26 de Outubro de 2024" },
      { id: "d", text: "01 de Novembro de 2024" },
    ],
    correctAnswer: "c",
  },
  {
    id: 4,
    question: "Qual foi a cantada que usei?",
    options: [
      { id: "a", text: "Você vem sempre aqui?" },
      { id: "b", text: "Você acredita em amor à primeira vista?" },
      {
        id: "c",
        text: "Nossa eu acho que me afoguei nessa sua beleza, será que a gente não pode da um beijo para eu recuperar meu ar não?",
      },
      { id: "d", text: "Você é tão linda que me fez esquecer a cantada" },
    ],
    correctAnswer: "c",
  },
  {
    id: 5,
    question: "Onde foi nosso primeiro beijo?",
    options: [
      { id: "a", text: "Na festa" },
      { id: "b", text: "No fluxo de Goiânia" },
      { id: "c", text: "No cinema" },
      { id: "d", text: "No parque" },
    ],
    correctAnswer: "b",
  },
]

export default function QuizDoAmor() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
  }

  const handleNextQuestion = () => {
    // Verifica se a resposta está correta
    const correct = selectedOption === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
    }

    // Após mostrar o feedback, avança para a próxima pergunta
    setTimeout(() => {
      setShowFeedback(false)

      // Avança para a próxima pergunta ou mostra o resultado
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
    setShowFeedback(false)
  }

  return (
    <div className="space-y-6">
      {!showResult ? (
        <>
          <div className="bg-gradient-to-r from-pink-50 to-lavender-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-medium text-lg text-pink-700 mb-2">
              Pergunta {currentQuestion + 1} de {questions.length}
            </h3>
            <p className="text-gray-800 text-lg">{questions[currentQuestion].question}</p>
          </div>

          {showFeedback ? (
            <div
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-lg animate-bounce-in",
                isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200",
              )}
            >
              <div className="text-2xl mb-2">{isCorrect ? "✅" : "❌"}</div>
              <p className={cn("font-medium text-lg", isCorrect ? "text-green-600" : "text-red-600")}>
                {isCorrect ? "Acertou!" : "Errou!"}
              </p>
            </div>
          ) : (
            <>
              <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-100 hover:border-pink-200 transition-all duration-200 shadow-sm"
                    >
                      <RadioGroupItem value={option.id} id={`option-${option.id}`} className="text-pink-500" />
                      <Label htmlFor={`option-${option.id}`} className="text-base flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <Button
                onClick={handleNextQuestion}
                disabled={!selectedOption}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
              </Button>
            </>
          )}
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="text-red-500" size={64} />
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-pink-600 font-dancing">
            {score === questions.length
              ? "Você conhece a nossa história de cor!"
              : score >= questions.length / 2
                ? "Você conhece bem a nossa história!"
                : "Vamos relembrar nossa história juntos!"}
          </h3>

          <div className="bg-gradient-to-r from-pink-50 to-lavender-50 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700 text-lg">
              Você acertou <span className="font-bold text-pink-600">{score}</span> de{" "}
              <span className="font-bold text-pink-600">{questions.length}</span> perguntas!
            </p>
          </div>

          <Button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full"
          >
            Jogar Novamente
          </Button>
        </div>
      )}
    </div>
  )
}
