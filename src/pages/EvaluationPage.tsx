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

      {/* 统计卡片 */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-light">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-muted-foreground">待评估</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{evaluationData.pending.length}</p>
            <p className="text-xs text-muted-foreground mt-1">门课程</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-light">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-muted-foreground">已完成</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{evaluationData.completed.length}</p>
            <p className="text-xs text-muted-foreground mt-1">门课程</p>
          </div>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="px-5">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`
              flex-1 py-3 rounded-xl text-sm font-medium transition-all
              ${activeTab === 'pending'
                ? 'bg-thu-purple text-white'
                : 'bg-white text-foreground shadow-light'
              }
            `}
          >
            待评估 ({evaluationData.pending.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`
              flex-1 py-3 rounded-xl text-sm font-medium transition-all
              ${activeTab === 'completed'
                ? 'bg-thu-purple text-white'
                : 'bg-white text-foreground shadow-light'
              }
            `}
          >
            已完成 ({evaluationData.completed.length})
          </button>
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
                
                <button className="px-4 py-2 rounded-xl bg-thu-purple text-white text-sm font-medium">
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
