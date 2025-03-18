import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout, ErrorBoundary } from '@/designSystem'
import {
  CarOutlined,
  DollarOutlined,
  NotificationOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography
const { Option } = Select

export default function VirtualGaragePageWrapper() {
  return (
    <ErrorBoundary>
      <VirtualGaragePage />
    </ErrorBoundary>
  )
}

function VirtualGaragePage() {
  const { user } = useUserContext()
  const [cars, setCars] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const { data: userCars, refetch, isLoading, error } = Api.userCar.findMany.useQuery({
    where: { userId: user?.id },
    include: { car: true },
  }, { enabled: !!user?.id, retry: 3 })

  const { mutateAsync: addCarToGarage } = Api.userCar.create.useMutation()
  const { mutateAsync: updateUserCar } = Api.userCar.update.useMutation()
  const { mutateAsync: deleteUserCar } = Api.userCar.delete.useMutation()

  useEffect(() => {
    if (userCars) {
      setCars(userCars)
    }
  }, [userCars])

  const handleAddCar = async (values: any) => {
    try {
      await addCarToGarage({
        data: {
          userId: user?.id,
          carId: values.carId,
          ownershipStatus: values.ownershipStatus,
          purchaseDate: values.purchaseDate,
          primaryUse: values.primaryUse,
          engineType: values.engineType,
          transmissionType: values.transmissionType,
          fuelEfficiency: values.fuelEfficiency,
          emissionsConcern: values.emissionsConcern,
        },
      })
      message.success('Car added to garage successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to add car to garage')
    }
  }

  const handleUpdateCategory = async (
    userCarId: string,
    category: string,
    field: string,
  ) => {
    try {
      await updateUserCar({
        where: { id: userCarId },
        data: { [field]: category },
      })
      message.success(`Car ${field} updated successfully`)
      refetch()
    } catch (error) {
      message.error(`Failed to update car ${field}`)
    }
  }

  const handleDeleteCar = async (userCarId: string) => {
    try {
      await deleteUserCar({ where: { id: userCarId } })
      message.success('Car removed from garage successfully')
      refetch()
    } catch (error) {
      message.error('Failed to remove car from garage')
    }
  }

  if (error) {
    return (
      <PageLayout layout="narrow">
        <Alert
          message="Error"
          description={`Failed to load garage: ${error.message}`}
          type="error"
          showIcon
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow" isLoading={isLoading}>
      <Title level={2}>Virtual Garage</Title>
      <Text>
        Keep track of your favorite cars and manage your virtual garage.
      </Text>

      <Button
        type="primary"
        icon={<CarOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        Add Car to Garage
      </Button>

      <Row gutter={[16, 16]}>
        {cars?.map(userCar => (
          <Col xs={24} sm={12} md={8} key={userCar.id}>
            <Card
              title={`${userCar.car.make} ${userCar.car.model} (${userCar.car.year})`}
              extra={
                <Button danger onClick={() => handleDeleteCar(userCar.id)}>
                  Remove
                </Button>
              }
            >
              <p>
                <CarOutlined /> Category:{' '}
                <Select
                  defaultValue={userCar.ownershipStatus}
                  style={{ width: 120 }}
                  onChange={value =>
                    handleUpdateCategory(userCar.id, value, 'ownershipStatus')
                  }
                >
                  <Option value="family">Family</Option>
                  <Option value="sports">Sports</Option>
                  <Option value="electric">Electric</Option>
                  <Option value="suv">SUV</Option>
                  <Option value="truck">Truck</Option>
                </Select>
              </p>
              <p>
                <CarOutlined /> Primary Use:{' '}
                <Select
                  defaultValue={userCar.primaryUse}
                  style={{ width: 120 }}
                  onChange={value =>
                    handleUpdateCategory(userCar.id, value, 'primaryUse')
                  }
                >
                  <Option value="commuting">Commuting</Option>
                  <Option value="familyUse">Family Use</Option>
                  <Option value="offRoad">Off-Road</Option>
                  <Option value="longDistance">Long Distance</Option>
                  <Option value="cityDriving">City Driving</Option>
                </Select>
              </p>
              <p>
                <CarOutlined /> Engine Type:{' '}
                <Select
                  defaultValue={userCar.engineType}
                  style={{ width: 120 }}
                  onChange={value =>
                    handleUpdateCategory(userCar.id, value, 'engineType')
                  }
                >
                  <Option value="gasoline">Gasoline</Option>
                  <Option value="diesel">Diesel</Option>
                  <Option value="hybrid">Hybrid</Option>
                  <Option value="electric">Electric</Option>
                </Select>
              </p>
              <p>
                <DollarOutlined /> Price: $
                {userCar.car.price?.toString() || 'N/A'}
              </p>
              <p>
                <NotificationOutlined /> Added on:{' '}
                {dayjs(userCar.createdAt).format('MMMM D, YYYY')}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Add Car to Garage"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCar} layout="vertical">
          <Form.Item
            name="carId"
            label="Car"
            rules={[{ required: true, message: 'Please select a car' }]}
          >
            <Select placeholder="Select a car">
              {/* You would need to fetch available cars from the API and populate this Select */}
              <Option value="car1">Car 1</Option>
              <Option value="car2">Car 2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="ownershipStatus"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              <Option value="family">Family</Option>
              <Option value="sports">Sports</Option>
              <Option value="electric">Electric</Option>
              <Option value="suv">SUV</Option>
              <Option value="truck">Truck</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="primaryUse"
            label="Primary Use"
            rules={[{ required: true, message: 'Please select primary use' }]}
          >
            <Select placeholder="Select primary use">
              <Option value="commuting">Commuting</Option>
              <Option value="familyUse">Family Use</Option>
              <Option value="offRoad">Off-Road</Option>
              <Option value="longDistance">Long Distance</Option>
              <Option value="cityDriving">City Driving</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="engineType"
            label="Engine Type"
            rules={[{ required: true, message: 'Please select engine type' }]}
          >
            <Select placeholder="Select engine type">
              <Option value="gasoline">Gasoline</Option>
              <Option value="diesel">Diesel</Option>
              <Option value="hybrid">Hybrid</Option>
              <Option value="electric">Electric</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="transmissionType"
            label="Transmission Type"
            rules={[
              { required: true, message: 'Please select transmission type' },
            ]}
          >
            <Select placeholder="Select transmission type">
              <Option value="automatic">Automatic</Option>
              <Option value="manual">Manual</Option>
              <Option value="cvt">CVT</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="fuelEfficiency"
            label="Fuel Efficiency Importance"
            rules={[
              {
                required: true,
                message: 'Please select fuel efficiency importance',
              },
            ]}
          >
            <Select placeholder="Select importance">
              <Option value="veryImportant">Very Important</Option>
              <Option value="important">Important</Option>
              <Option value="somewhatImportant">Somewhat Important</Option>
              <Option value="notImportant">Not Important</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="emissionsConcern"
            label="Emissions Concern"
            rules={[
              { required: true, message: 'Please select emissions concern' },
            ]}
          >
            <Select placeholder="Select concern level">
              <Option value="veryImportant">Very Important</Option>
              <Option value="important">Important</Option>
              <Option value="somewhatImportant">Somewhat Important</Option>
              <Option value="notImportant">Not Important</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[
              { required: true, message: 'Please enter the purchase date' },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add to Garage
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Card style={{ marginTop: 16 }}>
        <Title level={4}>
          <RobotOutlined /> AI Insights
        </Title>
        <Text>
          Our AI is constantly analyzing market trends and your garage. We'll
          notify you of significant changes, such as price drops or rising
          resale values, and suggest better options based on your preferences.
        </Text>
      </Card>
    </PageLayout>
  )
}
