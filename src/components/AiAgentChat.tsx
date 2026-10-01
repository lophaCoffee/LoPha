import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  ChevronDown, 
  MessageSquare, 
  ShieldCheck, 
  Coffee 
} from 'lucide-react';
import { ChatMessage } from '../types/lopha';
import { getSmartLocalResponse, LOPHA_AI_SYSTEM_PROMPT } from '../utils/aiKnowledgeEngine';

interface AiAgentChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialPrompt?: string;
}

export const AiAgentChat: React.FC<AiAgentChatProps> = ({
  isOpen,
  onClose,
  onOpen,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'agent',
      text: 'Xin chào quý khách! Tôi là Trợ Lý Ảo Chuyên Gia Thương Hiệu Lopha Coffee (Công ty Long Phan - Thành lập 2007). Tôi đã học toàn bộ dữ liệu về công nghệ làm sạch sóng siêu âm Cavitation, hồ sơ pháp lý, bảng giá và giải pháp B2B. Quý khách cần hỗ trợ thông tin gì ạ?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        'Công nghệ siêu âm Cavitation hoạt động ra sao?',
        'Hồ sơ pháp lý & MST của Lopha Coffee?',
        'Bảng giá Robusta & Arabica siêu âm?',
        'Chính sách mẫu thử B2B cho quán cafe?',
        'Chứng nhận FDA & ISO đạt được?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle external initialPrompt passed in
  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // 1. Try sending to server proxy /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages.slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.text) {
          const agentMsg: ChatMessage = {
            id: `agent-${Date.now()}`,
            sender: 'agent',
            text: data.text,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, agentMsg]);
          setIsLoading(false);
          return;
        }
      }
      throw new Error('Fallback to local engine');
    } catch {
      // 2. Intelligent offline fallback engine grounded in full Lopha Coffee specs
      const fallbackAnswer = getSmartLocalResponse(textToSend.trim());
      setTimeout(() => {
        const agentMsg: ChatMessage = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          text: fallbackAnswer,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentMsg]);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'agent',
        text: 'Hội thoại đã được làm mới. Tôi sẵn sàng giải đáp bất kỳ thắc mắc nào về cà phê tinh khiết siêu âm Lopha Coffee!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        quickReplies: [
          'Công nghệ siêu âm Cavitation hoạt động ra sao?',
          'Bảng giá sản phẩm chi tiết?',
          'Hồ sơ pháp lý Công ty Long Phan?'
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Bottom Right) */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-[#B79372] via-[#773C1C] to-[#0D1B44] text-[#F0E5D5] shadow-[0_4px_25px_rgba(183,147,114,0.5)] hover:scale-105 transition-all flex items-center gap-2.5 border-2 border-[#95D0E8] group"
          title="Mở Trợ Lý Ảo Lopha AI"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-[#95D0E8] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border border-[#0D1B44] animate-pulse" />
          </div>
          <span className="hidden sm:inline font-bold text-xs tracking-wide font-serif pr-1">
            Trợ Lý AI Lopha
          </span>
        </button>
      )}

      {/* Main Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[90vh] bg-[#0D1B44] border-2 border-[#B79372]/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#071333] via-[#0D1B44] to-[#773C1C] border-b border-[#B79372]/30 flex items-center justify-between text-[#F0E5D5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B79372]/30 border border-[#95D0E8] flex items-center justify-center text-[#95D0E8]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-bold font-serif flex items-center gap-1.5 text-[#F0E5D5]">
                  <span>Trợ Lý Chuyên Gia Lopha AI</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-[#B79372]">
                  Học sâu dữ liệu thương hiệu & công nghệ siêu âm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Làm mới cuộc trò chuyện"
                className="p-1.5 rounded-lg text-[#B79372] hover:text-[#F0E5D5] hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#B79372] hover:text-[#F0E5D5] hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="px-3 py-1 bg-[#071333] border-b border-[#B79372]/20 flex items-center justify-between text-[10px] text-[#95D0E8]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#B79372]" />
              Dữ liệu chuẩn xác từ Công ty Long Phan (2007)
            </span>
            <span className="font-mono text-[#F0E5D5]/60">Gemini AI</span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar bg-[#08122f]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed relative group ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#773C1C] to-[#B79372] text-[#0D1B44] font-medium rounded-br-none shadow-md'
                      : 'bg-[#0f245a] text-[#F0E5D5] border border-[#B79372]/30 rounded-bl-none shadow'
                  }`}
                >
                  {/* Markdown-like formatting helper */}
                  <div className="whitespace-pre-wrap">
                    {msg.text}
                  </div>

                  {/* Copy button on hover for agent messages */}
                  {msg.sender === 'agent' && (
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-[#0D1B44] text-[#B79372] hover:text-[#F0E5D5] transition-opacity"
                      title="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>

                <span className="text-[9px] text-[#B79372]/60 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick replies chips */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(reply)}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-[#0D1B44] border border-[#95D0E8]/40 text-[#95D0E8] hover:bg-[#95D0E8] hover:text-[#0D1B44] transition-colors text-left font-medium"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0f245a] border border-[#B79372]/30 w-fit">
                <div className="w-2 h-2 rounded-full bg-[#95D0E8] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#B79372] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#F0E5D5] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-[#B79372] italic ml-1">Lopha AI đang tra cứu dữ liệu...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#071333] border-t border-[#B79372]/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Hỏi về công nghệ siêu âm, giá bán, pháp lý..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#0D1B44] border border-[#B79372]/40 text-[#F0E5D5] placeholder-[#B79372]/50 focus:outline-none focus:border-[#95D0E8]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2 rounded-xl bg-gradient-to-r from-[#B79372] to-[#773C1C] text-[#0D1B44] disabled:opacity-40 hover:brightness-110 transition-all font-bold"
              >
                <Send className="w-4 h-4 text-[#0D1B44]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
