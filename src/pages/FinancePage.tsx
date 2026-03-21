import React from 'react';
import { ChevronLeft, CreditCard, Landmark, Receipt, Banknote } from 'lucide-react';
import { financeFunctions } from '../data/appData';

interface FinancePageProps {
  onBack: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  Landmark,
  Receipt,
  Banknote,
};

export const FinancePage: React.FC<FinancePageProps> = ({ onBack }) => {
  return (
    <>
      {/* 顶部 Header - 移出动画容器以实现 sticky */}
      <header className="pt-5 px-4 pb-2 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">校园财务</h1>
        </div>
      </header>

      {/* 校园卡余额卡片 */}
      <div className="px-5 py-4">
        <div className="relative overflow-hidden rounded-3xl p-6 gradient-purple shadow-card-hover">
          {/* 装饰 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-400/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-purple-400/10 blur-xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-purple-600/70" />
              <span className="text-purple-700/80 text-sm">校园卡余额</span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <p className="text-4xl font-bold text-purple-800">¥ 128.50</p>
              <button className="px-4 py-2 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-700 text-sm font-medium border border-violet-500/50 hover:bg-violet-500/30 transition-colors">
                立即充值
              </button>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-purple-300/30">
              <div>
                <p className="text-purple-600/70 text-xs">卡号</p>
                <p className="text-purple-800 font-medium">2025XXXXXX</p>
              </div>
              <div className="w-px h-8 bg-purple-300/40" />
              <div>
                <p className="text-purple-600/70 text-xs">状态</p>
                <p className="text-emerald-600 font-medium">正常</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 功能网格 */}
      <div className="px-5">
        <h2 className="text-lg font-semibold text-foreground mb-3">财务服务</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {financeFunctions.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <button
                key={item.id}
                className="bg-white rounded-2xl p-5 shadow-light card-hover flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-500/20 backdrop-blur-sm flex items-center justify-center border border-violet-500/50">
                  <Icon className="w-7 h-7 text-violet-700" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 最近交易 */}
      <div className="px-5 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">最近交易</h2>
        
        <div className="bg-white rounded-2xl shadow-light overflow-hidden">
          {[
            { name: '紫荆园食堂', amount: -15.5, time: '今天 12:30', type: 'expense' },
            { name: '校园卡充值', amount: 100, time: '昨天 18:20', type: 'income' },
            { name: '物美超市', amount: -32.8, time: '昨天 17:45', type: 'expense' },
            { name: '图书馆打印', amount: -2, time: '前天 14:15', type: 'expense' },
          ].map((transaction, index) => (
            <div
              key={index}
              className={`px-4 py-3 flex items-center justify-between ${
                index !== 3 ? 'border-b border-border' : ''
              }`}
            >
              <div>
                <p className="font-medium text-foreground">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">{transaction.time}</p>
              </div>
              <span className={`font-semibold ${
                transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground'
              }`}>
                {transaction.type === 'income' ? '+' : ''}{transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default FinancePage;
