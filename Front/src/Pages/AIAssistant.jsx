import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Send, Mic, AlertCircle, Shield, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! I'm your emergency AI assistant. I'm here to help you stay calm and guide you through any emergency situation. How can I assist you today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { text: "I need immediate help", urgent: true },
    { text: "What should I do in a medical emergency?", urgent: false },
    { text: "I'm being followed", urgent: true },
    { text: "How to perform CPR?", urgent: false },
    { text: "Fire safety tips", urgent: false },
  ];

  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: "user", content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an emergency AI assistant for resQMe, a safety app. 
        The user said: "${messageText}"
        
        Provide helpful, calm, and actionable guidance. If this is an emergency:
        1. Tell them to stay calm
        2. Provide immediate steps they should take
        3. Remind them they can trigger SOS in the app
        4. Suggest contacting emergency services if needed
        
        Keep responses concise and clear. Be empathetic but professional.`,
      });

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: response || "I'm here to help. Can you tell me more about your situation?" 
      }]);
    } catch (error) {
      console.error("AI error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble connecting right now. If this is an emergency, please trigger the SOS button or call emergency services immediately." 
      }]);
    }

    setIsLoading(false);
  };

  const handleQuickAction = (text) => {
    handleSend(text);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/30">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">AI Emergency Assistant</h1>
          <p className="text-slate-600 mt-2">Get instant guidance and support 24/7</p>
        </div>

        {/* Emergency Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 h-14"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Trigger SOS
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-red-200 hover:bg-red-50 h-14"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Emergency
          </Button>
        </div>

        {/* Chat Interface */}
        <Card className="border-none shadow-2xl">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-white">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                Emergency Assistant
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, idx) => (
                <div 
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-500 text-white' 
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs font-semibold">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-slate-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="border-t p-4 bg-slate-50">
              <div className="text-xs font-medium text-slate-600 mb-2">Quick Actions:</div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickAction(action.text)}
                    className={action.urgent ? 'border-red-200 hover:bg-red-50 text-red-700' : ''}
                  >
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question or concern..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-purple-200 hover:bg-purple-50"
                >
                  <Mic className="w-4 h-4 text-purple-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">Your Privacy is Protected</p>
                <p className="text-sm text-slate-600">
                  All conversations are encrypted and private. The AI assistant provides guidance only and does not replace professional emergency services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}