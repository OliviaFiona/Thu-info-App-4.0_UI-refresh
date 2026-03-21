import { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  MapPin,
  X,
  LayoutGrid,
  List,
} from 'lucide-react';

// 课程数据
const courseSchedule = [
  { id: 1, name: '并行计算', location: '六教6A301', day: 1, startTime: 8, duration: 2, color: 'bg-violet-500' },
  { id: 2, name: '分布式系统', location: '五教5102', day: 2, startTime: 10, duration: 2, color: 'bg-emerald-500' },
  { id: 3, name: '大数据导论', location: '二教202', day: 3, startTime: 14, duration: 2, color: 'bg-amber-500' },
  { id: 4, name: '算法理论', location: 'FIT楼3-622', day: 4, startTime: 16, duration: 2, color: 'bg-rose-500' },
  { id: 5, name: '组会', location: '实验室', day: 5, startTime: 14, duration: 2, color: 'bg-cyan-500' },
];

// 倒计时数据
const defaultCountdowns = [
  { id: 1, name: '期末考试周', date: '2026-06-13', type: 'exam', color: 'bg-red-500' },
  { id: 2, name: '暑假开始', date: '2026-06-21', type: 'vacation', color: 'bg-emerald-500' },
];

// 获取月份天数
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 获取月份第一天是星期几
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const PlanPage = () => {
  // 主视图：周视图 / 月视图
  const [mainView, setMainView] = useState<'week' | 'month'>('week');
  // 周视图子模式：schedule(课程表) / list(列表)
  const [weekSubMode, setWeekSubMode] = useState<'schedule' | 'list'>('schedule');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddCountdown, setShowAddCountdown] = useState(false);
  const [countdowns, setCountdowns] = useState(defaultCountdowns);
  const [newEvent, setNewEvent] = useState({ name: '', location: '', day: 1, startTime: 8, duration: 2 });
  const [newCountdown, setNewCountdown] = useState({ name: '', date: '' });
  const [events, setEvents] = useState(courseSchedule);
  // 当前编辑的日程（null表示新增模式）
  const [currentEditEvent, setCurrentEditEvent] = useState<typeof courseSchedule[0] | null>(null);
  // 长按计时器
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const LONG_PRESS_DURATION = 500; // 长按触发时间（毫秒）

  const weekdays = ['一', '二', '三', '四', '五', '六', '日'];
  const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  // 获取一周的日期
  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const changeWeek = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // 计算倒计时天数
  const getDaysLeft = (dateStr: string) => {
    const target = new Date(dateStr);
    const today = new Date();
    const diff = target.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // 添加事件
  const addEvent = () => {
    if (newEvent.name) {
      const colors = ['bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setEvents([...events, { ...newEvent, id: Date.now(), color: randomColor }]);
      setNewEvent({ name: '', location: '', day: 1, startTime: 8, duration: 2 });
      setShowAddEvent(false);
    }
  };

  // 添加倒计时
  const addCountdown = () => {
    if (newCountdown.name && newCountdown.date) {
      const colors = ['bg-red-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setCountdowns([...countdowns, { 
        id: Date.now(), 
        name: newCountdown.name, 
        date: newCountdown.date,
        type: 'custom',
        color: randomColor
      }]);
      setNewCountdown({ name: '', date: '' });
      setShowAddCountdown(false);
    }
  };

  // 删除倒计时
  const deleteCountdown = (id: number) => {
    setCountdowns(countdowns.filter(c => c.id !== id));
  };

  // 长按开始处理
  const handleLongPressStart = (event: typeof courseSchedule[0]) => {
    longPressTimerRef.current = setTimeout(() => {
      // 打开编辑弹窗
      setCurrentEditEvent(event);
      setNewEvent({
        name: event.name,
        location: event.location,
        day: event.day,
        startTime: event.startTime,
        duration: event.duration
      });
      setShowAddEvent(true);
    }, LONG_PRESS_DURATION);
  };

  // 长按结束处理（触摸移动或抬起时清除计时器）
  const handleLongPressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // 更新日程
  const updateEvent = () => {
    if (newEvent.name && currentEditEvent) {
      setEvents(events.map(e =>
        e.id === currentEditEvent.id
          ? { ...e, ...newEvent }
          : e
      ));
      setNewEvent({ name: '', location: '', day: 1, startTime: 8, duration: 2 });
      setCurrentEditEvent(null);
      setShowAddEvent(false);
    }
  };

  // 关闭弹窗并重置状态
  const closeEventModal = () => {
    setShowAddEvent(false);
    setCurrentEditEvent(null);
    setNewEvent({ name: '', location: '', day: 1, startTime: 8, duration: 2 });
    handleLongPressEnd();
  };

  // 获取选中日期的事件
  const getSelectedDateEvents = () => {
    const dayOfWeek = selectedDate.getDay();
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
    return events.filter(e => e.day === adjustedDay);
  };

  // 渲染月视图日历
  const renderMonthCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: (number | null)[] = [];

    // 填充月初空白
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      days.push(null);
    }
    // 填充日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center py-2">
            <span className="text-[10px] text-slate-400">周{day}</span>
          </div>
        ))}
        {days.map((day, idx) => {
          if (day === null) return <div key={idx} className="aspect-square" />;
          
          const date = new Date(year, month, day);
          const isSelected = selectedDate.toDateString() === date.toDateString();
          const isToday = new Date().toDateString() === date.toDateString();
          
          const dayEvents = events.filter(e => {
            const eventDate = new Date(year, month, day);
            const dayOfWeek = eventDate.getDay();
            const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
            return e.day === adjustedDay;
          });
          
          return (
            <div key={idx} className="aspect-square p-1">
              <button
                onClick={() => setSelectedDate(date)}
                className={`
                  w-full h-full rounded-lg flex flex-col items-center justify-center
                  ${isSelected ? 'bg-violet-500 text-white' : isToday ? 'bg-violet-50' : ''}
                `}
              >
                <span className={`text-xs ${isSelected ? 'text-white' : 'text-slate-700'}`}>{day}</span>
                {dayEvents.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {dayEvents.slice(0, 3).map((evt, i) => (
                      <div key={i} className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : evt.color}`} />
                    ))}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // 渲染周视图下的一行日历（复用）
  const renderWeekCalendarRow = () => (
    <div className="flex justify-between mb-3 pb-2 border-b border-slate-100">
      {weekDays.map((date, index) => {
        const isToday = new Date().toDateString() === date.toDateString();
        const dayEvents = events.filter(e => e.day === index + 1);
        
        return (
          <div key={index} className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 mb-1">周{weekdays[index]}</span>
            <div className={`
              w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1
              ${isToday ? 'bg-violet-500 text-white' : 'text-slate-700'}
            `}>
              {date.getDate()}
            </div>
            {dayEvents.length > 0 && (
              <div className="flex gap-0.5">
                {dayEvents.slice(0, 2).map((e, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${e.color}`} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // 渲染紧凑的7天课程表
  const renderCompactSchedule = () => {
    return (
      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-full">
          {/* 表头 - 7天 */}
          <div className="grid grid-cols-8 gap-0.5 mb-0.5">
            <div className="text-[9px] text-slate-400 text-center w-8 flex items-end justify-center h-[42px] pb-2">时间</div>
            {weekDays.map((date, i) => {
              const isToday = new Date().toDateString() === date.toDateString();
              return (
                <div key={i} className="text-center py-1 min-w-[42px]">
                  <span className="text-[9px] text-slate-400">周{weekdays[i]}</span>
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center mx-auto mt-0.5 text-[10px]
                    ${isToday ? 'bg-violet-500 text-white' : 'text-slate-600'}
                  `}>
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 课程网格 - 紧凑布局 */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 gap-0.5 mb-0.5">
              <div className="text-[9px] text-slate-400 text-center py-1 w-8 flex items-center justify-center">
                {time}
              </div>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const event = events.find(
                  e => e.day === day && e.startTime === time
                );
                return (
                  <div key={day} className="min-w-[42px] min-h-[28px]">
                    {event && (
                      <div
                        className={`${event.color} rounded-md p-1 text-white text-[8px] leading-tight h-full cursor-pointer select-none`}
                        style={{ minHeight: `${event.duration * 28}px` }}
                        onTouchStart={() => handleLongPressStart(event)}
                        onTouchEnd={handleLongPressEnd}
                        onMouseDown={() => handleLongPressStart(event)}
                        onMouseUp={handleLongPressEnd}
                        onMouseLeave={handleLongPressEnd}
                      >
                        <p className="font-medium truncate">{event.name}</p>
                        <p className="opacity-80 truncate">{event.location}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染事件列表
  const renderEventList = (eventList: typeof events) => (
    <div className="space-y-2">
      {eventList.map((event) => (
        <div
          key={event.id}
          className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 cursor-pointer select-none"
          onTouchStart={() => handleLongPressStart(event)}
          onTouchEnd={handleLongPressEnd}
          onMouseDown={() => handleLongPressStart(event)}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
        >
          <div className={`w-1 h-8 rounded-full ${event.color}`} />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">{event.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-400">
                周{weekdays[event.day - 1]} {event.startTime}:00-{event.startTime + event.duration}:00
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-400">{event.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pb-24 bg-slate-50">
      {/* 顶部 Header - 缩小间距 */}
      <header className="pt-8 px-4 pb-2 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold text-slate-800">日程</h1>
          <div className="flex items-center gap-3">
            {/* 视图切换组件 */}
            <div className="flex items-center bg-slate-100 rounded-full p-1">
              {/* 周/月切换 */}
              <div className="flex items-center">
                <button
                  onClick={() => setMainView('week')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    mainView === 'week'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  周
                </button>
                <button
                  onClick={() => setMainView('month')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    mainView === 'month'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  月
                </button>
              </div>
              {/* 周视图下的子模式切换 - 仅周视图显示 */}
              {mainView === 'week' && (
                <>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => setWeekSubMode('schedule')}
                      className={`p-1.5 rounded-full transition-all ${
                        weekSubMode === 'schedule'
                          ? 'bg-white text-slate-800 shadow-sm'
                          : 'text-slate-400'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setWeekSubMode('list')}
                      className={`p-1.5 rounded-full transition-all ${
                        weekSubMode === 'list'
                          ? 'bg-white text-slate-800 shadow-sm'
                          : 'text-slate-400'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setShowAddEvent(true)}
              className="w-7 h-7 rounded-lg bg-violet-500/20 backdrop-blur-sm flex items-center justify-center border border-violet-500/50"
            >
              <Plus className="w-4 h-4 text-violet-700" />
            </button>
          </div>
        </div>
      </header>


      {/* 日期导航 - 周视图 */}
      {mainView === 'week' && (
        <div className="px-4 py-2 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => changeWeek(-1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
            <span className="text-sm font-medium text-slate-700">
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </span>
            <button 
              onClick={() => changeWeek(1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* 月视图的月份导航 */}
      {mainView === 'month' && (
        <div className="px-4 py-2 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
            <span className="text-sm font-medium text-slate-700">
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </span>
            <button 
              onClick={() => changeMonth(1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* 日程内容 */}
      <div className="px-4 py-3">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-3">
          {/* 周视图 - 课程表模式 */}
          {mainView === 'week' && weekSubMode === 'schedule' && (
            <div>
              {/* 课程表（包含日期表头） */}
              {renderCompactSchedule()}
            </div>
          )}

          {/* 周视图 - 列表模式 */}
          {mainView === 'week' && weekSubMode === 'list' && (
            <div>
              {/* 一行周日历 */}
              {renderWeekCalendarRow()}
              {/* 事件列表 */}
              {renderEventList(events)}
            </div>
          )}

          {/* 月视图 */}
          {mainView === 'month' && (
            <div>
              {/* 月日历 */}
              {renderMonthCalendar()}
              {/* 选中日期的事项列表 */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-slate-700">
                    {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
                  </span>
                  <span className="text-xs text-slate-400">
                    周{weekdays[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1]}
                  </span>
                </div>
                {renderEventList(getSelectedDateEvents())}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 倒计时模块 */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-800">倒计时</h2>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {countdowns.map((countdown) => {
            const daysLeft = getDaysLeft(countdown.date);
            return (
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
                  {daysLeft}<span className="text-[10px] font-normal text-slate-400">天</span>
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5">{countdown.date}</p>
              </div>
            );
          })}

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
      </div>

      {/* 添加/编辑日程弹窗 */}
      {showAddEvent && (
        <div
          className="fixed inset-0 bg-black/50 z-[999] flex items-end"
          onClick={closeEventModal}
        >
          <div
            className="w-full bg-white rounded-t-3xl p-5 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mb-5" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">
                {currentEditEvent ? '编辑日程' : '添加日程'}
              </h3>
              {currentEditEvent && (
                <button
                  onClick={() => {
                    setEvents(events.filter(e => e.id !== currentEditEvent.id));
                    closeEventModal();
                  }}
                  className="text-sm text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  删除
                </button>
              )}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="日程名称"
                value={newEvent.name}
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                className="w-full h-11 px-4 rounded-xl bg-slate-100 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm"
              />
              <input
                type="text"
                placeholder="地点"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="w-full h-11 px-4 rounded-xl bg-slate-100 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newEvent.day}
                  onChange={(e) => setNewEvent({...newEvent, day: parseInt(e.target.value)})}
                  className="h-11 px-4 rounded-xl bg-slate-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm"
                >
                  {weekdays.map((day, i) => (
                    <option key={i} value={i + 1}>周{day}</option>
                  ))}
                </select>
                <select
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({...newEvent, startTime: parseInt(e.target.value)})}
                  className="h-11 px-4 rounded-xl bg-slate-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}:00</option>
                  ))}
                </select>
              </div>
              <button
                onClick={currentEditEvent ? updateEvent : addEvent}
                className="w-full h-11 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-700 font-medium text-sm border border-violet-500/50 hover:bg-violet-500/30 transition-colors"
              >
                {currentEditEvent ? '保存' : '添加'}
              </button>
            </div>
          </div>
        </div>
      )}

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

export default PlanPage;
