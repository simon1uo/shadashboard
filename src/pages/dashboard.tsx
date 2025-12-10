import { DashboardChartArea } from './dashboard/components/dashboard-chart-area'
import { DashboardChartCard } from './dashboard/components/dashboard-chart-card'
import { DashboardDataTable } from './dashboard/components/dashboard-data-table'

export default function Dashboard() {
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
