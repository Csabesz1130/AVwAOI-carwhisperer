import React from 'react'
import { Typography, Card, List, Button, Row, Col, Spin } from 'antd'
import { CarOutlined, DollarOutlined, ShopOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DealFinderPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()

  const { data: deals, isLoading } = Api.deal.findMany.useQuery({
    include: { car: true },
  })

  const { data: recommendations } = Api.recommendation.findMany.useQuery({
    include: { car: true },
  })

  const handleViewDetails = (carId: string) => {
    navigate(`/organizations/${organizationId}/cars/${carId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Deal Finder</Title>
      <Paragraph>
        Discover available inventory for recommended car models from local
        dealerships and online marketplaces.
      </Paragraph>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <Title level={3}>Highlighted Deals and Promotions</Title>
          <Row gutter={[16, 16]}>
            {deals?.map(deal => (
              <Col xs={24} sm={12} md={8} key={deal.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={deal.car?.model}
                      src={
                        deal.car?.imageUrl ||
                        'https://via.placeholder.com/300x200'
                      }
                    />
                  }
                >
                  <Card.Meta
                    title={`${deal.car?.make} ${
                      deal.car?.model
                    } (${deal.car?.year?.toString()})`}
                    description={
                      <>
                        <Text strong>
                          <DollarOutlined /> Deal Price: {deal.dealPrice}
                        </Text>
                        <br />
                        <Text type="secondary">
                          <ShopOutlined /> Status: {deal.status}
                        </Text>
                      </>
                    }
                  />
                  <Button
                    type="primary"
                    style={{ marginTop: '10px' }}
                    onClick={() => handleViewDetails(deal.car?.id || '')}
                  >
                    View Details
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          <Title level={3} style={{ marginTop: '20px' }}>
            Recommended Cars
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={recommendations}
            renderItem={recommendation => (
              <List.Item>
                <List.Item.Meta
                  avatar={<CarOutlined style={{ fontSize: '24px' }} />}
                  title={`${recommendation.car?.make} ${
                    recommendation.car?.model
                  } (${recommendation.car?.year?.toString()})`}
                  description={recommendation.reason}
                />
                <Button
                  onClick={() =>
                    handleViewDetails(recommendation.car?.id || '')
                  }
                >
                  View Details
                </Button>
              </List.Item>
            )}
          />
        </>
      )}
    </PageLayout>
  )
}
