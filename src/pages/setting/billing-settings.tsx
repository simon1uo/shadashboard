import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BillingHistoryCard } from './components/billing-history-card'
import { CurrentPlanCard } from './components/current-plan-card'
import { PricingPlans } from './components/pricing-plans'
import billingHistoryData from './data/billing-history.json'
import currentPlanData from './data/current-plan.json'

export default function BillingSettings() {
  const handlePlanSelect = (planId: string) => {
    console.warn('Plan selected:', planId)
    // Handle plan selection logic here
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <CurrentPlanCard plan={currentPlanData} />
        <BillingHistoryCard history={billingHistoryData} />
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>
              Choose a plan that works best for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PricingPlans
              mode="billing"
              currentPlanId="professional"
              onPlanSelect={handlePlanSelect}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
