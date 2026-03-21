import React, { useState } from 'react';
import { ChevronLeft, Network, Monitor, Wifi, Smartphone, Laptop, Tablet } from 'lucide-react';
import { networkFunctions } from '../data/appData';

interface NetworkPageProps {
  onBack: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Network,
  Monitor,
};

export const NetworkPage: React.FC<NetworkPageProps> = ({ onBack }) => {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  // 在线设备数据
  const onlineDevices = [
    { id: 1, name: 'iPhone 15 Pro', type: 'phone', ip: '166.111.XX.XX', time: '2小时前' },
    { id: 2, name: 'MacBook Pro', type: 'laptop', ip: '166.111.XX.XX', time: '3小时前' },
    { id: 3, name: 'iPad Air', type: 'tablet', ip: '166.111.XX.XX', time: '1天前' },
  ];

  // 网络使用数据
  const networkData = {
    used: 45.2,
    total: 100,
    unit: 'GB',
    expireDate: '2026-02-28',
  };

  const renderFunctionContent = () => {
    switch (selectedFunction) {
      case 'details':
        return (
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">校园网详情</h3>
            
            {/* 流量使用卡片 */}
            <div className="bg-white rounded-2xl p-5 shadow-light mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-thu-purple/10 flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-thu-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">本月已用流量</p>
                  <p className="text-2xl font-bold text-foreground">
                    {networkData.used} <span className="text-lg text-muted-foreground">/ {networkData.total} GB</span>
                  </p>
                </div>
              </div>
              
              {/* 进度条 */}
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full gradient-purple transition-all"
                  style={{ width: `${(networkData.used / networkData.total) * 100}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-muted-foreground">
                  剩余 {(networkData.total - networkData.used).toFixed(1)} GB
                </p>
                <p className="text-xs text-muted-foreground">
                  有效期至 {networkData.expireDate}
                </p>
              </div>
            </div>

            {/* 网络信息 */}
            <div className="bg-white rounded-2xl p-5 shadow-light">
              <h4 className="font-medium text-foreground mb-3">网络信息</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">账号</span>
                  <span className="text-sm text-foreground">2025XXXXXX</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">套餐</span>
                  <span className="text-sm text-foreground">学生基础套餐</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">状态</span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">
                    正常
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'devices':
        return (
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">在线设备</h3>
            
            <div className="space-y-3">
              {onlineDevices.map((device) => (
                <div key={device.id} className="bg-white rounded-2xl p-4 shadow-light">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-thu-purple/10 flex items-center justify-center">
                      {device.type === 'phone' && <Smartphone className="w-6 h-6 text-thu-purple" />}
                      {device.type === 'laptop' && <Laptop className="w-6 h-6 text-thu-purple" />}
                      {device.type === 'tablet' && <Tablet className="w-6 h-6 text-thu-purple" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{device.name}</p>
                      <p className="text-xs text-muted-foreground">{device.ip}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">
                        在线
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{device.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-2xl">
              <p className="text-sm text-amber-700">
                提示：学生账号最多可同时登录 3 台设备
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
          <h1 className="text-xl font-bold text-foreground">校园网</h1>
        </div>
      </header>

      {/* 网络状态卡片 */}
      <div className="px-5 py-4">
        <div className="bg-white rounded-2xl p-5 shadow-light">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">已连接</p>
              <p className="text-sm text-muted-foreground">Tsinghua-Secure</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-600">网络正常</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 功能网格 */}
      {!selectedFunction && (
        <div className="px-5">
          <h2 className="text-lg font-semibold text-foreground mb-3">网络服务</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {networkFunctions.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedFunction(item.id)}
                  className="bg-white rounded-2xl p-5 shadow-light card-hover flex flex-col items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-thu-purple/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-thu-purple" />
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
          <div className="px-5 mb-4">
            <button
              onClick={() => setSelectedFunction(null)}
              className="flex items-center gap-2 text-thu-purple"
            >
              <ChevronLeft className="w-5 h-5" />
              返回
            </button>
          </div>
          {renderFunctionContent()}
        </div>
      )}
    </div>
  );
};

export default NetworkPage;
