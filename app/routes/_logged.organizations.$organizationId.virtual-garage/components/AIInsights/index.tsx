// app/routes/_logged.organizations.$organizationId.virtual-garage/components/AIInsights/index.tsx
import {
  AlertTriangle,
  Brain,
  Calendar,
  Car,
  Info,
  TrendingUp,
} from 'lucide-react'
import React from 'react'

// Since we're having dependency issues with radix-ui, let's use native HTML with Tailwind
// We can migrate to shadcn/ui components once the dependency issues are resolved

interface AIInsightsProps {
  car: {
    id: string
    name: string
    category: 'Financed' | 'Company' | 'Rented'
    primaryUse: string
    engineType: string
    price: string
    addedOn: string
    imageUrl: string
  }
}

const AIInsights: React.FC<AIInsightsProps> = ({ car }) => {
  return (
    <div className="bg-black/95 text-white rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h3 className="flex items-center gap-2 text-2xl font-semibold">
          <Brain className="w-6 h-6 text-blue-400" />
          AI Insights
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Market Analysis */}
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span>Market Analysis</span>
          </summary>
          <div className="mt-4 space-y-3">
            <div className="bg-white/10 p-3 rounded-lg">
              <h4 className="font-semibold mb-1">Market Position</h4>
              <p className="text-sm text-gray-300">
                {car.category === 'Financed'
                  ? 'Current market trends show stable values for financed vehicles in this category.'
                  : car.category === 'Company'
                  ? 'Company vehicles in this segment are showing strong resale potential.'
                  : 'Rental vehicle market indicates optimal timing for upgrades.'}
              </p>
            </div>
          </div>
        </details>

        {/* Usage Patterns */}
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <Car className="w-4 h-4 text-blue-400" />
            <span>Usage Patterns</span>
          </summary>
          <div className="mt-4 space-y-3">
            <div className="bg-white/10 p-3 rounded-lg">
              <h4 className="font-semibold mb-1">Primary Usage</h4>
              <p className="text-sm text-gray-300">
                Your {car.primaryUse} usage pattern suggests:
                {car.primaryUse === 'commuting'
                  ? ' Regular maintenance checks are recommended.'
                  : car.primaryUse === 'familyUse'
                  ? ' Consider safety feature upgrades.'
                  : ' Monitor wear patterns closely.'}
              </p>
            </div>
          </div>
        </details>

        {/* Smart Recommendations */}
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <Info className="w-4 h-4 text-yellow-400" />
            <span>Smart Recommendations</span>
          </summary>
          <div className="mt-4 space-y-3">
            <div className="bg-white/10 p-3 rounded-lg">
              <h4 className="font-semibold mb-1">Based on Your Profile</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-yellow-400" />
                  Consider regular checks for {car.engineType} efficiency
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-blue-400" />
                  Schedule maintenance based on {car.primaryUse} usage patterns
                </li>
              </ul>
            </div>
          </div>
        </details>

        {/* Value Trends */}
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>Value Trends</span>
          </summary>
          <div className="mt-4 space-y-3">
            <div className="bg-white/10 p-3 rounded-lg">
              <h4 className="font-semibold mb-1">Market Position</h4>
              <p className="text-sm text-gray-300">
                Added on {car.addedOn}.{' '}
                {car.category === 'Financed'
                  ? 'Financing terms are aligned with market averages.'
                  : car.category === 'Company'
                  ? 'Company fleet values remain stable.'
                  : 'Rental market shows strong demand.'}
              </p>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}

export default AIInsights
