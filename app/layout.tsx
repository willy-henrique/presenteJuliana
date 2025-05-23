import type React from "react"
import type { Metadata } from "next"
import { Dancing_Script, Poppins, Quicksand } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import BackgroundMusic from "@/components/backgroundMusic" // ✅ Mantive exatamente como você colocou



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
})

export const metadata: Metadata = {
  title: "Feliz Aniversário Juliana",
  description: "Um presente especial para o aniversário da Juliana",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${dancing.variable} ${quicksand.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BackgroundMusic /> {/* ✅ Só adicionei isso */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
