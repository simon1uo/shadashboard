'use client'

import type { Conversation, Message, User } from '../agent'
import { Menu, X } from 'lucide-react'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ChatHeader } from './chat-header'
import { ConversationList } from './conversation-list'
import { MessageInput } from './message-input'
import { MessageList } from './message-list'

interface ChatProps {
  conversations: Conversation[]
  messages: Record<string, Message[]>
  users: User[]
  selectedConversationId: string | null
  onSelectConversation: (id: string) => void
  onSendMessage: (content: string) => void
  isGenerating?: boolean
}

export function Chat({
  conversations,
  messages,
  users,
  selectedConversationId,
  onSelectConversation,
  onSendMessage,
  isGenerating = false,
}: ChatProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentConversation = conversations.find(conv => conv.id === selectedConversationId)
  const currentMessages = selectedConversationId ? messages[selectedConversationId] || [] : []

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-full min-h-[600px] max-h-[calc(100vh-200px)] flex rounded-lg border overflow-hidden bg-background">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={`
          w-100 border-r bg-background flex-shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:relative lg:block
          fixed inset-y-0 left-0 z-50
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="lg:hidden p-4 border-b flex items-center justify-between bg-background">
            <h2 className="text-lg font-semibold">History</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversationId}
            onSelectConversation={(id) => {
              onSelectConversation(id)
              setIsSidebarOpen(false)
            }}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-background">
          <div className="flex items-center h-16 px-4 border-b bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="cursor-pointer lg:hidden mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>

            <div className="flex-1">
              <ChatHeader
                conversation={currentConversation || null}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            {selectedConversationId
              ? (
                  <>
                    <MessageList
                      messages={currentMessages}
                      users={users}
                      isGenerating={isGenerating}
                    />

                    <MessageInput
                      onSendMessage={onSendMessage}
                      disabled={isGenerating}
                    />
                  </>
                )
              : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">
                        Choose a conversation on the left and describe your idea.
                      </p>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
