import React, { useState, useEffect } from 'react'
import {
  Typography,
  List,
  Card,
  Button,
  Modal,
  Input,
  Select,
  message,
} from 'antd'
import { HeartOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function FavoritesPage() {
  const { user } = useUserContext()
  const { organizationId } = useParams()
  const [favorites, setFavorites] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCar, setSelectedCar] = useState<any>(null)
  const [category, setCategory] = useState('')

  const { data: userCars, refetch } = Api.userCar.findMany.useQuery({
    where: { userId: user?.id },
    include: { car: true },
  })

  const { mutateAsync: updateUserCar } = Api.userCar.update.useMutation()
  const { mutateAsync: deleteUserCar } = Api.userCar.delete.useMutation()

  useEffect(() => {
    if (userCars) {
      setFavorites(userCars)
    }
  }, [userCars])

  const handleRemoveFavorite = async (userCarId: string) => {
    try {
      await deleteUserCar({ where: { id: userCarId } })
      message.success('Car removed from favorites')
      refetch()
    } catch (error) {
      message.error('Failed to remove car from favorites')
    }
  }

  const handleEditCategory = (car: any) => {
    setSelectedCar(car)
    setCategory(car.ownershipStatus || '')
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    if (selectedCar) {
      try {
        await updateUserCar({
          where: { id: selectedCar.id },
          data: { ownershipStatus: category },
        })
        message.success('Category updated successfully')
        setIsModalVisible(false)
        refetch()
      } catch (error) {
        message.error('Failed to update category')
      }
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Favorite Cars</Title>
      <Text>Here you can view and manage your list of favorite cars.</Text>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
        dataSource={favorites}
        renderItem={item => (
          <List.Item>
            <Card
              cover={<img alt={item.car.model} src={item.car.imageUrl} />}
              actions={[
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveFavorite(item.id)}
                >
                  Remove
                </Button>,
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEditCategory(item)}
                >
                  Edit Category
                </Button>,
              ]}
            >
              <Card.Meta
                title={`${item.car.make} ${item.car.model}`}
                description={
                  <>
                    <Text>Year: {item.car.year?.toString()}</Text>
                    <br />
                    <Text>
                      Category: {item.ownershipStatus || 'Uncategorized'}
                    </Text>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Edit Category"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Select a category"
          value={category}
          onChange={value => setCategory(value)}
        >
          <Select.Option value="Family Car">Family Car</Select.Option>
          <Select.Option value="Sports Car">Sports Car</Select.Option>
          <Select.Option value="Luxury Car">Luxury Car</Select.Option>
          <Select.Option value="SUV">SUV</Select.Option>
          <Select.Option value="Electric Car">Electric Car</Select.Option>
        </Select>
      </Modal>
    </PageLayout>
  )
}
