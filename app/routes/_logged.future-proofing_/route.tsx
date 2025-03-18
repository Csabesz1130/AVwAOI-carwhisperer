import { Typography, Card, List, Space, Spin, Alert } from 'antd'
import { CarOutlined, DollarOutlined, RobotOutlined, ThunderboltOutlined, EnvironmentOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function FutureProofingAdvisorPage() {
  const { user } = useUserContext()
  const { data: cars, isLoading, error } = Api.car.findMany.useQuery({})

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout layout="narrow">
        <Alert
          message="Error"
          description="Failed to load car data. Please try again later."
          type="error"
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Future-Proofing Advisor</Title>
      <Paragraph>
        Stay ahead of the curve with our Future-Proofing Advisor. Get insights
        on emissions standards compliance, predicted resale values, eco-friendliness,
        charging capabilities, climate features, and upcoming technological 
        advancements for various car models.
      </Paragraph>

      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
        dataSource={cars}
        renderItem={car => (
          <List.Item>
            <Card title={`${car.make} ${car.model} (${car.year?.toString()})`}>
              <Space direction="vertical">
                <Space>
                  <CarOutlined />
                  <span>Emissions Standard: {getEmissionsStandard(car)}</span>
                </Space>
                <Space>
                  <DollarOutlined />
                  <span>
                    Predicted Resale Value: {getPredictedResaleValue(car)}
                  </span>
                </Space>
                <Space>
                  <RobotOutlined />
                  <span>Autonomous Features: {getAutonomousFeatures(car)}</span>
                </Space>
                <Space>
                  <EnvironmentOutlined />
                  <span>Eco-Friendliness: {getEcoFriendliness(car)}</span>
                </Space>
                <Space>
                  <ThunderboltOutlined />
                  <span>Charging Capabilities: {getChargingCapabilities(car)}</span>
                </Space>
                <Space>
                  <EnvironmentOutlined />
                  <span>Climate Features: {getClimateFeatures(car)}</span>
                </Space>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}

function getEmissionsStandard(car: any) {
  // Implement logic to determine the emissions standard based on the car's specifications
  // Consider factors like fuel type, engine efficiency, and year of manufacture
  return car.emissionsStandard || 'Euro 6d'
}

function getPredictedResaleValue(car: any) {
  // Implement logic to calculate the predicted resale value based on various factors
  // Consider eco-friendliness, market trends, and technological features
  const baseValue = 25000
  const ecoFriendlyBonus = car.isEcoFriendly ? 5000 : 0
  const techBonus = car.hasAdvancedTech ? 3000 : 0
  return `$${baseValue + ecoFriendlyBonus + techBonus}`
}

function getAutonomousFeatures(car: any) {
  // Implement logic to determine the autonomous features based on the car's specifications
  // Consider factors like sensors, software capabilities, and driver assistance features
  return car.autonomousLevel || 'Level 2 - Partial Automation'
}

function getEcoFriendliness(car: any) {
  // Implement logic to determine the eco-friendliness of the car
  // Consider factors like emissions, fuel efficiency, and use of sustainable materials
  return car.ecoFriendlinessRating || 'Medium'
}

function getChargingCapabilities(car: any) {
  // Implement logic to determine the charging capabilities for electric vehicles
  // Consider factors like charging speed, battery capacity, and charging port types
  return car.chargingCapabilities || 'N/A'
}

function getClimateFeatures(car: any) {
  // Implement logic to determine climate-specific features
  // Consider factors like air conditioning efficiency, heat pump systems, and cabin preconditioning
  return car.climateFeatures?.join(', ') || 'Standard HVAC'
}
