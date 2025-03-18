import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Car } from '@prisma/client'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { Button, Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function CarComparisonPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { organizationId } = useParams()
  const [selectedCarIds, setSelectedCarIds] = useState<string[]>([])
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const carIds = searchParams.get('cars')?.split(',') || []
    setSelectedCarIds(carIds)
  }, [location])

  const { data: carsData, isLoading } = Api.car.findMany.useQuery({
    where: { id: { in: selectedCarIds } },
  })

  useEffect(() => {
    if (carsData) {
      setCars(carsData)
    }
  }, [carsData])

  const columns: ColumnsType<{ key: string; feature: string }> = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      key: 'feature',
      fixed: 'left' as const,
      width: 150,
    },
    ...cars.map(car => ({
      title: `${car.make} ${car.model} (${car.year})`,
      dataIndex: car.id,
      key: car.id,
      width: 200,
    })),
  ]

  const dataSource = [
    {
      key: 'price',
      feature: 'Price',
      ...Object.fromEntries(
        cars.map(car => [car.id, `$${car.maintenanceCost || 'N/A'}`]),
      ),
    },
    {
      key: 'fuelEfficiency',
      feature: 'Fuel Efficiency',
      ...Object.fromEntries(
        cars.map(car => [car.id, car.fuelEfficiency || 'N/A']),
      ),
    },
    {
      key: 'safetyRating',
      feature: 'Safety Rating',
      ...Object.fromEntries(
        cars.map(car => [
          car.id,
          <Tag
            color={
              car.safetyRating >= 4
                ? 'green'
                : car.safetyRating >= 3
                ? 'orange'
                : 'red'
            }
          >
            {car.safetyRating}/5
          </Tag>,
        ]),
      ),
    },
    {
      key: 'engineType',
      feature: 'Engine Type',
      ...Object.fromEntries(cars.map(car => [car.id, car.engineType || 'N/A'])),
    },
    {
      key: 'horsepower',
      feature: 'Horsepower',
      ...Object.fromEntries(
        cars.map(car => [car.id, `${car.horsepower || 'N/A'} hp`]),
      ),
    },
    {
      key: 'transmission',
      feature: 'Transmission',
      ...Object.fromEntries(
        cars.map(car => [car.id, car.transmission || 'N/A']),
      ),
    },
    {
      key: 'driveType',
      feature: 'Drive Type',
      ...Object.fromEntries(cars.map(car => [car.id, car.driveType || 'N/A'])),
    },
    {
      key: 'seatingCapacity',
      feature: 'Seating Capacity',
      ...Object.fromEntries(
        cars.map(car => [car.id, `${car.seatingCapacity || 'N/A'} seats`]),
      ),
    },
  ]

  if (isLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Car Comparison</Title>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: true }}
          bordered
        />

        <Button
          type="primary"
          onClick={() =>
            navigate(`/organizations/${organizationId}/recommendations`)
          }
        >
          Back to Recommendations
        </Button>
      </Space>
    </PageLayout>
  )
}
