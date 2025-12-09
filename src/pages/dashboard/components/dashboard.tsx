import { DashboardChartArea } from './dashboard-chart-area'
import { DashboardChartCard } from './dashboard-chart-card'
import { DashboardDataTable } from './dashboard-data-table'

export function Dashboard() {
  return (
    <>
      <div className="@container/main px-4 lg:px-6 space-y-6">
        <DashboardChartCard />
        <DashboardChartArea />
        <DashboardDataTable />
      </div>
    </>
  )
}
