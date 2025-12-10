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
import cardData from '../data/card.json'

export interface ChartCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  trendLabel: string
  description: string
}

function ChartCard({
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

export function DashboardChartCard() {
  const cards = cardData as Array<{ id: string } & ChartCardProps>

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ id, ...card }) => (
        <ChartCard key={id} {...card} />
      ))}
    </div>
  )
}
