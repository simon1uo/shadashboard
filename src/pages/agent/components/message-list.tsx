'use client'

import type { Message, User } from '../agent'
import { format, isToday, isYesterday } from 'date-fns'

import { useEffect, useRef } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface MessageListProps {
  messages: Message[]
  users: User[]
  currentUserId?: string
  isGenerating?: boolean
}

export function MessageList({
  messages,
  users,
  currentUserId = 'user',
  isGenerating = false,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isGenerating])

  const getUserById = (userId: string) => users.find(user => user.id === userId)

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    if (isToday(date))
      return format(date, 'HH:mm')
    if (isYesterday(date))
      return `Yesterday ${format(date, 'HH:mm')}`
    return format(date, 'MMM d, HH:mm')
  }

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="space-y-4 py-4">
        {messages.map((message) => {
          const user = getUserById(message.senderId)
          const isOwnMessage = message.senderId === currentUserId

          return (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                isOwnMessage && 'flex-row-reverse',
              )}
            >
              {!isOwnMessage && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {user?.name?.slice(0, 2) || 'AI'}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={cn('flex-1 max-w-[70%]', isOwnMessage && 'items-end flex flex-col')}>
                {!isOwnMessage && (
                  <div className="text-sm font-medium text-foreground mb-1">
                    {user?.name || 'AI'}
                  </div>
                )}
                <div
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm break-words bg-muted',
                    isOwnMessage && 'bg-primary text-primary-foreground',
                  )}
                >
                  <p>{message.content}</p>
                  <div className={cn(
                    'flex items-center gap-2 mt-1 text-xs text-muted-foreground',
                    isOwnMessage && 'text-primary-foreground/70 justify-end',
                  )}
                  >
                    <span>{formatMessageTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {isGenerating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Generating assistant response...
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
