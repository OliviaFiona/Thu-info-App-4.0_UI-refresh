import React, { useState } from 'react';
import { ChevronLeft, Star, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface EvaluationPageProps {
  onBack: () => void;
}

// 评估数据
const evaluationData = {
  pending: [
    { id: 1, course: '并行计算', teacher: '张教授', deadline: '2026-02-15', completed: false },
    { id: 2, course: '分布式系统导论', teacher: '李教授', deadline: '2026-02-15', completed: false },
    { id: 3, course: '大数据系统导论', teacher: '王教授', deadline: '2026-02-20', completed: false },
  ],
  completed: [
    { id: 4, course: '不确定规划', teacher: '陈教授', completedAt: '2026-01-20', rating: 5 },
    { id: 5, course: '算法与算法复杂性理论', teacher: '刘教授', completedAt: '2026-01-18', rating: 5 },
  ],
};

export const EvaluationPage: React.FC<EvaluationPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  return (
    <div className="min-h-full bg-background animate-slide-in-right">
      {/* 顶部 Header */}
      <header className="pt-12 px-5 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">教学评估</h1>
        </div>
      </header>

      {/* 统计概览 Banner - 浅紫清新风格 紧凑布局 */}
      <div className="px-5 py-3">
        <div className="relative overflow-hidden rounded-2xl p-4 gradient-purple shadow-card-hover">
          {/* 装饰 */}
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-purple-400/10 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-purple-400/10 blur-xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-600/70" />
              <span className="text-purple-700/80 text-sm font-medium">教学评估</span>
            </div>
          </div>

          <div className="relative flex items-center gap-6 mt-3">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-bold text-purple-800 leading-none">{evaluationData.pending.length}</p>
                <p className="text-purple-600/70 text-xs mt-0.5">待评估</p>
              </div>
              <div className="w-px h-8 bg-purple-300/40" />
              <div>
                <p className="text-2xl font-bold text-purple-800 leading-none">{evaluationData.completed.length}</p>
                <p className="text-purple-600/70 text-xs mt-0.5">已完成</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 标签切换 - Tab风格 */}
      <div className="px-5 mt-6">
        <div className="flex items-center gap-6 mb-4">
          <div
            onClick={() => setActiveTab('pending')}
            className="cursor-pointer"
          >
            <div className={`text-base font-semibold transition-colors ${activeTab === 'pending' ? 'text-[#9359FF]' : 'text-gray-400'}`}>
              待评估
            </div>
            <div className={`h-1 rounded-full mt-1.5 transition-all ${activeTab === 'pending' ? 'w-full bg-[#9359FF]' : 'w-0 bg-transparent'}`} />
          </div>
          <div
            onClick={() => setActiveTab('completed')}
            className="cursor-pointer"
          >
            <div className={`text-base font-semibold transition-colors ${activeTab === 'completed' ? 'text-[#00BC7C]' : 'text-gray-400'}`}>
              已完成
            </div>
            <div className={`h-1 rounded-full mt-1.5 transition-all ${activeTab === 'completed' ? 'w-full bg-[#00BC7C]' : 'w-0 bg-transparent'}`} />
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="px-5 pb-8 space-y-3">
        {activeTab === 'pending' ? (
          evaluationData.pending.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-light card-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">
                      待评估
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{item.course}</h3>
                  <p className="text-sm text-muted-foreground">{item.teacher}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-red-500">
                      截止: {item.deadline}
                    </span>
                  </div>
                </div>
                
                <button className="px-4 py-2 rounded-xl bg-[#F2EDFE] text-[#9359FF] text-sm font-medium border border-purple-200 shadow-[0_2px_8px_rgba(147,89,255,0.2)] hover:bg-[#EDE6FD] hover:shadow-[0_4px_12px_rgba(147,89,255,0.3)] transition-all">
                  去评估
                </button>
              </div>
            </div>
          ))
        ) : (
          evaluationData.completed.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-light"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">
                      已完成
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{item.course}</h3>
                  <p className="text-sm text-muted-foreground">{item.teacher}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    完成时间: {item.completedAt}
                  </p>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}

        {activeTab === 'pending' && evaluationData.pending.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <p className="text-muted-foreground">所有课程已评估完成</p>
          </div>
        )}
      </div>

      {/* 提示 */}
      <div className="px-5 pb-8">
        <div className="bg-amber-50 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-700 font-medium">温馨提示</p>
              <p className="text-sm text-amber-600 mt-1">
                请在截止日期前完成教学评估，否则可能影响选课和成绩查询。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
