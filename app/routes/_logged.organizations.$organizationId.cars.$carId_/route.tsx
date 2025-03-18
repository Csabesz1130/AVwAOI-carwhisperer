import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  CarOutlined,
  CompressOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Spin,
  Tabs,
  Tag,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

interface DrivingHabits {
  annualMileage: number
  fuelType: string
  usageStyle: string
}

interface Car {
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
  engineType: string
  horsepower: number
  acceleration: number
  topSpeed: number
  transmission: string
  driveType: string
  cargoSpace: number
  seatingCapacity: number
  maintenanceCost: number
  safetyRating: number
  ecoFeatures: string[]
}

export default function CarDetailsPage() {
  const { carId, organizationId } = useParams()
  const navigate = useNavigate()
  const [drivingHabits, setDrivingHabits] = useState<DrivingHabits>({
    annualMileage: 0,
    fuelType: '',
    usageStyle: '',
  })
  const { user } = useUserContext()

  const { data: car, isLoading } = Api.car.findUnique.useQuery({
    where: { id: carId },
  })

  const { mutateAsync: addToComparison } = Api.userCar.create.useMutation()
  const { data: deals } = Api.deal.findMany.useQuery({ where: { carId } })

  const handleAddToComparison = async () => {
    if (!user || !car) return
    try {
      await addToComparison({
        data: {
          ownershipStatus: 'COMPARED',
          userId: user.id,
          carId: car.id,
        },
      })
      message.success('Car added to comparison list')
    } catch (error) {
      message.error('Failed to add car to comparison list')
    }
  }

  const handleViewDeals = () => {
    navigate(`/organizations/${organizationId}/deals?carId=${carId}`)
  }

  const calculateTCO = () => {
    const baseCost = 30000
    const annualMiles = drivingHabits.annualMileage || 12000
    const fuelCost = drivingHabits.fuelType === 'electric' ? 0.03 : 0.08
    const usageMultiplier = drivingHabits.usageStyle === 'aggressive' ? 1.2 : 1

    const annualFuelCost = annualMiles * fuelCost * usageMultiplier
    const annualMaintenance = 1000 * usageMultiplier
    const annualInsurance = 1500
    const annualDepreciation = baseCost * 0.1

    return (
      annualFuelCost +
      annualMaintenance +
      annualInsurance +
      annualDepreciation
    ).toFixed(2)
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
      <Title level={2}>Car Details</Title>
      <Paragraph>
        View detailed information about this car, including features,
        specifications, and images.
      </Paragraph>

      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Image src={car?.imageUrl} alt={`${car?.make} ${car?.model}`} />
          </Col>
          <Col xs={24} md={12}>
            <Title
              level={3}
            >{`${car?.make} ${car?.model} (${car?.year})`}</Title>
            <Paragraph>{car?.description}</Paragraph>
            <Text strong>Color: </Text>
            <Text>{car?.color}</Text>
            <br />
            <Text strong>Last Updated: </Text>
            <Text>{dayjs(car?.updatedAt).format('MMMM D, YYYY')}</Text>

            <div style={{ marginTop: '20px' }}>
              <Button
                icon={<CompressOutlined />}
                onClick={handleAddToComparison}
                style={{ marginRight: '10px' }}
              >
                Add to Comparison
              </Button>
              <Button
                icon={<ShoppingCartOutlined />}
                onClick={handleViewDeals}
                type="primary"
              >
                View Deals
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Tabs defaultActiveKey="1" style={{ marginTop: '20px' }}>
        <TabPane
          tab={
            <span>
              <CarOutlined />
              Specifications
            </span>
          }
          key="1"
        >
          <Card>
            <p>
              <strong>Make:</strong> {car?.make}
            </p>
            <p>
              <strong>Model:</strong> {car?.model}
            </p>
            <p>
              <strong>Year:</strong> {car?.year?.toString()}
            </p>
            <p>
              <strong>Color:</strong> {car?.color}
            </p>
          </Card>
        </TabPane>
        <TabPane
          tab={
            <span>
              <DollarOutlined />
              Total Cost of Ownership
            </span>
          }
          key="2"
        >
          <Card>
            <Form layout="vertical">
              <Form.Item label="Annual Mileage">
                <Input
                  type="number"
                  value={drivingHabits.annualMileage}
                  onChange={e =>
                    setDrivingHabits({
                      ...drivingHabits,
                      annualMileage: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Fuel Type">
                <Input
                  value={drivingHabits.fuelType}
                  onChange={e =>
                    setDrivingHabits({
                      ...drivingHabits,
                      fuelType: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Usage Style">
                <Input
                  value={drivingHabits.usageStyle}
                  onChange={e =>
                    setDrivingHabits({
                      ...drivingHabits,
                      usageStyle: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Form>
            <Title level={4}>Estimated Annual TCO: ${calculateTCO()}</Title>
            <Paragraph>
              This estimate includes insurance, maintenance, fuel/electricity
              costs, and depreciation based on your input.
            </Paragraph>
          </Card>
        </TabPane>
        <TabPane
          tab={
            <span>
              <EnvironmentOutlined />
              Environmental Impact
            </span>
          }
          key="3"
        >
          <Card>
            <p>
              <strong>Emissions Rating:</strong>{' '}
              <Tag
                color={
                  car.emissionsRating === 'Low'
                    ? 'green'
                    : car.emissionsRating === 'Medium'
                    ? 'orange'
                    : 'red'
                }
              >
                {car.emissionsRating ?? 'N/A'}
              </Tag>
            </p>
            <p>
              <strong>Fuel Efficiency:</strong> {car.fuelEfficiency ?? 'N/A'}{' '}
              mpg
            </p>
            <p>
              <strong>Eco-Friendly Features:</strong>{' '}
              {car.ecoFeatures?.join(', ') ?? 'N/A'}
            </p>
          </Card>
        </TabPane>
        <TabPane
          tab={
            <span>
              <ToolOutlined />
              Practical Considerations
            </span>
          }
          key="4"
        >
          <Card>
            <p>
              <strong>Cargo Space:</strong> {car?.cargoSpace ?? 'N/A'} cubic
              feet
            </p>
            <p>
              <strong>Seating Capacity:</strong> {car?.seatingCapacity ?? 'N/A'}
            </p>
            <p>
              <strong>Safety Rating:</strong>{' '}
              <Tag
                color={
                  car?.safetyRating >= 4
                    ? 'green'
                    : car?.safetyRating >= 3
                    ? 'orange'
                    : 'red'
                }
              >
                {car?.safetyRating ?? 'N/A'}/5
              </Tag>
            </p>
            <p>
              <strong>Maintenance Cost:</strong> $
              {car?.maintenanceCost ?? 'N/A'}/year (estimated)
            </p>
          </Card>
        </TabPane>
        <TabPane
          tab={
            <span>
              <ThunderboltOutlined />
              Performance Features
            </span>
          }
          key="5"
        >
          <Card>
            <p>
              <strong>Engine:</strong> {car?.engineType ?? 'N/A'}
            </p>
            <p>
              <strong>Horsepower:</strong> {car?.horsepower ?? 'N/A'} hp
            </p>
            <p>
              <strong>Acceleration (0-60 mph):</strong>{' '}
              {car?.acceleration ?? 'N/A'} seconds
            </p>
            <p>
              <strong>Top Speed:</strong> {car?.topSpeed ?? 'N/A'} mph
            </p>
            <p>
              <strong>Transmission:</strong> {car?.transmission ?? 'N/A'}
            </p>
            <p>
              <strong>Drive Type:</strong> {car?.driveType ?? 'N/A'}
            </p>
          </Card>
        </TabPane>
      </Tabs>

      {deals?.length > 0 && (
        <Card title="Available Deals" style={{ marginTop: '20px' }}>
          {deals?.map(deal => (
            <p key={deal.id}>{`${deal.dealPrice} - ${dayjs(
              deal.dealDate,
            ).format('MMMM D, YYYY')}`}</p>
          ))}
        </Card>
      )}
    </PageLayout>
  )
}
