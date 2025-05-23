"use client"

import { useEffect, useState } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
}

export default function TypewriterEffect({ text, speed = 50 }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <div className="font-medium text-lg text-pink-700 font-dancing">
      {displayText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </div>
  )
}
