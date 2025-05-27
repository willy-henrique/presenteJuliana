"use client"

import { useCallback, useEffect } from "react"
import Particles from "react-tsparticles"
import type { Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"
import { loadHeartShape } from "tsparticles-shape-heart"

type ParticleType = "hearts" | "stars" | "confetti" | "bubbles" | "sparkles" | "party"

interface ParticleBackgroundProps {
  type: ParticleType
}

export default function ParticleBackground({ type }: ParticleBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
    await loadHeartShape(engine)
  }, [])

  // Cleanup function para evitar problemas ao trocar de página
  useEffect(() => {
    return () => {
      const container = document.getElementById("tsparticles")
      if (container) {
        // Limpa as partículas ao desmontar o componente
        const instance = (window as any).tsParticles?.dom?.[0]
        if (instance) {
          instance.destroy()
        }
      }
    }
  }, [])

  const getParticleConfig = (type: ParticleType) => {
    switch (type) {
      case "hearts":
        return {
          particles: {
            number: {
              value: 20,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#ff758f", "#ff7eb3", "#fca5a5", "#f9a8d4"],
            },
            shape: {
              type: "heart",
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 10,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 5,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
              bounce: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                size: 12,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          retina_detect: true,
        }
      case "stars":
        return {
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#FFD700", "#FFC0CB", "#FFCBA4", "#FFFACD"],
            },
            shape: {
              type: "star",
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 5,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
              bounce: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                size: 7,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          retina_detect: true,
        }
      case "confetti":
        return {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#c084fc", "#a855f7"],
            },
            shape: {
              type: ["circle", "triangle", "square"],
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 6,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 3,
              direction: "bottom",
              random: true,
              straight: false,
              outModes: "out",
              bounce: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        }
      case "bubbles":
        return {
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#f9a8d4", "#c084fc", "#93c5fd", "#fca5a5"],
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.3,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 15,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 5,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
              bounce: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                size: 20,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        }
      case "sparkles":
        return {
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#FFD700", "#FFC0CB", "#FFCBA4", "#f9a8d4"],
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
              bounce: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 150,
                size: 6,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        }
      case "party":
        return {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#c084fc", "#a855f7", "#93c5fd"],
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 5,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
              bounce: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 150,
                size: 8,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          retina_detect: true,
        }
      default:
        return {
          particles: {
            number: {
              value: 20,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ff758f",
            },
            shape: {
              type: "heart",
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 10,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 5,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
              bounce: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                size: 12,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          retina_detect: true,
        }
    }
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
    />
  )
}
