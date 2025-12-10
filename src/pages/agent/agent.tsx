import { useEffect, useMemo, useState } from 'react'
import { Chat } from './components/chat'

export interface User {
  id: string
  name: string
  avatar?: string
  role?: string
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

export interface Conversation {
  id: string
  name: string
  description?: string
  lastMessage: {
    content: string
    timestamp: string
  }
}

export default function Agent() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [loading, setLoading] = useState(true)

  const users = useMemo<User[]>(() => ([
    { id: 'user', name: 'You', role: 'User' },
    { id: 'ai', name: 'AI Assistant', role: 'Assistant' },
  ]), [])

  useEffect(() => {
    const now = new Date().toISOString()
    const conv: Conversation = {
      id: 'agent',
      name: 'AI Assistant',
      description: 'Describe your request and the AI will respond with analysis and actions.',
      lastMessage: {
        content: 'Welcome to your AI assistant. Share a request to begin.',
        timestamp: now,
      },
    }

    const initialMessages: Message[] = [
      {
        id: 'msg-1',
        senderId: 'ai',
        content: 'Welcome to your AI assistant. Share a request to begin.',
        timestamp: now,
      },
    ]

    setConversations([conv])
    setMessages({ [conv.id]: initialMessages })
    setSelectedConversationId(conv.id)
    setLoading(false)
  }, [])

  const handleSendMessage = (content: string) => {
    if (!selectedConversationId)
      return
    const timestamp = new Date().toISOString()

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      content,
      timestamp,
    }

    setMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), userMessage],
    }))

    setConversations(prev => prev.map(conv => conv.id === selectedConversationId
      ? {
          ...conv,
          lastMessage: {
            content,
            timestamp,
          },
        }
      : conv))

    setIsGenerating(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        senderId: 'ai',
        content: 'Generating: placeholder response with analysis and next steps.',
        timestamp: new Date().toISOString(),
      }

      setMessages(prev => ({
        ...prev,
        [selectedConversationId]: [...(prev[selectedConversationId] || []), aiMessage],
      }))

      setConversations(prev => prev.map(conv => conv.id === selectedConversationId
        ? {
            ...conv,
            lastMessage: {
              content: aiMessage.content,
              timestamp: aiMessage.timestamp,
            },
          }
        : conv))

      setIsGenerating(false)
    }, 1200)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        Loading...
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6">
      <Chat
        conversations={conversations}
        messages={messages}
        users={users}
        selectedConversationId={selectedConversationId}
        onSelectConversation={setSelectedConversationId}
        onSendMessage={handleSendMessage}
        isGenerating={isGenerating}
      />
    </div>
  )
}
