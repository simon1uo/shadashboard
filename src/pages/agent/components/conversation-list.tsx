'use client'

import type { Conversation } from '../agent'
import { format, isThisWeek, isThisYear, isToday, isYesterday } from 'date-fns'

import { MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversation: string | null
  onSelectConversation: (conversationId: string) => void
}

function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp)

  if (isToday(date))
    return format(date, 'h:mm a')
  if (isYesterday(date))
    return 'Yesterday'
  if (isThisWeek(date))
    return format(date, 'EEEE')
  if (isThisYear(date))
    return format(date, 'MMM d')
  return format(date, 'dd/MM/yy')
}

export function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  const sortedConversations = [...conversations].sort((a, b) =>
    new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime(),
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="hidden lg:flex items-center justify-between h-16 px-4 border-b flex-shrink-0">
        <h2 className="text-lg font-semibold">History</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              Clear conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {sortedConversations.map(conversation => (
            <div
              key={conversation.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg cursor-pointer relative overflow-hidden hover:bg-accent/50 transition-colors',
                selectedConversation === conversation.id
                  ? 'bg-accent text-accent-foreground'
                  : '',
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="relative shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {conversation.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <h3 className="font-medium truncate min-w-0">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatMessageTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <p className="text-sm text-muted-foreground truncate flex-1 min-w-0 max-w-[180px] lg:max-w-[200px] pr-2">
                    {conversation.lastMessage.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
