import { SearchOutlined } from '@ant-design/icons'
import { PageLayout } from '@/designSystem'
import { Button, Card, Col, Input, List, Row, Typography } from 'antd'
import { useState } from 'react'
import { Api } from '@/core/trpc'
import { useNavigate } from '@remix-run/react'

const { Title, Paragraph } = Typography

export default function CarTechnologiesPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: technologies, isLoading } = Api.carTechnology.findMany.useQuery()

  const filteredTechnologies = technologies?.filter(tech => 
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Car Technologies</Title>
      <Paragraph>
        Explore the latest automotive technologies and innovations shaping the future of driving.
      </Paragraph>

      <Input
        prefix={<SearchOutlined />}
        placeholder="Search technologies..."
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]}>
        {filteredTechnologies?.map(technology => (
          <Col xs={24} sm={12} md={8} key={technology.id}>
            <Card
              hoverable
              cover={
                technology.imageUrl && (
                  <img
                    alt={technology.name}
                    src={technology.imageUrl}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                )
              }
            >
              <Card.Meta
                title={technology.name}
                description={technology.description}
              />
              <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={() => navigate(`/car-technologies/${technology.id}`)}
              >
                Learn More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
