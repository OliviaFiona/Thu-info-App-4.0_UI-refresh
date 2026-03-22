import { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Circle,
  ChevronRight,
  Plus,
  X,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Hourglass,
  Trophy,
} from 'lucide-react';
import { 
  announcements, 
  todayPlans, 
  allFunctions,
} from '../data/appData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// 功能图标组件 - 使用上传的图片完全替换原图标
const FunctionIcon = ({ id }: { id: string }) => {
  const iconPaths: Record<string, string> = {
    'pe': '/icons/pe.png',
    'evaluation': '/icons/evaluation.png',
    'transcript': '/icons/transcript.png',
    'classroom': '/icons/classroom.png',
    'reservation': '/icons/reservation.png',
    'finance': '/icons/finance.png',
    'dormitory': '/icons/dormitory.png',
    'network': '/icons/network.png',
    'calendar': '/icons/calendar.png',
    'course': '/icons/course.png',
  };

  const path = iconPaths[id];
  if (path) {
    return (
      <img
        src={path}
        alt=""
        className="w-full h-full object-contain rounded-[10px] shadow-md shadow-slate-300/60"
      />
    );
  }
  return <span className="text-lg">📱</span>;
};

// 广告数据 - 维纳斯风格微玻璃配色
const ads = [
  { id: 1, title: '春季学期选课即将开始', subtitle: '2月20日 9:00准时开放', color: 'from-indigo-300/40 via-purple-300/30 to-pink-300/40', tagColor: 'bg-indigo-400/80', textColor: 'text-indigo-900', subTextColor: 'text-indigo-600/70', tag: '重要' },
  { id: 2, title: '图书馆延长开放时间', subtitle: '期末考试期间至24:00', color: 'from-emerald-300/40 via-teal-300/30 to-cyan-300/40', tagColor: 'bg-emerald-400/80', textColor: 'text-emerald-900', subTextColor: 'text-emerald-600/70', tag: '服务' },
  { id: 3, title: '校园马拉松报名中', subtitle: '3月15日 紫荆操场', color: 'from-amber-300/40 via-orange-300/30 to-rose-300/40', tagColor: 'bg-amber-400/80', textColor: 'text-amber-900', subTextColor: 'text-amber-700/70', tag: '活动' },
];

// 预约数据类型
interface Reservation {
  id: number;
  type: 'library' | 'sports' | 'study';
  venue: string;
  location: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

// 模拟预约数据
const mockReservations: Reservation[] = [
  { id: 1, type: 'library', venue: '图书馆', location: '2F-A12', startTime: '08:00', endTime: '10:00', status: 'completed' },
  { id: 2, type: 'sports', venue: '体育馆', location: '羽毛球场地 #3', startTime: '14:00', endTime: '16:00', status: 'ongoing' },
  { id: 3, type: 'library', venue: '图书馆', location: '3楼自习区A', startTime: '19:00', endTime: '21:00', status: 'upcoming' },
];

// 倒计时数据类型
type Countdown = { id: number; name: string; date: string; days: number; color: string; type?: 'custom' | 'exam' | 'vacation' };

// 默认倒计时数据
const defaultCountdowns: Countdown[] = [
  { id: 1, name: '期末考试周', date: '2026-06-13', days: 84, color: 'bg-red-500', type: 'exam' },
  { id: 2, name: '暑假开始', date: '2026-06-21', days: 92, color: 'bg-emerald-500', type: 'vacation' },
];

// 计算倒计时天数
const getDaysLeft = (dateStr: string) => {
  const target = new Date(dateStr);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// 获取预约图标
const getReservationIcon = (type: string) => {
  switch (type) {
    case 'library': return '📚';
    case 'sports': return '🏟️';
    case 'study': return '🚪';
    default: return '📍';
  }
};

// 计算进度条状态
const getProgressStatus = (reservation: Reservation) => {
  const now = new Date();
  const [startH, startM] = reservation.startTime.split(':').map(Number);
  const [endH, endM] = reservation.endTime.split(':').map(Number);
  const start = new Date();
  start.setHours(startH, startM, 0);
  const end = new Date();
  end.setHours(endH, endM, 0);
  
  if (reservation.status === 'completed') return { type: 'completed', progress: 100 };
  if (now < start) {
    const diff = Math.floor((start.getTime() - now.getTime()) / (1000 * 60));
    if (diff < 30) return { type: 'soon', progress: 0, diff };
    return { type: 'upcoming', progress: 0 };
  }
  if (now >= start && now <= end) {
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const progress = Math.floor((elapsed / total) * 100);
    return { type: 'ongoing', progress };
  }
  return { type: 'completed', progress: 100 };
};

// 格式化倒计时
const formatCountdown = (minutes: number) => {
  if (minutes < 60) return `${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [functionPage, setFunctionPage] = useState(0);
  const [adIndex, setAdIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pressedCard, setPressedCard] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [showCompleted, setShowCompleted] = useState(false);
  const [swipedItem, setSwipedItem] = useState<number | null>(null);
  const [countdowns, setCountdowns] = useState<Countdown[]>(defaultCountdowns);
  const [showAddCountdown, setShowAddCountdown] = useState(false);
  const [newCountdown, setNewCountdown] = useState({ name: '', date: '' });
  const notificationRef = useRef<HTMLDivElement>(null);
  const functionScrollRef = useRef<HTMLDivElement>(null);

  // 添加倒计时
  const addCountdown = () => {
    if (newCountdown.name && newCountdown.date) {
      const colors = ['bg-red-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-cyan-500', 'bg-rose-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const daysLeft = getDaysLeft(newCountdown.date);
      setCountdowns([...countdowns, {
        id: Date.now(),
        name: newCountdown.name,
        date: newCountdown.date,
        days: daysLeft,
        color: randomColor,
        type: 'custom'
      }]);
      setNewCountdown({ name: '', date: '' });
      setShowAddCountdown(false);
    }
  };

  // 删除倒计时
  const deleteCountdown = (id: number) => {
    setCountdowns(countdowns.filter(c => c.id !== id));
  };

  // 功能分页（每页4个）
  const functionsPerPage = 4;
  const totalPages = Math.ceil(allFunctions.length / functionsPerPage);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      setCurrentDate(`${now.getMonth() + 1}月${now.getDate()}日 ${weekdays[now.getDay()]}`);
      setCurrentTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    // 广告自动轮播
    const adTimer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    // 点击外部关闭通知面板
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(timer);
      clearInterval(adTimer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 处理功能区滑动
  const handleFunctionScroll = () => {
    if (functionScrollRef.current) {
      const scrollLeft = functionScrollRef.current.scrollLeft;
      const pageWidth = functionScrollRef.current.offsetWidth;
      const newPage = Math.round(scrollLeft / pageWidth);
      setFunctionPage(Math.min(newPage, totalPages - 1));
    }
  };

  // 是否有重要通知
  const hasImportantNotification = announcements.some(a => a.important);
  const unreadCount = announcements.filter(a => a.important).length;

  // 预约状态判断
  const hasReservations = reservations.length > 0;
  const upcomingReservations = reservations.filter(r => r.status !== 'completed');
  const completedReservations = reservations.filter(r => r.status === 'completed');
  const allCompleted = hasReservations && upcomingReservations.length === 0;
  const hasOngoing = upcomingReservations.some(r => r.status === 'ongoing');

  // 取消预约
  const cancelReservation = (id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    setSwipedItem(null);
  };

  // 渲染预约状态1：无预约
  const renderEmptyState = () => (
    <div 
      onClick={() => onNavigate('reservation')}
      className="py-8 flex flex-col items-center cursor-pointer tap-effect"
    >
      <p className="text-sm text-slate-400 mb-4">今天还没有预约任何场馆</p>
      <button className="px-8 py-2.5 rounded-full bg-violet-500 text-white text-sm font-medium shadow-lg shadow-violet-200 mb-4">
        立即预约
      </button>
      <p className="text-xs text-slate-300">图书馆 · 体育馆 · 研讨间</p>
    </div>
  );

  // 渲染预约状态2/3：有预约
  const renderReservationList = () => (
    <div className="space-y-0">
      {/* 左滑提示 - 3秒后淡出 */}
      {completedReservations.length > 0 && (
        <div className="text-center py-2 text-xs text-slate-400 animate-pulse">
          ◀ 左滑查看已完成
        </div>
      )}
      
      {/* 进行中/待开始的预约 */}
      {upcomingReservations.slice(0, 2).map((reservation, index) => {
        const progress = getProgressStatus(reservation);
        const isLast = index === upcomingReservations.slice(0, 2).length - 1;
        
        return (
          <div key={reservation.id} className="relative overflow-hidden">
            {/* 左滑删除层 */}
            <div 
              className={`
                absolute inset-y-0 right-0 w-20 bg-red-500 flex items-center justify-center
                transition-transform duration-300
                ${swipedItem === reservation.id ? 'translate-x-0' : 'translate-x-full'}
              `}
              onClick={() => cancelReservation(reservation.id)}
            >
              <span className="text-white text-xs font-medium">取消预约</span>
            </div>
            
            {/* 预约项 */}
            <div 
              className={`
                relative py-3 px-1 tap-effect
                transition-transform duration-300
                ${swipedItem === reservation.id ? '-translate-x-20' : 'translate-x-0'}
                ${!isLast ? 'border-b border-slate-100' : ''}
              `}
              onClick={() => onNavigate('reservation')}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const startX = touch.clientX;
                const handleTouchEnd = (e: TouchEvent) => {
                  const endX = e.changedTouches[0].clientX;
                  if (startX - endX > 50) {
                    setSwipedItem(reservation.id);
                  } else if (endX - startX > 50) {
                    setSwipedItem(null);
                  }
                  document.removeEventListener('touchend', handleTouchEnd);
                };
                document.addEventListener('touchend', handleTouchEnd);
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{getReservationIcon(reservation.type)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {reservation.venue} · {reservation.location}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {reservation.startTime} - {reservation.endTime}
                  </p>
                  
                  {/* 进度条 */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      {progress.type === 'upcoming' && (
                        <div className="w-full h-full" />
                      )}
                      {progress.type === 'soon' && (
                        <div className="w-0 h-full bg-orange-400" />
                      )}
                      {progress.type === 'ongoing' && (
                        <div 
                          className="h-full bg-violet-500 rounded-full transition-all duration-1000"
                          style={{ width: `${progress.progress}%` }}
                        />
                      )}
                    </div>
                    
                    {/* 状态标签 */}
                    {progress.type === 'upcoming' && (
                      <span className="text-xs text-slate-400 flex items-center gap-0.5">
                        <Circle className="w-3 h-3" /> 待开始
                      </span>
                    )}
                    {progress.type === 'soon' && (
                      <span className="text-xs text-orange-500 flex items-center gap-0.5 animate-pulse">
                        <Circle className="w-3 h-3 fill-orange-500" /> 还有{formatCountdown(progress.diff || 0)}
                      </span>
                    )}
                    {progress.type === 'ongoing' && (
                      <span className="text-xs text-violet-500 flex items-center gap-0.5">
                        <Hourglass className="w-3 h-3" /> 进行中
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* 快捷按钮 */}
      {upcomingReservations.length < 3 && (
        <button 
          onClick={() => onNavigate('reservation')}
          className="w-full py-3 flex items-center justify-center gap-1 text-sm text-violet-600 border-t border-slate-100 tap-effect"
        >
          <Plus className="w-4 h-4" /> 再预约一个
        </button>
      )}
      
      {/* 已完成折叠区 */}
      {completedReservations.length > 0 && (
        <div className="border-t border-slate-100">
          <button 
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full py-2 flex items-center justify-between text-xs text-slate-400"
          >
            <span className="flex items-center gap-1">
              {showCompleted ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              已完成 {completedReservations.length}
            </span>
          </button>
          
          {showCompleted && (
            <div className="pb-2 space-y-2">
              {completedReservations.map((reservation) => (
                <div 
                  key={reservation.id}
                  onClick={() => onNavigate('reservation')}
                  className="flex items-center gap-2 py-2 px-1 opacity-60 tap-effect"
                >
                  <span className="text-base">{getReservationIcon(reservation.type)}</span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 line-through">
                      {reservation.venue} · {reservation.location}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {reservation.startTime} - {reservation.endTime}
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // 渲染预约状态4：全部完成
  const renderAllCompleted = () => (
    <div className="py-6 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3 animate-bounce-subtle">
        <Trophy className="w-8 h-8 text-white" />
      </div>
      <p className="text-base font-bold text-slate-800 mb-1">今日预约全部完成！</p>
      
      {/* 已完成列表 */}
      {completedReservations.length > 0 && (
        <div className="w-full mt-3 border-t border-slate-100">
          <button 
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full py-2 flex items-center justify-between text-xs text-slate-400"
          >
            <span className="flex items-center gap-1">
              {showCompleted ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              已完成 {completedReservations.length}
            </span>
          </button>
          
          {showCompleted && (
            <div className="pb-2 space-y-2">
              {completedReservations.map((reservation) => (
                <div 
                  key={reservation.id}
                  className="flex items-center gap-2 py-2 px-1 opacity-60"
                >
                  <span className="text-base">{getReservationIcon(reservation.type)}</span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 line-through">
                      {reservation.venue} · {reservation.location}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {reservation.startTime} - {reservation.endTime}
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <p className="text-sm text-slate-400 mt-3">效率不错！明天继续 💪</p>
      <button 
        onClick={() => onNavigate('reservation')}
        className="mt-4 px-6 py-2 rounded-full border-2 border-violet-500 text-violet-600 text-sm font-medium tap-effect"
      >
        查看明天可约场馆
      </button>
    </div>
  );

  return (
    <div className="pb-20 bg-gradient-to-b from-slate-50 to-white">
      {/* 顶部导航栏 - 缩小间距 */}
      <header className="pt-5 px-5 pb-2 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between">
          {/* 时间日期 */}
          <div>
            <p className="text-[10px] text-slate-400 font-medium">{currentTime}</p>
            <p className="text-base font-bold text-slate-800">{currentDate}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* 通知铃铛 */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className="w-10 h-10 rounded-full bg-[#9359FF] flex items-center justify-center tap-effect relative shadow-sm"
              >
                <Bell className="w-5 h-5 text-white" />
                {/* 红点提示 */}
                {hasImportantNotification && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* 通知浮窗 */}
              {showNotificationPanel && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl z-50 animate-scale-in overflow-hidden border border-slate-100">
                  <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">消息中心</span>
                    <button 
                      onClick={() => setShowNotificationPanel(false)}
                      className="p-1.5 rounded-lg hover:bg-slate-100"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                  <div className="max-h-[40vh] overflow-y-auto">
                    {announcements.slice(0, 4).map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setShowNotificationPanel(false);
                          onNavigate('news');
                        }}
                        className={`p-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${
                          item.important ? 'bg-red-50/50' : ''
                        }`}
                      >
                        <p className={`text-sm font-medium line-clamp-1 ${item.important ? 'text-red-600' : 'text-slate-800'}`}>
                          {item.important && <span className="text-red-500 mr-1">[重要]</span>}
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{item.source} · {item.time}</p>
                      </div>
                    ))}
                  </div>
                  <div 
                    onClick={() => {
                      setShowNotificationPanel(false);
                      onNavigate('news');
                    }}
                    className="p-3 flex items-center justify-center gap-1 text-violet-600 text-sm cursor-pointer hover:bg-violet-50 transition-colors"
                  >
                    查看全部 <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
            
            {/* 用户头像 */}
            <button
              onClick={() => onNavigate('settings')}
              className="w-10 h-10 rounded-full bg-[#9359FF] flex items-center justify-center tap-effect shadow-sm"
            >
              <span className="text-white text-sm font-bold">同</span>
            </button>
          </div>
        </div>
      </header>

      {/* 常用功能区 - 横向滑动胶囊卡片 */}
      <section className="mb-4">
        <div className="px-5 mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">常用功能</h2>
          {isEditMode && (
            <button 
              onClick={() => setIsEditMode(false)}
              className="text-xs text-violet-600 font-medium"
            >
              完成
            </button>
          )}
        </div>
        
        {/* 内层 flex 承担左右 padding，避免 overflow-x 容器上 pl/pr 在部分浏览器中首项仍贴边 */}
        <div
          ref={functionScrollRef}
          onScroll={handleFunctionScroll}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-pl-5 scroll-pr-5"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-4 px-5">
            {allFunctions.map((item) => (
              <div
                key={item.id}
                onClick={() => !isEditMode && onNavigate(item.id)}
                onMouseDown={() => setPressedCard(item.id)}
                onMouseUp={() => setPressedCard(null)}
                onMouseLeave={() => setPressedCard(null)}
                onTouchStart={() => setPressedCard(item.id)}
                onTouchEnd={() => setPressedCard(null)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setIsEditMode(true);
                }}
                className={`
                  flex-shrink-0 w-16 snap-start flex flex-col items-center gap-2
                  ${pressedCard === item.id ? 'scale-95' : 'scale-100'}
                  transition-transform duration-150
                `}
              >
                {/* 图标图片 - 直接使用上传的图片 */}
                <div className="relative w-14 h-14">
                  {isEditMode && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center shadow-sm z-10">
                      <GripVertical className="w-3 h-3 text-slate-400" />
                    </div>
                  )}
                  <FunctionIcon id={item.id} />
                </div>
                {/* 下方文字 */}
                <span className="text-[11px] text-slate-600 font-medium text-center leading-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 分页指示器 - 只显示实际页数 */}
        <div className="flex justify-center gap-1.5 mt-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300
                ${functionPage === i ? 'bg-violet-500 w-4' : 'bg-slate-200'}
              `}
            />
          ))}
        </div>
      </section>

      {/* 原生广告位 - 维纳斯微玻璃风格 */}
      <section className="px-5 mb-4">
        <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/60 shadow-[0_8px_32px_rgba(139,92,246,0.08)]">
          <div 
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${adIndex * 100}%)` }}
          >
            {ads.map((ad) => (
              <div
                key={ad.id}
                onClick={() => onNavigate('news')}
                className={`flex-shrink-0 w-full p-4 bg-gradient-to-br ${ad.color} cursor-pointer tap-effect backdrop-blur-md`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`${ad.textColor} font-semibold text-sm`}>{ad.title}</p>
                    <p className={`${ad.subTextColor} text-[10px] mt-1`}>{ad.subtitle}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full ${ad.tagColor} text-white text-[9px] font-medium shadow-sm backdrop-blur-sm`}>
                    {ad.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* 广告轮播指示器 - 柔和风格 */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {ads.map((_, i) => (
              <div
                key={i}
                className={`
                  h-1 rounded-full transition-all duration-300
                  ${adIndex === i ? 'bg-indigo-400/60 w-4 shadow-sm' : 'bg-slate-300/40 w-1'}
                `}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 分割线 */}
      <div className="h-px bg-slate-100 mx-5 mb-4" />

      {/* 我的预约 - 智能卡片 */}
      <section className="px-5 mb-4">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-800">我的预约</h2>
            {/* 角标 */}
            {(hasOngoing || upcomingReservations.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-violet-500" />
            )}
            {/* 数量/状态标签 */}
            {hasReservations && !allCompleted && (
              <span className="text-xs text-slate-400">
                ({upcomingReservations.length})
              </span>
            )}
            {allCompleted && (
              <span className="text-xs text-emerald-500">今日完成</span>
            )}
            {completedReservations.length > 0 && upcomingReservations.length > 0 && (
              <span className="text-xs text-slate-400">
                ({upcomingReservations.length}/{completedReservations.length}完成)
              </span>
            )}
          </div>
          <button 
            onClick={() => onNavigate('reservation')}
            className="flex items-center gap-0.5 text-sm text-violet-600 font-medium"
          >
            去预约 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* 状态卡片 */}
        <div 
          onClick={() => !hasReservations && onNavigate('reservation')}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {!hasReservations && renderEmptyState()}
          {hasReservations && !allCompleted && renderReservationList()}
          {allCompleted && renderAllCompleted()}
        </div>
      </section>

      {/* 分割线 */}
      <div className="h-px bg-slate-100 mx-5 mb-4" />

      {/* 今日日程 - 时间轴 */}
      <section className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-800">今日日程</h2>
          <button 
            onClick={() => onNavigate('plan')}
            className="flex items-center gap-0.5 text-sm text-violet-600 font-medium"
          >
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="relative">
            {/* 时间轴线 */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200" />
            
            <div className="space-y-4">
              {todayPlans.map((plan, index) => {
                const isCompleted = plan.completed;
                const isCurrent = index === 1;
                
                return (
                  <div key={plan.id} className="flex items-start gap-3 relative">
                    {/* 状态点 */}
                    <div className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${isCompleted 
                        ? 'bg-emerald-100' 
                        : isCurrent 
                          ? 'bg-violet-100 animate-pulse' 
                          : 'bg-white border-2 border-slate-200'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : isCurrent ? (
                        <Clock className="w-5 h-5 text-violet-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    
                    {/* 内容 */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{plan.time}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-600 text-[10px]">
                            进行中
                          </span>
                        )}
                      </div>
                      <p className={`
                        text-sm font-medium mt-0.5
                        ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}
                      `}>
                        {plan.title}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-0.5 mt-0.5">
                        <MapPin className="w-3 h-3" /> {plan.location}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 倒计时区 */}
      <section className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-800">倒计时</h2>
        </div>
        
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {countdowns.map((countdown) => (
            <div
              key={countdown.id}
              className="flex-shrink-0 w-28 bg-white rounded-2xl p-3 shadow-sm border border-slate-100 tap-effect relative"
            >
              <button
                onClick={() => deleteCountdown(countdown.id)}
                className="absolute top-1 right-1 p-1 rounded-full hover:bg-red-50"
              >
                <X className="w-3 h-3 text-red-400" />
              </button>
              <div className={`w-7 h-7 rounded-lg ${countdown.color} flex items-center justify-center mb-2`}>
                <Calendar className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-[10px] text-slate-500 truncate">{countdown.name}</p>
              <p className="text-lg font-bold text-slate-800 mt-1">
                {getDaysLeft(countdown.date)}<span className="text-[10px] font-normal text-slate-400">天</span>
              </p>
              <p className="text-[9px] text-slate-400 mt-0.5">{countdown.date}</p>
            </div>
          ))}

          {/* 添加按钮 */}
          <button
            onClick={() => setShowAddCountdown(true)}
            className="flex-shrink-0 w-28 bg-slate-50 rounded-2xl p-3 border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 tap-effect"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center">
              <Plus className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-xs text-slate-400">添加</span>
          </button>
        </div>
      </section>

      {/* 添加倒计时弹窗 */}
      {showAddCountdown && (
        <div
          className="fixed inset-0 bg-black/50 z-[999] flex items-end"
          onClick={() => setShowAddCountdown(false)}
        >
          <div
            className="w-full bg-white rounded-t-3xl p-5 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mb-5" />
            <h3 className="text-base font-bold text-slate-800 mb-4">添加倒计时</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="倒计时名称"
                value={newCountdown.name}
                onChange={(e) => setNewCountdown({...newCountdown, name: e.target.value})}
                className="w-full h-11 px-4 rounded-xl bg-slate-100 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm"
              />
              <input
                type="date"
                value={newCountdown.date}
                onChange={(e) => setNewCountdown({...newCountdown, date: e.target.value})}
                className="w-full h-11 px-4 rounded-xl bg-slate-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm"
              />
              <button
                onClick={addCountdown}
                className="w-full h-11 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-700 font-medium text-sm border border-violet-500/50 hover:bg-violet-500/30 transition-colors"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
