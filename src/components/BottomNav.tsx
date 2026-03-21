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

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-[2px] left-1/2 -translate-x-1/2 z-50">
      {/* iOS26风格胶囊导航 */}
      <div className="flex items-center gap-1 px-2 py-2 bg-white/90 backdrop-blur-xl rounded-full shadow-lg shadow-slate-200/50 border border-slate-100">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                relative flex items-center justify-center gap-1.5 px-3 py-2 rounded-full
                transition-all duration-300 ease-spring
                ${isActive 
                  ? 'bg-violet-500 text-white' 
                  : 'text-slate-400 hover:text-slate-600'
                }
              `}
            >
              <Icon 
                size={18} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <span className="text-xs font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
