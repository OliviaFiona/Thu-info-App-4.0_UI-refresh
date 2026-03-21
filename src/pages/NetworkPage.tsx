import React from 'react';
import { ChevronLeft, Wifi, Smartphone, Laptop, Tablet } from 'lucide-react';

interface NetworkPageProps {
  onBack: () => void;
}

export const NetworkPage: React.FC<NetworkPageProps> = ({ onBack }) => {
  // 在线设备数据
  const onlineDevices = [
    { id: 1, name: 'iPhone 15 Pro', type: 'phone', ip: '166.111.XX.XX', time: '已在线2小时' },
    { id: 2, name: 'MacBook Pro', type: 'laptop', ip: '166.111.XX.XX', time: '已在线3小时' },
    { id: 3, name: 'iPad Air', type: 'tablet', ip: '166.111.XX.XX', time: '已在线1天' },
  ];

  // 网络使用数据
  const networkData = {
    used: 45.2,
    total: 100,
    unit: 'GB',
    expireDate: '2026-02-28',
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

      <div className="px-5 py-4 pb-5 space-y-4">
        {/* 流量使用卡片（含网络信息） */}
        <div className="bg-white rounded-2xl p-5 shadow-light">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 backdrop-blur-sm flex items-center justify-center border border-violet-500/50">
              <Wifi className="w-6 h-6 text-violet-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">本月已用流量</p>
              <p className="text-2xl font-bold text-foreground">
                {networkData.used} <span className="text-lg text-muted-foreground">/ {networkData.total} GB</span>
              </p>
            </div>
          </div>

          {/* 进度条 */}
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(networkData.used / networkData.total) * 100}%`, background: 'linear-gradient(90deg, #9359FF 0%, #B388FF 100%)' }}
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

          {/* 网络信息（灰色附属信息） */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-slate-400">账号</p>
                <p className="text-sm text-slate-600 mt-0.5">2025XXXXXX</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">套餐</p>
                <p className="text-sm text-slate-600 mt-0.5">学生基础</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">状态</p>
                <p className="text-sm text-emerald-600 mt-0.5">正常</p>
              </div>
            </div>
          </div>
        </div>

        {/* 在线设备 */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">在线设备</h2>
          <div className="bg-white rounded-2xl shadow-light">
            {onlineDevices.map((device, index) => (
              <div
                key={device.id}
                className={`flex items-center gap-3 px-4 py-3 ${index !== onlineDevices.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-400/20 backdrop-blur-sm flex items-center justify-center border border-slate-400/50">
                  {device.type === 'phone' && <Smartphone className="w-5 h-5 text-slate-700" />}
                  {device.type === 'laptop' && <Laptop className="w-5 h-5 text-slate-700" />}
                  {device.type === 'tablet' && <Tablet className="w-5 h-5 text-slate-700" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.ip}</p>
                </div>
                <div className="text-right min-w-[80px]">
                  <button className="px-3 py-1 rounded text-xs bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                    点击下线
                  </button>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{device.time}</p>
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
      </div>
    </div>
  );
};

export default NetworkPage;
