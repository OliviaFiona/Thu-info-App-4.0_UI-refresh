import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Bell } from 'lucide-react';

interface CalendarPageProps {
  onBack: () => void;
}

// 2025-2026学年秋季学期校历数据
const calendarData = {
  year: '2025-2026',
  semester: '秋季学期',
  startDate: new Date(2025, 8, 8), // 2025年9月8日
  weeks: 16,
  holidays: [
    { date: '2025-10-01', name: '国庆节', type: 'holiday' },
    { date: '2025-10-02', name: '国庆节', type: 'holiday' },
    { date: '2025-10-03', name: '国庆节', type: 'holiday' },
    { date: '2025-10-04', name: '国庆节', type: 'holiday' },
    { date: '2025-10-05', name: '国庆节', type: 'holiday' },
    { date: '2025-10-06', name: '国庆节', type: 'holiday' },
    { date: '2025-10-07', name: '国庆节', type: 'holiday' },
    { date: '2025-10-08', name: '国庆节', type: 'holiday' },
    { date: '2026-01-01', name: '元旦', type: 'holiday' },
  ],
  importantDates: [
    { date: '2025-08-20', name: '本科新生入学报到', type: 'registration' },
    { date: '2025-08-21', name: '开学典礼', type: 'event' },
    { date: '2025-09-15', name: '全校开始上课', type: 'event' },
    { date: '2026-01-13', name: '期末考试开始', type: 'exam' },
    { date: '2026-01-20', name: '寒假开始', type: 'vacation' },
  ],
};

export const CalendarPage: React.FC<CalendarPageProps> = ({ onBack }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1)); // 2025年9月

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // 填充月初空白
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // 填充日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const changeMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth.getMonth() &&
           today.getFullYear() === currentMonth.getFullYear();
  };

  const isHoliday = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarData.holidays.find(h => h.date === dateStr);
  };

  const days = getDaysInMonth(currentMonth);

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
          <h1 className="text-xl font-bold text-foreground">校历</h1>
        </div>
      </header>

      {/* 学期选择 */}
      <div className="px-5 py-3">
        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-light">
          <span className="font-medium text-foreground">
            {calendarData.year} {calendarData.semester}
          </span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* 日历 */}
      <div className="px-5">
        <div className="bg-white rounded-3xl p-4 shadow-card">
          {/* 月份导航 */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <span className="text-lg font-semibold text-foreground">
              {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
            </span>
            <button 
              onClick={() => changeMonth(1)}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day) => (
              <div key={day} className="text-center py-2">
                <span className={`text-sm ${day === '日' || day === '六' ? 'text-red-400' : 'text-muted-foreground'}`}>
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="aspect-square" />;
              }

              const holiday = isHoliday(day);
              const today = isToday(day);

              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex flex-col items-center justify-center rounded-xl
                    ${today ? 'bg-thu-purple text-white' : ''}
                    ${holiday && !today ? 'bg-red-50' : ''}
                  `}
                >
                  <span className={`
                    text-sm font-medium
                    ${today ? 'text-white' : holiday ? 'text-red-500' : 'text-foreground'}
                  `}>
                    {day}
                  </span>
                  {holiday && (
                    <span className="text-[8px] text-red-500 mt-0.5 truncate w-full text-center px-1">
                      {holiday.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 重要日期 */}
      <div className="px-5 mt-5">
        <h2 className="text-lg font-semibold text-foreground mb-3">重要日期</h2>
        
        <div className="space-y-3">
          {calendarData.importantDates.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-light flex items-center gap-3"
            >
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                backdrop-blur-sm border
                ${item.type === 'registration' ? 'bg-blue-500/20 border-blue-500/50' :
                  item.type === 'exam' ? 'bg-amber-500/20 border-amber-500/50' :
                  item.type === 'vacation' ? 'bg-emerald-500/20 border-emerald-500/50' :
                  'bg-violet-500/20 border-violet-500/50'
                }
              `}>
                <CalendarDays className={`
                  w-5 h-5
                  ${item.type === 'registration' ? 'text-blue-700' :
                    item.type === 'exam' ? 'text-amber-700' :
                    item.type === 'vacation' ? 'text-emerald-700' :
                    'text-violet-700'
                  }
                `} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <Bell className="w-4 h-4 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      </div>

      {/* 学期信息 */}
      <div className="px-5 mt-5 pb-8">
        <div className="bg-gradient-to-r from-thu-purple/5 to-thu-mint/10 rounded-2xl p-4">
          <h3 className="font-medium text-foreground mb-2">学期信息</h3>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              <span className="text-foreground">教学周数：</span>{calendarData.weeks}周
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground">开学日期：</span>2025年9月15日
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground">结束日期：</span>2026年1月19日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
