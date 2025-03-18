import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { CarOutlined, CompressOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  List,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
const { Title, Text, Paragraph } = Typography

// Add after imports, before the component:
interface JsonValue {
  preferenceType?: string
  question?: string
  preferenceValue?: string | number
  answer?: string | number
}

function isJsonString(value: any): value is string {
  return typeof value === 'string'
}

type Recommendation = {
  id: string
  car: {
    id: string
    createdAt: Date
    updatedAt: Date
    model: string
    description: string
    make: string
    year: number
    color: string
    imageUrl: string
    emissionsRating: string
    fuelEfficiency: string
    driveType: string
  }
  reason?: string
  criteria?: string
}

export default function CarRecommendationsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [selectedCars, setSelectedCars] = useState<string[]>([])

  const { data: recommendations, isLoading } =
    Api.recommendation.findMany.useQuery({
      where: { userId: user?.id },
      include: { car: true },
    })

  const { data: preferences } = Api.userPreference.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { data: questionnaireResponses } =
    Api.questionnaireResponse.findMany.useQuery({
      where: { userId: user?.id },
    })

  const { mutateAsync: updateRecommendations } =
    Api.recommendation.updateMany.useMutation()

  useEffect(() => {
    // Update recommendations based on questionnaire responses and preferences
    if (
      questionnaireResponses &&
      questionnaireResponses.length > 0 &&
      preferences
    ) {
      const latestResponse =
        (questionnaireResponses[0].responses as any[]) ?? []
      const criteriaString = JSON.stringify({
        ...latestResponse,
        ...preferences,
      })
      if (isJsonString(criteriaString)) {
        updateRecommendations({
          where: { userId: user?.id },
          data: {
            reason:
              'Updated based on your questionnaire responses and preferences',
            criteria: criteriaString,
          },
        })
      }
    }
  }, [questionnaireResponses, preferences, updateRecommendations, user?.id])

  const handleCompare = () => {
    if (selectedCars.length < 2) {
      alert('Please select at least two cars to compare.')
      return
    }
    navigate(
      `/organizations/${organizationId}/comparison?cars=${selectedCars.join(
        ',',
      )}`,
    )
  }

  const handleViewDetails = (carId: string) => {
    navigate(`/organizations/${organizationId}/cars/${carId}`)
  }

  const toggleCarSelection = (carId: string) => {
    setSelectedCars(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId],
    )
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Your Personalized Car Recommendations</Title>
      <Paragraph>
        Based on your questionnaire responses and preferences, we've curated a
        list of cars that we think you'll love.
      </Paragraph>

      <Title level={4}>Your Preferences and Questionnaire Responses:</Title>
      <List
        dataSource={[
          ...(preferences || []),
          ...(questionnaireResponses?.[0]?.responses
            ? (questionnaireResponses[0].responses as any[])
            : []),
        ]}
        renderItem={(item: JsonValue) => {
          const value = String(item.preferenceValue || item.answer || '')
          return (
            <List.Item>
              <Tag color="blue">
                {item.preferenceType || item.question}: {value}
              </Tag>
            </List.Item>
          )
        }}
      />

      <Space
        direction="vertical"
        size="middle"
        style={{ width: '100%', marginTop: '20px' }}
      >
        {recommendations?.map(recommendation => (
          <Card key={recommendation.id} hoverable>
            <Row gutter={16} align="middle">
              <Col span={6}>
                <img
                  src={
                    recommendation.car?.imageUrl ||
                    'https://via.placeholder.com/150'
                  }
                  alt={`${recommendation.car?.make} ${recommendation.car?.model}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Col>
              <Col span={14}>
                <Title level={4}>
                  {recommendation.car?.make} {recommendation.car?.model} (
                  {recommendation.car?.year?.toString()})
                </Title>
                <Paragraph>{recommendation.car?.description}</Paragraph>
                <Text strong>Why we recommend this: </Text>
                <Text>{recommendation.reason}</Text>
              </Col>
              <Col span={4}>
                <Space direction="vertical">
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() =>
                      handleViewDetails(recommendation.car?.id || '')
                    }
                  >
                    View Details
                  </Button>
                  <Button
                    icon={<CompressOutlined />}
                    onClick={() =>
                      toggleCarSelection(recommendation.car?.id || '')
                    }
                    type={
                      selectedCars.includes(recommendation.car?.id || '')
                        ? 'primary'
                        : 'default'
                    }
                  >
                    {selectedCars.includes(recommendation.car?.id || '')
                      ? 'Selected'
                      : 'Select to Compare'}
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          type="primary"
          icon={<CarOutlined />}
          onClick={handleCompare}
          disabled={selectedCars.length < 2}
        >
          Compare Selected Cars
        </Button>
      </div>
    </PageLayout>
  )
}
