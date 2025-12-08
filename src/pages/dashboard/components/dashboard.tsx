import type { ChartCardProps } from './chart-card'
import cardData from '../data/card.json'
import focusDocumentsData from '../data/focus-documents-data.json'
import keyPersonnelData from '../data/key-personnel-data.json'
import outline from '../data/outline.json'
import pastPerformanceData from '../data/past-performance-data.json'

import { ChartAreaInteractive } from './chart-area-interactive'
import { ChartCard } from './chart-card'
import { DataTable } from './data-table'

const cards = cardData as Array<{ id: string } & ChartCardProps>

export function Dashboard() {
  return (
    <>
      <div className="@container/main px-4 lg:px-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ id, ...card }) => (
            <ChartCard key={id} {...card} />
          ))}
        </div>
        <ChartAreaInteractive />

      </div>
      <div className="@container/main">
        <DataTable
          data={outline}
          pastPerformanceData={pastPerformanceData}
          keyPersonnelData={keyPersonnelData}
          focusDocumentsData={focusDocumentsData}
        />
      </div>
    </>
  )
}
