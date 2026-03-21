import { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, Menu, Plus, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// 快捷问题
const quickQuestions = [
  '教务通知',
  '学生工作通知',
  '就业通知',
  '图书馆开放时间',
];

export const AIPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('DeepSeek-R1-Distill-32B');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const models = [
    'DeepSeek-R1-Distill-32B',
    'DeepSeek-R1-Distill-14B',
    'DeepSeek-V3',
    'GPT-4',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: '您好！我是DeepSeek AI助手，很高兴为您服务。我可以帮您查询校园信息、解答学习问题、提供生活建议等。请问有什么可以帮助您的吗？',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const responses: Record<string, string> = {
        '教务通知': '最新的教务通知包括：2025-2026学年春季学期选课安排、期末考试时间安排、以及教学评估通知。您可以在"动态"页面查看详细信息。',
        '学生工作通知': '学生工作通知包括：奖学金评选通知、学生社团活动审批、以及学生违纪处理公告等。',
        '就业通知': '就业通知包括：校园招聘会安排、就业指导讲座、以及企业宣讲会信息。本周五下午有腾讯校园招聘会，地点在职业发展中心。',
        '图书馆开放时间': '图书馆开放时间：周一至周日 7:00-23:00。期末考试期间延长至24:00。节假日开放时间请留意图书馆公告。',
      };

      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: responses[question] || '好的，我来帮您查询相关信息。',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 顶部 Header */}
      <header className="pt-8 px-4 pb-3 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <button className="p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          
          {/* 模型选择器 */}
          <div className="relative">
            <button
              onClick={() => setIsModelOpen(!isModelOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 text-sm font-medium text-slate-700"
            >
              {selectedModel}
              <ChevronDown className={`w-4 h-4 transition-transform ${isModelOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isModelOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-scale-in">
                {models.map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setIsModelOpen(false);
                    }}
                    className={`
                      w-full px-4 py-2.5 text-left text-sm transition-colors
                      ${selectedModel === model ? 'bg-violet-50 text-violet-600' : 'text-slate-700 hover:bg-slate-50'}
                    `}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="p-2 -mr-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Plus className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-36">
        {messages.length === 0 ? (
          // 欢迎页面
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            {/* Logo */}
            <div className="relative mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <h2 className="text-sm font-semibold text-slate-800 mb-1 text-center px-4">
              我可以帮您查询校园信息、管理日程、提供生活建议
            </h2>
            <p className="text-xs text-slate-400 text-center">
              快向我提问吧！
            </p>
          </div>
        ) : (
          // 消息列表
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`
                  flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`
                    max-w-[75%] px-4 py-2.5 rounded-2xl text-xs
                    ${message.type === 'user'
                      ? 'bg-violet-500 text-white rounded-br-md'
                      : 'bg-white shadow-sm border border-slate-100 rounded-bl-md'
                    }
                  `}
                >
                  <p className={`leading-relaxed ${message.type === 'user' ? 'text-white' : 'text-slate-700'}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 底部输入区域 - 在底部导航栏上方 */}
      <div className="fixed bottom-[72px] left-0 right-0 px-4 py-3 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
        {/* 快捷标签 */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 mb-2 justify-center">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1.5 rounded-full bg-white text-[10px] text-slate-500 shadow-sm border border-slate-100 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        )}
        
        {/* 输入框 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="想聊些什么呀？"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full h-11 pl-4 pr-4 rounded-full bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm text-sm"
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`
              w-11 h-11 rounded-full flex items-center justify-center
              transition-all duration-300 ease-spring
              ${inputValue.trim()
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-200 hover:scale-105'
                : 'bg-slate-200 text-slate-400'
              }
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPage;
