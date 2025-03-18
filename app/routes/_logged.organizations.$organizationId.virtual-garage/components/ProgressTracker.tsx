import { Steps } from 'antd'
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import React from 'react'

type Step = {
  title: string
  description?: string
  status: 'wait' | 'process' | 'finish' | 'error'
}

type Props = {
  steps: Step[]
  current: number
}

export const ProgressTracker: React.FC<Props> = ({ steps, current }) => {
  return (
    <Steps
      direction="vertical"
      current={current}
      items={steps.map(step => ({
        title: step.title,
        description: step.description,
        status: step.status,
        icon:
          step.status === 'process' ? (
            <LoadingOutlined />
          ) : step.status === 'finish' ? (
            <CheckCircleOutlined />
          ) : undefined,
      }))}
    />
  )
}
