import { TrendingDown, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface ChartCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  trendLabel: string
  description: string
}

export function ChartCard({
  title,
  value,
  change,
  trend,
  trendLabel,
  description,
}: ChartCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendIcon className="mr-1 size-4" />
            {change}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {trendLabel}
          <TrendIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          {description}
        </div>
      </CardFooter>
    </Card>
  )
}
