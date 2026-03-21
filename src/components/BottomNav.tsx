import { memo } from 'react';
import { createPortal } from 'react-dom';
import { Home, MessageSquare, Calendar, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'home', label: '主页', icon: Home },
  { id: 'news', label: '动态', icon: MessageSquare },
  { id: 'plan', label: '日程', icon: Calendar },
  { id: 'ai', label: 'AI助手', icon: Sparkles },
];

/** 底栏：挂到 body 避免受页面内 transform/overflow 影响；使用独立合成层保证移动端固定 */
export const BottomNav = memo(function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const nav = (
    <nav
      className="pointer-events-none fixed left-0 right-0 bottom-0 z-[100] flex justify-center pb-[max(8px,env(safe-area-inset-bottom,0px))] translate-z-0"
      aria-label="主导航"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <div className="pointer-events-auto mx-4 grid h-14 w-full max-w-[20rem] grid-cols-4 items-stretch gap-0.5 rounded-full border border-slate-100 bg-white px-1.5 shadow-lg shadow-slate-200/50">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              tabIndex={0}
              aria-current={isActive ? 'page' : undefined}
              onMouseDown={(e) => {
                // 阻止默认聚焦，避免部分浏览器把按钮滚进视口导致整页位移
                e.preventDefault();
              }}
              onClick={() => onTabChange(item.id)}
              className="touch-manipulation flex min-h-0 flex-col items-center justify-center gap-0.5 rounded-full px-0.5 text-center focus-visible:outline focus-visible:ring-2 focus-visible:ring-violet-400/40"
            >
              <span
                className={`flex min-h-0 w-full flex-col items-center justify-center gap-0.5 rounded-full py-1 ${
                  isActive ? 'bg-violet-500 text-white' : 'bg-transparent text-slate-400'
                }`}
              >
                <Icon size={18} strokeWidth={2} className="shrink-0" />
                <span
                  className={`max-w-full truncate text-[10px] font-medium leading-tight ${
                    isActive ? 'text-white' : 'text-slate-400 select-none'
                  }`}
                >
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
  return createPortal(nav, document.body);
});

export default BottomNav;
