"use client"

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Maximize2,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Predefined mock responses for the AI assistant
const mockResponses: Record<string, string> = {
  hello: "Hello! Welcome to GameVault. How can I help you today? I can assist with finding games, checking order status, or answering questions about our store.",
  hi: "Hi there! I'm your GameVault assistant. What can I help you with today?",
  help: "I can help you with:\n\n- Finding games by genre or platform\n- Checking order status\n- Information about gift cards\n- Account questions\n- Refund policies\n\nJust ask away!",
  games: "We have a wide selection of games across all platforms (PS4, PS5, Xbox). Browse our catalog for Action, RPG, Strategy, Sports, and more. Would you like recommendations for a specific genre?",
  rpg: "Our top RPG games include:\n\n1. Cyber Nexus 2077 - 159.99 GEL\n2. Dragon Quest: Eternal - 149.99 GEL\n3. Starfield Odyssey - 179.99 GEL\n\nAll feature instant digital delivery!",
  action: "Popular action games:\n\n1. Shadow Warriors: Legends - 139.99 GEL\n2. Dungeon Crawler X - 59.99 GEL\n\nBoth available for multiple platforms.",
  order: "To check your order status, please go to Dashboard > Purchases. All digital keys are delivered instantly after purchase. If you have issues, our support team is available 24/7.",
  refund: "Our refund policy:\n\n- Unused digital keys can be refunded within 14 days\n- Used keys are non-refundable\n- Gift cards are non-refundable\n\nContact support for refund requests.",
  gift: "Gift cards are available in 50, 100, and 200 GEL denominations. They never expire and can be used for any game in our store. Perfect for gifting to fellow gamers!",
  discount: "Check our homepage for current discounts! You can also earn 10% off through our referral program. Invite friends and save on your next purchase.",
  payment: "We accept:\n\n- Credit/Debit cards (Visa, Mastercard)\n- PayPal\n- Gift Cards\n- Bank Transfer\n\nAll payments are secure and encrypted.",
  delivery: "All our games feature instant digital delivery! After purchase, you'll receive your game key immediately. No waiting, start playing right away.",
  platform: "We support:\n\n- PlayStation 4 (PS4)\n- PlayStation 5 (PS5)\n- Xbox Series X|S\n\nFilter games by platform in our catalog.",
  thanks: "You're welcome! Is there anything else I can help you with?",
  bye: "Thank you for visiting GameVault! Have a great gaming session. Come back anytime!",
}

function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase()
  
  // Check for keywords in the input
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (lowerInput.includes(keyword)) {
      return response
    }
  }
  
  // Default response
  return "I'm not sure I understand. Could you rephrase that? I can help with:\n\n- Game recommendations\n- Order status\n- Gift cards\n- Payment methods\n- Refund policies\n\nOr type 'help' for more options."
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your GameVault assistant. How can I help you today?",
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 800 + Math.random() * 700)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/80 shadow-lg neon-glow-cyan z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        "fixed bottom-6 right-6 z-50 glass-card border-glass-border shadow-2xl transition-all duration-300",
        isMinimized ? "w-72 h-14" : "w-96 h-[500px]"
      )}
    >
      {/* Header */}
      <CardHeader className="p-3 border-b border-glass-border flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          {!isMinimized && (
            <div>
              <CardTitle className="text-sm font-semibold">AI Assistant</CardTitle>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          )}
          {isMinimized && (
            <CardTitle className="text-sm font-semibold">AI Assistant</CardTitle>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Beta
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 hover:bg-secondary"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 h-[380px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input */}
          <div className="p-3 border-t border-glass-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary hover:bg-primary/80"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are simulated. n8n integration coming soon.
            </p>
          </div>
        </>
      )}
    </Card>
  )
}
