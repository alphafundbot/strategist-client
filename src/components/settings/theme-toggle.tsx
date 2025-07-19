
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex gap-2">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          onClick={() => setTheme("light")}
          className="w-full"
        >
          <Sun className="mr-2" />
          Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          onClick={() => setTheme("dark")}
          className="w-full"
        >
          <Moon className="mr-2" />
          Dark
        </Button>
    </div>
  )
}
