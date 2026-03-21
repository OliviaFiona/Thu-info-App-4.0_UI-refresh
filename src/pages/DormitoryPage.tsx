import React, { useState } from 'react';
import { ChevronLeft, WashingMachine, Droplets, Plug, Zap, Droplet } from 'lucide-react';
import { dormitoryFunctions } from '../data/appData';

interface DormitoryPageProps {
  onBack: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  WashingMachine,
  Droplets,
  Plug,
};

export const DormitoryPage: React.FC<DormitoryPageProps> = ({ onBack }) => {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  // 洗衣机状态数据
  const washerStatus = [
    { id: 1, floor: '1层', available: 2, total: 4 },
    { id: 2, floor: '2层', available: 1, total: 4 },
    { id: 3, floor: '3层', available: 3, total: 4 },
    { id: 4, floor: '4层', available: 0, total: 4 },
  ];

  // 电费数据
  const electricityData = {
    balance: 45.8,
    usage: 12.5,
    daysLeft: 15,
  };

  // 获取当前选中功能的名称
  const getSelectedFunctionName = () => {
    const func = dormitoryFunctions.find(f => f.id === selectedFunction);
    return func?.name || '';
  };

  const renderFunctionContent = () => {
    switch (selectedFunction) {
      case 'washer':
        return (
          <div className="px-5 pb-5">
            <div className="space-y-3">
              {washerStatus.map((floor) => (
                <div key={floor.id} className="bg-white rounded-2xl p-4 shadow-light">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{floor.floor}</p>
                      <p className="text-xs text-muted-foreground">
                        共 {floor.total} 台洗衣机
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${
                        floor.available > 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        {floor.available}
                      </span>
                      <span className="text-sm text-muted-foreground">台空闲</span>
                    </div>
                  </div>
                  {/* 进度条 */}
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        floor.available > 0 ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(floor.available / floor.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'electricity':
        return (
          <div className="px-5 pb-5">
            <div className="bg-white rounded-2xl p-5 shadow-light mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-500/50">
                    <Zap className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">当前余额</p>
                    <p className="text-2xl font-bold text-foreground">¥ {electricityData.balance}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">本月用电</p>
                  <p className="text-lg font-semibold text-foreground">{electricityData.usage} 度</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">预计可用</p>
                  <p className="text-lg font-semibold text-emerald-600">{electricityData.daysLeft} 天</p>
                </div>
              </div>
            </div>
            
            <button className="w-full h-12 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-700 font-medium border border-violet-500/50 hover:bg-violet-500/30 transition-colors">
              立即充值
            </button>
          </div>
        );

      case 'water':
        return (
          <div className="px-5 pb-5">
            <div className="bg-white rounded-2xl p-5 shadow-light mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">饮用水余额</p>
                  <p className="text-2xl font-bold text-blue-600">¥ 23.50</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  可在宿舍楼饮水机上扫码取水
                </p>
              </div>
            </div>
            
            <button className="w-full h-12 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-700 font-medium border border-violet-500/50 hover:bg-violet-500/30 transition-colors">
              立即充值
            </button>
          </div>
        );

      default:
        return null;
    }
  };

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
          <h1 className="text-xl font-bold text-foreground">宿舍</h1>
        </div>
      </header>

      {/* 宿舍信息卡片 */}
      <div className="px-5 py-4">
        <div className="bg-white rounded-2xl p-5 shadow-light">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl icon-purple flex items-center justify-center">
              <span className="text-[#9359FF] text-2xl font-bold">紫</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">紫荆公寓X号楼</p>
              <p className="text-sm text-muted-foreground">XXX室 · X层</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">
                正常住宿
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 功能网格 */}
      {!selectedFunction && (
        <div className="px-5">
          <h2 className="text-lg font-semibold text-foreground mb-3">宿舍服务</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {dormitoryFunctions.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedFunction(item.id)}
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
      )}

      {/* 功能详情 */}
      {selectedFunction && (
        <div className="animate-slide-in-right">
          {/* 返回栏 - 复用宿舍服务和上方卡片的间距 */}
          <div className="px-5 pt-4 pb-3">
            <button
              onClick={() => setSelectedFunction(null)}
              className="flex items-center gap-2 text-[#9359FF]"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">{getSelectedFunctionName()}</span>
            </button>
          </div>
          {renderFunctionContent()}
        </div>
      )}
    </>
  );
};

export default DormitoryPage;
