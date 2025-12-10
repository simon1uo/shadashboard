import { appMeta } from '@/configs/app-data'
import { cn } from '@/lib/utils'

interface AppLogoProps {
  withText?: boolean
  showSubtitle?: boolean
  className?: string
  nameClassName?: string
  subtitleClassName?: string
}

export function AppLogo({
  withText = true,
  showSubtitle = false,
  className,
  nameClassName,
  subtitleClassName,
}: AppLogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold uppercase text-primary">
        {appMeta.initials}
      </div>
      {withText
        ? (
            <div className="space-y-0.5">
              <p className={cn('text-sm font-semibold leading-tight', nameClassName)}>{appMeta.name}</p>
              {showSubtitle
                ? (
                    <p className={cn('text-xs text-muted-foreground', subtitleClassName)}>{appMeta.subtitle}</p>
                  )
                : null}
            </div>
          )
        : null}
    </div>
  )
}
