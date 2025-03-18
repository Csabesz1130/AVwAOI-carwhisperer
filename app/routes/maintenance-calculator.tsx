import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { FileHelper } from '@/core/helpers/file'
import { Button, Card, Form, Input, Select, Table, Typography, message } from 'antd'
import { useState } from 'react'
import { useParams } from '@remix-run/react'
import { Line } from 'recharts'

const { Title, Text } = Typography

interface MaintenanceFormData {
  milesPerYear: number
  drivingConditions: 'city' | 'highway' | 'mixed'
  climate: 'mild' | 'extreme'
  drivingStyle: 'conservative' | 'moderate' | 'aggressive'
}

const COMPONENT_COSTS = {
  tires: { basePrice: 800, interval: 50000 },
  oil: { basePrice: 50, interval: 7500 },
  brakes: { basePrice: 300, interval: 40000 },
  transmission: { basePrice: 1000, interval: 60000 },
  battery: { basePrice: 200, interval: 50000 },
  filters: { basePrice: 30, interval: 15000 },
}

export default function MaintenanceCalculatorPage() {
  const { carId } = useParams()
  const [form] = Form.useForm()
  const [projections, setProjections] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { data: car } = Api.car.findUnique.useQuery({
    where: { id: carId },
  })

  const calculateMaintenanceCosts = (values: MaintenanceFormData) => {
    const years = 5
    const baseCost = car?.maintenanceCost || 0
    const mileage = values.milesPerYear

    // Adjustment factors
    const conditionFactor = {
      city: 1.2,
      highway: 0.8,
      mixed: 1.0,
    }[values.drivingConditions]

    const climateFactor = {
      mild: 1.0,
      extreme: 1.3,
    }[values.climate]

    const styleFactor = {
      conservative: 0.9,
      moderate: 1.0,
      aggressive: 1.2,
    }[values.drivingStyle]

    const projectionData = []

    for (let year = 1; year <= years; year++) {
      const yearlyMileage = mileage * year
      const components = Object.entries(COMPONENT_COSTS).map(([name, { basePrice, interval }]) => {
        const replacements = Math.floor(yearlyMileage / interval)
        const cost = basePrice * replacements * conditionFactor * climateFactor * styleFactor
        return { name, cost: Math.round(cost) }
      })

      const totalCost = components.reduce((sum, { cost }) => sum + cost, 0)

      projectionData.push({
        year,
        mileage: yearlyMileage,
        totalCost,
        components,
      })
    }

    setProjections(projectionData)
  }

  const exportToPDF = async () => {
    try {
      setLoading(true)
      const content = `
        Maintenance Cost Projection Report
        Vehicle: ${car?.make} ${car?.model} (${car?.year})
        
        5-Year Cost Breakdown:
        ${projections.map(p => `
          Year ${p.year}:
          Total Cost: $${p.totalCost}
          Components:
          ${p.components.map(c => `- ${c.name}: $${c.cost}`).join('\n')}
        `).join('\n')}
      `

      const blob = new Blob([content], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `maintenance-projection-${car?.make}-${car?.model}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      message.success('Report exported successfully')
    } catch (error) {
      message.error('Failed to export report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Card title="Maintenance Cost Calculator">
        <Form
          form={form}
          onFinish={calculateMaintenanceCosts}
          layout="vertical"
        >
          <Form.Item
            label="Annual Mileage"
            name="milesPerYear"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Enter miles per year" />
          </Form.Item>

          <Form.Item
            label="Driving Conditions"
            name="drivingConditions"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="city">City</Select.Option>
              <Select.Option value="highway">Highway</Select.Option>
              <Select.Option value="mixed">Mixed</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Climate"
            name="climate"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="mild">Mild</Select.Option>
              <Select.Option value="extreme">Extreme</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Driving Style"
            name="drivingStyle"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="conservative">Conservative</Select.Option>
              <Select.Option value="moderate">Moderate</Select.Option>
              <Select.Option value="aggressive">Aggressive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Calculate
            </Button>
          </Form.Item>
        </Form>

        {projections.length > 0 && (
          <>
            <Title level={4}>5-Year Cost Projection</Title>
            
            <Table
              dataSource={projections}
              pagination={false}
              columns={[
                {
                  title: 'Year',
                  dataIndex: 'year',
                  key: 'year',
                },
                {
                  title: 'Mileage',
                  dataIndex: 'mileage',
                  key: 'mileage',
                  render: (mileage) => `${mileage.toLocaleString()} miles`,
                },
                {
                  title: 'Total Cost',
                  dataIndex: 'totalCost',
                  key: 'totalCost',
                  render: (cost) => `$${cost.toLocaleString()}`,
                },
                {
                  title: 'Component Breakdown',
                  dataIndex: 'components',
                  key: 'components',
                  render: (components) => (
                    <ul>
                      {components.map(({ name, cost }) => (
                        <li key={name}>{`${name}: $${cost.toLocaleString()}`}</li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />

            <Button 
              onClick={exportToPDF}
              loading={loading}
              style={{ marginTop: 16 }}
            >
              Export Report (PDF)
            </Button>
          </>
        )}
      </Card>
    </PageLayout>
  )
}
