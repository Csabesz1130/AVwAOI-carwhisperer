import React, { useState, useEffect } from 'react'
import { Typography, Card, Button, Row, Col, Space, Rate, List } from 'antd'
import { PlusOutlined, MinusOutlined, CarOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CarComparisonPage() {
  const [selectedCars, setSelectedCars] = useState<any[]>([])
  const [availableCars, setAvailableCars] = useState<any[]>([])
  const [isPremium, setIsPremium] = useState(false)
  const navigate = useNavigate()
  const { organizationId } = useParams()

  const { data: cars, isLoading } = Api.car.findMany.useQuery({})
  const { data: user } = Api.user.findFirst.useQuery({
    where: { id: 'current-user-id' },
  })

  useEffect(() => {
    if (cars) {
      setAvailableCars(cars)
    }
  }, [cars])

  useEffect(() => {
    if (user) {
      setIsPremium(user.globalRole === 'PREMIUM')
    }
  }, [user])

  const addCar = (car: any) => {
    if (selectedCars.length < (isPremium ? 5 : 2)) {
      setSelectedCars([...selectedCars, car])
      setAvailableCars(availableCars.filter(c => c.id !== car.id))
    }
  }

  const removeCar = (car: any) => {
    setSelectedCars(selectedCars.filter(c => c.id !== car.id))
    setAvailableCars([...availableCars, car])
  }

  const renderCarComparison = () => {
    return (
      <Row gutter={[16, 16]}>
        {selectedCars.map(car => (
          <Col key={car.id} xs={24} sm={12} md={24 / selectedCars.length}>
            <Card
              title={`${car.make} ${car.model} (${car.year?.toString()})`}
              extra={
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => removeCar(car)}
                />
              }
              cover={<img alt={car.model} src={car.imageUrl} />}
            >
              <Space direction="vertical" size="small">
                <Text strong>Fuel Efficiency:</Text>
                <Rate
                  disabled
                  defaultValue={Math.floor(Math.random() * 5) + 1}
                />
                <Text strong>Safety:</Text>
                <Rate
                  disabled
                  defaultValue={Math.floor(Math.random() * 5) + 1}
                />
                <Text strong>Technology:</Text>
                <Rate
                  disabled
                  defaultValue={Math.floor(Math.random() * 5) + 1}
                />
                <Paragraph>{car.description}</Paragraph>
                <List
                  size="small"
                  header={<Text strong>Pros:</Text>}
                  dataSource={['Pro 1', 'Pro 2', 'Pro 3']}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
                <List
                  size="small"
                  header={<Text strong>Cons:</Text>}
                  dataSource={['Con 1', 'Con 2', 'Con 3']}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
                <Text strong>Customer Reviews:</Text>
                <Rate disabled defaultValue={4.5} allowHalf />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  if (isLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Car Comparison</Title>
      <Paragraph>
        Compare selected cars side by side on key features like fuel efficiency,
        safety, and technology.
        {isPremium
          ? ' As a premium user, you can compare up to five cars.'
          : ' You can compare up to two cars.'}
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {renderCarComparison()}

        <Card title="Available Cars">
          <Row gutter={[16, 16]}>
            {availableCars.map(car => (
              <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={<img alt={car.model} src={car.imageUrl} />}
                  actions={[
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => addCar(car)}
                      disabled={selectedCars.length >= (isPremium ? 5 : 2)}
                    >
                      Add to Compare
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={`${car.make} ${car.model}`}
                    description={`Year: ${car.year?.toString()}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        <Button
          type="primary"
          icon={<CarOutlined />}
          onClick={() => navigate(`/organizations/${organizationId}/cars`)}
        >
          View All Cars
        </Button>
      </Space>
    </PageLayout>
  )
}
