"use client"

import { useEffect, useRef, useState } from "react"
import { Music, MicOff as MusicOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("/music/background-music.mp3")
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    audio.play().catch(() => {
      setIsPlaying(false)
    })

    return () => {
      audio.pause()
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMusic}
        className="rounded-full bg-white/80 hover:bg-white/90 shadow-md"
      >
        {isPlaying ? (
          <MusicOff className="h-5 w-5 text-pink-500" />
        ) : (
          <Music className="h-5 w-5 text-pink-500" />
        )}
      </Button>
    </div>
  )
}
