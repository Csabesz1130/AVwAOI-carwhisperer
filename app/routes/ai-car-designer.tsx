import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Button, Form, Image, Input, Typography, message } from 'antd'
import { useState } from 'react'

const { Title, Paragraph } = Typography

export default function AiCarDesignerPage() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const { mutateAsync: generateImage, isLoading } = Api.ai.generateImage.useMutation()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      message.warning('Please enter a description of your dream car')
      return
    }

    try {
      const { url } = await generateImage({ prompt })
      setImageUrl(url)
    } catch (error) {
      message.error('Failed to generate image')
    }
  }

  return (
    <PageLayout layout="narrow" isCentered>
      <Title level={2}>AI Car Designer</Title>
      <Paragraph>Describe your dream car and let our AI visualize it for you.</Paragraph>

      <Form onFinish={handleGenerate} layout="vertical" style={{ width: '100%' }}>
        <Form.Item label="Car Description">
          <Input.TextArea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={4}
            placeholder="e.g. Red sporty electric coupe with black rims"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Generate Image
        </Button>
      </Form>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt="AI generated car"
          style={{ marginTop: 24, maxWidth: '100%' }}
        />
      )}
    </PageLayout>
  )
}
