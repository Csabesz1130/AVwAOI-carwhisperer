import React, { useState, useEffect } from 'react'
import { Typography, Button, Card, Row, Col, notification, List } from 'antd'
import {
  CarOutlined,
  BellOutlined,
  StarOutlined,
  ReadOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { CarImage } from '@/designSystem/ui/CarImage'
import { createApi } from 'unsplash-js'

export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useUserContext()
  const [featuredReviews, setFeaturedReviews] = useState([])
  const [trendingArticles, setTrendingArticles] = useState([])
  const [carImages, setCarImages] = useState({})

  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY || ''
  })

  const fetchCarImage = async (make, model) => {
    try {
      const result = await unsplash.search.getPhotos({
        query: `${make} ${model} car`,
        orientation: 'landscape'
      })
      return result.response?.results[0]?.urls?.regular
    } catch (error) {
      console.error('Error fetching car image:', error)
      return null
    }
  }

  const { data: notifications, isLoading: isLoadingNotifications } = Api.deal.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  }, {
    enabled: !!user?.id,
  })

  useEffect(() => {
    if (location.pathname !== '/home') return;
    
    // Simulating fetching featured reviews and trending articles
    const reviews = [
      {
        id: 1,
        title: 'Amazing SUV',
        content: 'This car exceeded my expectations!',
        author: 'John Doe',
        make: 'Toyota',
        model: 'RAV4',
        year: 2024,
        color: 'Silver'
      },
      {
        id: 2,
        title: 'Efficient Electric Car',
        content: 'Great range and performance!',
        author: 'Jane Smith',
        make: 'Tesla',
        model: 'Model 3',
        year: 2024,
        color: 'White'
      },
    ]
    
    setFeaturedReviews(reviews)

    // Fetch car images when reviews are loaded
    const loadCarImages = async () => {
      if (!reviews.length) return;
      
      const images = {}
      for (const review of reviews) {
        const imageUrl = await fetchCarImage(review.make, review.model)
        if (imageUrl) {
          images[review.id] = imageUrl
        }
      }
      setCarImages(images)
    }
    
    loadCarImages()

    setTrendingArticles([
      { id: 1, title: 'The Future of Self-Driving Cars', date: '2023-05-15' },
      {
        id: 2,
        title: 'Electric vs Hybrid: Which is Right for You?',
        date: '2023-05-14',
      },
    ])
  }, [location.pathname])

  const startQuestionnaire = () => {
    navigate('/organizations/1/questionnaire')
  }

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Welcome to Your Personalized Car Hub</Title>
      <Paragraph>
        Discover your perfect car match and stay updated with the latest
        automotive trends.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Start Your Journey" extra={<CarOutlined />}>
            <Paragraph>
              Get personalized car recommendations based on your lifestyle.
            </Paragraph>
            <Button type="primary" onClick={startQuestionnaire}>
              Start Questionnaire
            </Button>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Latest Notifications" extra={<BellOutlined />}>
            <List
              dataSource={notifications}
              renderItem={item => (
                <List.Item>
                  <Text>
                    {item.status} -{' '}
                    {dayjs(item.dealDate).format('MMMM D, YYYY')}
                  </Text>
                </List.Item>
              )}
              locale={{ emptyText: 'No new notifications' }}
            />
          </Card>
        </Col>
      </Row>

      <Title level={2} style={{ marginTop: '2rem' }}>
        Featured Reviews
      </Title>
      <Row gutter={[16, 16]}>
        {featuredReviews.map(review => (
          <Col xs={24} md={12} key={review.id}>
            <Card title={review.title} extra={<StarOutlined />}>
              {carImages[review.id] && (
                <CarImage
                  year={review.year}
                  make={review.make}
                  model={review.model}
                  color={review.color}
                  imageUrl={carImages[review.id]}
                />
              )}
              <Paragraph>{review.content}</Paragraph>
              <Text type="secondary">By {review.author}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={2} style={{ marginTop: '2rem' }}>
        Trending Articles
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={trendingArticles}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<ReadOutlined />}
              title={item.title}
              description={dayjs(item.date).format('MMMM D, YYYY')}
            />
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
