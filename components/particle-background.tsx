"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import type { Engine, ISourceOptions } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"
import { loadHeartShape } from "tsparticles-shape-heart"

type ParticleType = "hearts" | "stars" | "confetti" | "bubbles" | "sparkles" | "party"

interface ParticleBackgroundProps {
  type: ParticleType
}

function getParticleConfig(type: ParticleType): ISourceOptions {
  const isConfetti = type === "confetti" || type === "party"

  const colorsByType: Record<ParticleType, string[]> = {
    hearts: ["#ff758f", "#ff7eb3", "#fca5a5", "#f9a8d4"],
    stars: ["#FFD700", "#FFC0CB", "#FFCBA4", "#FFFACD"],
    confetti: ["#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#c084fc", "#a855f7"],
    bubbles: ["#f9a8d4", "#c084fc", "#93c5fd", "#fca5a5"],
    sparkles: ["#FFD700", "#FFC0CB", "#FFCBA4", "#f9a8d4"],
    party: ["#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#c084fc", "#a855f7", "#93c5fd"],
  }

  const shapeByType: Record<ParticleType, string | string[]> = {
    hearts: "heart",
    stars: "star",
    confetti: ["circle", "triangle", "square"],
    bubbles: "circle",
    sparkles: "circle",
    party: "circle",
  }

  return {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: isConfetti ? 80 : type === "stars" ? 50 : type === "sparkles" ? 40 : 30,
        density: { enable: true, area: 800 },
      },
      color: { value: colorsByType[type] },
      shape: { type: shapeByType[type] },
      opacity: {
        value: isConfetti ? 0.7 : 0.5,
        random: true,
        animation: { enable: !isConfetti, speed: 1, minimumValue: 0.1, sync: false },
      },
      size: {
        value: { min: type === "sparkles" ? 1 : 3, max: type === "bubbles" ? 20 : 10 },
        random: true,
        animation: { enable: !isConfetti, speed: 2, minimumValue: 1, sync: false },
      },
      move: {
        enable: true,
        speed: isConfetti ? 3 : 2,
        direction: isConfetti ? "bottom" : "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
        onClick: { enable: true, mode: isConfetti ? "push" : "repulse" },
        resize: true,
      },
      modes: {
        bubble: { distance: 180, size: 8, duration: 2, opacity: 0.8, speed: 3 },
        repulse: { distance: 180, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  }
}

export default function ParticleBackground({ type }: ParticleBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
    await loadHeartShape(engine)
  }, [])

  return <Particles id="tsparticles" init={particlesInit} options={getParticleConfig(type)} className="absolute inset-0 z-0" />
}
