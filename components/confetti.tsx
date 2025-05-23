"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

export default function Confetti() {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window
    setWindowDimension({ width, height })

    // Esconde o confetti após 5 segundos
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#c084fc", "#a855f7"]}
        />
      )}
    </>
  )
}
