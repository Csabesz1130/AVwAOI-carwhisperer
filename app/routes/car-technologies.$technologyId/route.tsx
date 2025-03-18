import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useParams } from '@remix-run/react'
import { Button, Card, Image, Input, message, Typography } from 'antd'
import { useState } from 'react'

const { Title, Paragraph, Text } = Typography

export default function TechnologyDetailPage() {
  const { technologyId } = useParams()
  const [question, setQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { data: technology, isLoading: isTechnologyLoading } =
    Api.carTechnology.findUnique.useQuery({
      where: { id: technologyId as string },
    })

  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  const handleAskAI = async () => {
    if (!question.trim()) {
      message.warning('Please enter a question')
      return
    }

    setIsLoading(true)
    try {
      const { answer } = await generateText({
        prompt: `Question about ${technology?.name}: ${question}\nPlease provide a detailed answer based on the following information:\n${technology?.howItWorks}`,
      })
      setAiResponse(answer)
    } catch (error) {
      message.error('Failed to get AI response')
    } finally {
      setIsLoading(false)
    }
  }

  if (isTechnologyLoading) {
    return (
      <PageLayout isLoading>
        <div />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>{technology?.name}</Title>
        {technology?.imageUrl && (
          <Image
            src={technology.imageUrl}
            alt={technology.name}
            style={{ maxWidth: '100%', marginBottom: 24 }}
          />
        )}

        <Title level={3}>How It Works</Title>
        <Paragraph>{technology?.howItWorks}</Paragraph>

        <Title level={3}>Benefits</Title>
        <ul>
          {technology?.benefits.map((benefit, index) => (
            <li key={index}>
              <Text>{benefit}</Text>
            </li>
          ))}
        </ul>

        <Title level={3}>Drawbacks</Title>
        <ul>
          {technology?.drawbacks.map((drawback, index) => (
            <li key={index}>
              <Text>{drawback}</Text>
            </li>
          ))}
        </ul>

        <Card title="Ask AI About This Technology" style={{ marginTop: 24 }}>
          <Input.TextArea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask a question about this technology..."
            style={{ marginBottom: 16 }}
          />
          <Button type="primary" onClick={handleAskAI} loading={isLoading}>
            Ask AI
          </Button>
          {aiResponse && (
            <Paragraph style={{ marginTop: 16 }}>
              <Text strong>AI Response:</Text>
              <br />
              {aiResponse}
            </Paragraph>
          )}
        </Card>
      </Card>
    </PageLayout>
  )
}
