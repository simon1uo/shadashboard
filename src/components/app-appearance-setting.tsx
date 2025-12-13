import type { Theme } from '@/contexts/theme-context'
import { Palette, RotateCcw, X } from 'lucide-react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_RADIUS,
  fontSizeOptions,
  radiusOptions,
  themeColorOptions,
} from '@/configs/theme-data'
import { useTheme } from '@/hooks/use-theme'

export function AppAppearanceSetting() {
  const {
    theme,
    resolvedTheme,
    setTheme,
    applyRadius,
    applyFontSize,
    applyThemeColor,
    setBrandColorsValues,
    themeColor,
    setThemeColor,
    radius,
    fontSize,
  } = useTheme()
  const [open, setOpen] = useState(false)

  const currentTheme = (theme ?? resolvedTheme) as Theme
  const handleReset = () => {
    setTheme('system')
    setThemeColor('default')
    setBrandColorsValues(null)
    applyRadius(DEFAULT_RADIUS)
    applyFontSize(DEFAULT_FONT_SIZE)
    applyThemeColor('default', resolvedTheme === 'dark')
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="p-2">
          <Palette className="size-4" />
          <span className="sr-only">Appearance</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-3 px-4 pt-4">
          <div className="flex items-center justify-between gap-2">
            <DrawerTitle>Appearance</DrawerTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleReset}>
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>
        <div className="flex flex-col gap-6 px-4 pb-6 text-sm">
          <div className="flex flex-col gap-3">
            <Label>Theme Mode</Label>
            <ToggleGroup
              type="single"
              value={currentTheme}
              onValueChange={(value) => {
                if (!value)
                  return
                setTheme(value as Theme)
                const isDarkMode = value === 'dark'
                  ? true
                  : value === 'light'
                    ? false
                    : resolvedTheme === 'dark'
                setBrandColorsValues(null)
                applyThemeColor(themeColor, isDarkMode)
              }}
              variant="outline"
              size="sm"
              spacing={0}
              className="w-full"
            >
              <ToggleGroupItem value="light" className="flex-1 justify-center">
                Light
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex-1 justify-center">
                Dark
              </ToggleGroupItem>
              <ToggleGroupItem value="system" className="flex-1 justify-center">
                System
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Theme Color</Label>
            <Select
              value={themeColor}
              onValueChange={(value) => {
                if (!value)
                  return
                setThemeColor(value)
                setBrandColorsValues(null)
                applyThemeColor(value, resolvedTheme === 'dark')
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {themeColorOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Radius</Label>
            <ToggleGroup
              type="single"
              value={radius}
              onValueChange={(value) => {
                if (!value)
                  return
                applyRadius(value)
              }}
              variant="outline"
              size="lg"
              spacing={0}
              className="w-full"
            >
              {radiusOptions.map(option => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="flex flex-col flex-1 justify-center gap-0 h-fit-content"
                >
                  <span>{option.name}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Font size</Label>
            <ToggleGroup
              type="single"
              value={fontSize}
              onValueChange={(value) => {
                if (!value)
                  return
                applyFontSize(value)
              }}
              variant="outline"
              size="sm"
              spacing={0}
              className="w-full"
            >
              {fontSizeOptions.map(option => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className={`flex-1 justify-center py-2 ${option.className ?? ''}`}
                >
                  {option.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
