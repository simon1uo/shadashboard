'use client'

import type { Conversation } from '../agent'

import { Bot } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ChatHeaderProps {
  conversation: Conversation | null
}

export function ChatHeader({ conversation }: ChatHeaderProps) {
  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a conversation to start</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarFallback>
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold truncate">{conversation.name}</h2>
            <Badge variant="secondary" className="text-xs cursor-pointer">
              AI Assistant
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {conversation.description || 'Describe your request and the AI will respond with analysis and actions.'}
          </p>
        </div>
      </div>
    </div>
  )
}
