// app/routes/_logged.organizations.$organizationId.virtual-garage/components/ComparisonChat/index.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card' // Fixed import path to local UI components
import { cn } from '@/utils/cn'
import { Bot, Send, ThumbsDown, ThumbsUp, User } from 'lucide-react'
import React, { useState } from 'react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  feedback?: 'positive' | 'negative'
  relatedCars?: string[]
  suggestionType?: 'comparison' | 'feature' | 'price' | 'maintenance'
}

interface ComparisonChatProps {
  selectedCars: Array<{
    id: string
    name: string
    category: string
    engineType: string
    price: string
  }>
  onSuggestionSelect?: (type: string, carIds: string[]) => void
}

const ComparisonChat: React.FC<ComparisonChatProps> = ({
  selectedCars,
  onSuggestionSelect,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        'Hello! I can help you compare these vehicles and answer any questions about their features, performance, or value. What would you like to know?',
      timestamp: new Date(),
      relatedCars: selectedCars.map(car => car.id),
    },
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      relatedCars: selectedCars.map(car => car.id),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(input, selectedCars),
        timestamp: new Date(),
        relatedCars: selectedCars.map(car => car.id),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsThinking(false)
    }, 1000)
  }

  const generateResponse = (userInput: string, cars: typeof selectedCars) => {
    const input = userInput.toLowerCase()
    if (input.includes('price') || input.includes('cost')) {
      return `Looking at the prices, ${cars[0].name} is priced at ${cars[0].price} while ${cars[1].name} is ${cars[1].price}. Would you like a detailed cost analysis including maintenance and fuel costs?`
    }
    if (input.includes('engine') || input.includes('power')) {
      return `${cars[0].name} uses a ${cars[0].engineType} engine, while ${cars[1].name} has a ${cars[1].engineType} engine. Each has its advantages - would you like me to explain the specific benefits of each?`
    }
    return `I understand you're interested in comparing these vehicles. What specific aspects would you like to know more about? I can help with:
    - Performance and specifications
    - Cost analysis and value retention
    - Feature comparison
    - Maintenance requirements`
  }

  const handleFeedback = (
    messageId: string,
    feedback: 'positive' | 'negative',
  ) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === messageId ? { ...msg, feedback } : msg)),
    )
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-500" />
          Comparison Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 p-4 rounded-lg',
              message.type === 'assistant' ? 'bg-gray-100' : 'bg-blue-50',
            )}
          >
            {message.type === 'assistant' ? (
              <Bot className="w-6 h-6 text-blue-500" />
            ) : (
              <User className="w-6 h-6 text-gray-500" />
            )}
            <div className="flex-1">
              <p className="text-sm">{message.content}</p>
              {message.type === 'assistant' && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleFeedback(message.id, 'positive')}
                    className={cn(
                      'p-1 rounded hover:bg-gray-200',
                      message.feedback === 'positive' && 'text-green-500',
                    )}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleFeedback(message.id, 'negative')}
                    className={cn(
                      'p-1 rounded hover:bg-gray-200',
                      message.feedback === 'negative' && 'text-red-500',
                    )}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex gap-3 p-4 bg-gray-100 rounded-lg">
            <Bot className="w-6 h-6 text-blue-500" />
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex items-center gap-2 w-full">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Ask me anything about these vehicles..."
            className="flex-1 p-2 border rounded-lg resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ComparisonChat
