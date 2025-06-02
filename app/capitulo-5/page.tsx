"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Music, MicOff as MusicOff } from "lucide-react";
import ParticleBackground from "@/components/particle-background";
import { cn } from "@/lib/utils";

// Contexto de áudio
const audioContext = {
  audio: typeof window !== "undefined" ? new Audio("/sounds/background.mp3") : null,
  isPlaying: false,
};

export default function Capitulo5() {
  const router = useRouter();
  const [heartbeat, setHeartbeat] = useState(false);
  const [heartScale, setHeartScale] = useState(1);
  const [showDate, setShowDate] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showKiss, setShowKiss] = useState(false);
  const [enrolarButtonPosition, setEnrolarButtonPosition] = useState({ x: "50%", y: "50%" });
  const [enrolarAttempts, setEnrolarAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(audioContext.isPlaying);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heartbeatInterval = setInterval(() => setHeartbeat((prev) => !prev), 800);
    const scaleInterval = setInterval(() => setHeartScale((prev) => (prev === 1 ? 1.2 : 1)), 800);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
      moveEnrolarButton();
    }, 1500);

    if (audioContext.audio) {
      audioContext.audio.loop = true;
      audioContext.audio.volume = 0.5;
    }

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(scaleInterval);
      clearTimeout(buttonTimer);
      if (audioContext.audio) {
        audioContext.audio.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioContext.audio) return;

    if (isPlaying) {
      audioContext.audio.pause();
      setIsPlaying(false);
      audioContext.isPlaying = false;
    } else {
      audioContext.audio
        .play()
        .then(() => {
          setIsPlaying(true);
          audioContext.isPlaying = true;
        })
        .catch(() => {});
    }
  };

  const moveEnrolarButton = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const buttonWidth = 130;
    const buttonHeight = 40;
    const maxX = rect.width - buttonWidth;
    const maxY = rect.height - buttonHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setEnrolarButtonPosition({ x: `${randomX}px`, y: `${randomY}px` });
  };

  const handleEnrolar = () => {
    setEnrolarAttempts((prev) => prev + 1);
    moveEnrolarButton();
  };

  const handleAssumirClick = () => {
    setShowKiss(true);

    const kiss = new Audio("/sounds/kiss.mp3");
    kiss.play().catch(() => {});

    setTimeout(() => setShowDate(true), 1500);
    setTimeout(() => router.push("/capitulo-6"), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 relative overflow-hidden">
      <ParticleBackground type="hearts" />

      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={toggleMusic}
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-pink-100/90 shadow-lg backdrop-blur-sm border border-pink-200"
        >
          {isPlaying ? (
            <MusicOff className="h-5 w-5 text-pink-600" />
          ) : (
            <Music className="h-5 w-5 text-pink-600" />
          )}
        </Button>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/30 relative">
          <h1 className="text-3xl font-bold text-center mb-4 font-dancing text-pink-600">
            Capítulo 5 - O xeque-mate no bebedouro
          </h1>

          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl shadow-lg border-2 border-pink-100">
            <Image
              src="/images/bebedouro.jpg"
              alt="Nosso momento"
              fill
              className="object-cover"
              priority
            />

            {!showKiss ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <p className="text-white text-xl font-dancing text-center px-6">
                  "Eai meu amor, vai ficar me enrolando até quando?"
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100/50 to-purple-100/50">
                <Heart
                  className="text-pink-500"
                  size={80}
                  style={{
                    transform: `scale(${heartScale})`,
                    transition: "transform 0.5s ease-in-out",
                    filter: "drop-shadow(0 0 10px rgba(255, 100, 200, 0.7))",
                  }}
                />
                <p className="text-pink-600 font-dancing text-lg mt-4">
                  Nosso primeiro beijo!
                </p>
              </div>
            )}
          </div>

          {showDate ? (
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg">
                09 de Agosto de 2024
              </div>
              <p className="text-pink-600 mt-3 font-dancing">
                O dia em que nossos corações se encontraram
              </p>
            </div>
          ) : showKiss ? (
            <div className="flex justify-center mb-6">
              <Heart
                className="text-pink-500"
                size={80}
                style={{
                  transform: `scale(${heartScale})`,
                  transition: "transform 0.5s ease-in-out",
                  filter: "drop-shadow(0 0 10px rgba(255, 100, 200, 0.7))",
                }}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Button
                  onClick={handleAssumirClick}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full shadow-xl text-lg"
                >
                  Assumir meu amor ❤️
                </Button>
              </div>

              <div
                ref={containerRef}
                className="relative h-32 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200 overflow-hidden"
              >
                <Button
                  onMouseEnter={handleEnrolar}
                  onClick={handleEnrolar}
                  style={{
                    position: "absolute",
                    left: enrolarButtonPosition.x,
                    top: enrolarButtonPosition.y,
                    transition: "all 0.4s ease",
                  }}
                  variant="outline"
                  className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-white/90 shadow-md"
                >
                  Enrolar mais... 😏
                </Button>
              </div>

              {enrolarAttempts > 0 && (
                <div className="text-center">
                  <p className="text-pink-500 text-sm font-dancing">
                    Tentativas de fugir: {enrolarAttempts} 😍
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
