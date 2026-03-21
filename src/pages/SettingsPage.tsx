import React, { useState } from 'react';
import { 
  ChevronRight, 
  Bell, 
  Moon, 
  Trash2, 
  Info, 
  LogOut, 
  Shield, 
  User,
  Palette,
  MessageCircle,
} from 'lucide-react';

interface SettingItem {
  id: string;
  icon: React.ElementType;
  label: string;
  description?: string;
  type: 'link' | 'toggle' | 'action';
  value?: boolean;
}

const settingGroups: { title: string; items: SettingItem[] }[] = [
  {
    title: '通知与提醒',
    items: [
      { id: 'push', icon: Bell, label: '推送通知', type: 'toggle', value: true },
      { id: 'email', icon: MessageCircle, label: '邮件提醒', type: 'toggle', value: false },
    ],
  },
  {
    title: '外观与显示',
    items: [
      { id: 'darkMode', icon: Moon, label: '深色模式', type: 'toggle', value: false },
      { id: 'theme', icon: Palette, label: '主题颜色', description: '清华紫', type: 'link' },
    ],
  },
  {
    title: '隐私与安全',
    items: [
      { id: 'privacy', icon: Shield, label: '隐私设置', type: 'link' },
      { id: 'account', icon: User, label: '账号管理', type: 'link' },
    ],
  },
  {
    title: '其他',
    items: [
      { id: 'cache', icon: Trash2, label: '清除缓存', description: '12.5 MB', type: 'action' },
      { id: 'about', icon: Info, label: '关于我们', description: 'v2.0.0', type: 'link' },
    ],
  },
];

export const SettingsPage = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    push: true,
    email: false,
    darkMode: false,
  });

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-full pb-28 bg-background">
      {/* 顶部 Header */}
      <header className="pt-12 px-5 pb-4">
        <h1 className="text-2xl font-bold text-foreground">设置</h1>
      </header>

      {/* 用户信息卡片 */}
      <div className="px-5 mb-6">
        <div className="bg-white rounded-3xl p-5 shadow-card card-hover">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center shadow-glow-sm">
              <span className="text-white text-xl font-bold">同</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">同学</h2>
              <p className="text-sm text-muted-foreground">2025XXXXXX</p>
              <p className="text-xs text-thu-purple bg-thu-purple/10 px-2 py-0.5 rounded-full inline-block mt-1">
                计算机科学与技术系
              </p>
            </div>
            <button className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* 设置分组 */}
      <div className="px-5 space-y-6">
        {settingGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
              {group.title}
            </h3>
            
            <div className="bg-white rounded-2xl shadow-light overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === group.items.length - 1;
                
                return (
                  <div
                    key={item.id}
                    className={`
                      flex items-center justify-between px-4 py-3.5
                      ${!isLast ? 'border-b border-border' : ''}
                      ${item.type === 'link' || item.type === 'action' ? 'cursor-pointer hover:bg-muted/50' : ''}
                      transition-colors
                    `}
                    onClick={() => {
                      if (item.type === 'toggle') {
                        handleToggle(item.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-thu-purple/10 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-thu-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </div>
                    
                    {item.type === 'toggle' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(item.id);
                        }}
                        className={`
                          w-12 h-7 rounded-full transition-colors duration-300 relative
                          ${toggles[item.id] ? 'bg-thu-purple' : 'bg-muted'}
                        `}
                      >
                        <span
                          className={`
                            absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm
                            transition-transform duration-300 ease-spring
                            ${toggles[item.id] ? 'translate-x-6' : 'translate-x-1'}
                          `}
                        />
                      </button>
                    )}
                    
                    {(item.type === 'link' || item.type === 'action') && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 退出登录 */}
      <div className="px-5 mt-8">
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 text-red-500 font-medium hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>

      {/* 版本信息 */}
      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground">THU Info v2.0.0</p>
        <p className="text-xs text-muted-foreground mt-1">清华大学信息技术中心</p>
      </div>
    </div>
  );
};

export default SettingsPage;
