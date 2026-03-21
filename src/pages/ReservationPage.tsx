import { useState } from 'react';
import { 
  ChevronLeft, 
  BookOpen, 
  Goal, 
  DoorClosed, 
  Calendar, 
  Clock, 
  MapPin, 
} from 'lucide-react';

interface ReservationPageProps {
  onBack: () => void;
}

// 预约服务类型
const serviceTypes = [
  { id: 'library', name: '图书馆', icon: BookOpen, color: 'bg-violet-500', desc: '座位预约、研读间' },
  { id: 'sports', name: '体育场馆', icon: Goal, color: 'bg-emerald-500', desc: '羽毛球、游泳、健身' },
  { id: 'study', name: '研讨间', icon: DoorClosed, color: 'bg-amber-500', desc: '小组讨论、自习' },
];

// 今日预约数据
const todayReservations = [
  { 
    id: 1, 
    type: 'library', 
    name: '逸夫馆座位', 
    location: '2F-A12', 
    time: '14:00-18:00', 
    status: 'upcoming',
    date: '今天',
  },
  { 
    id: 2, 
    type: 'sports', 
    name: '羽毛球场地', 
    location: '紫荆体育馆', 
    time: '19:00-21:00', 
    status: 'upcoming',
    date: '今天',
  },
];

// 图书馆区域数据
const libraryAreas = [
  { id: 1, name: '逸夫馆一楼', available: 45, total: 120 },
  { id: 2, name: '逸夫馆二楼', available: 32, total: 100 },
  { id: 3, name: '逸夫馆三楼', available: 28, total: 80 },
  { id: 4, name: '法律图书馆', available: 15, total: 50 },
];

// 体育场馆数据
const sportsVenues = [
  { id: 1, name: '紫荆体育馆', type: '羽毛球', available: true, slots: ['08:00-10:00', '14:00-16:00', '19:00-21:00'] },
  { id: 2, name: '游泳馆', type: '游泳', available: false, slots: [] },
  { id: 3, name: '网球馆', type: '网球', available: true, slots: ['10:00-12:00', '16:00-18:00'] },
  { id: 4, name: '健身房', type: '健身', available: true, slots: ['全天'] },
];

// 研读间数据
const studyRooms = [
  { id: 1, name: '文图研讨间A', capacity: 4, available: true },
  { id: 2, name: '文图研讨间B', capacity: 6, available: true },
  { id: 3, name: '文图研讨间C', capacity: 8, available: false },
  { id: 4, name: '法图研讨间', capacity: 4, available: true },
];

// 日期选择
const dateOptions = [
  { date: '2026-02-16', label: '今天', weekday: '周一' },
  { date: '2026-02-17', label: '明天', weekday: '周二' },
  { date: '2026-02-18', label: '周三', weekday: '周三' },
  { date: '2026-02-19', label: '周四', weekday: '周四' },
  { date: '2026-02-20', label: '周五', weekday: '周五' },
  { date: '2026-02-21', label: '周六', weekday: '周六' },
  { date: '2026-02-22', label: '周日', weekday: '周日' },
];

export const ReservationPage: React.FC<ReservationPageProps> = ({ onBack }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-02-16');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingItem, setBookingItem] = useState<any>(null);

  const hasReservations = todayReservations.length > 0;

  // 打开预约确认弹窗
  const openBookingModal = (item: any) => {
    setBookingItem(item);
    setShowBookingModal(true);
  };

  // 渲染服务详情
  const renderServiceDetail = () => {
    switch (selectedService) {
      case 'library':
        return (
          <div className="p-4">
            {/* 日期选择 */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">选择日期</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {dateOptions.map((date) => (
                  <button
                    key={date.date}
                    onClick={() => setSelectedDate(date.date)}
                    className={`
                      flex-shrink-0 px-3 py-2 rounded-xl text-center min-w-[60px]
                      ${selectedDate === date.date
                        ? 'bg-violet-500 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                      }
                    `}
                  >
                    <p className="text-xs">{date.label}</p>
                    <p className="text-sm font-medium">{date.weekday}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 区域列表 */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700">选择区域</p>
              {libraryAreas.map((area) => (
                <div 
                  key={area.id} 
                  onClick={() => openBookingModal(area)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 tap-effect"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{area.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">共 {area.total} 个座位</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${area.available > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {area.available}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">空闲</span>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${area.available / area.total > 0.3 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${(area.available / area.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sports':
        return (
          <div className="p-4">
            {/* 日期选择 */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">选择日期</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {dateOptions.map((date) => (
                  <button
                    key={date.date}
                    onClick={() => setSelectedDate(date.date)}
                    className={`
                      flex-shrink-0 px-3 py-2 rounded-xl text-center min-w-[60px]
                      ${selectedDate === date.date
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                      }
                    `}
                  >
                    <p className="text-xs">{date.label}</p>
                    <p className="text-sm font-medium">{date.weekday}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 场馆列表 */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700">选择场馆</p>
              {sportsVenues.map((venue) => (
                <div 
                  key={venue.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Goal className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{venue.name}</p>
                        <p className="text-xs text-slate-400">{venue.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      venue.available 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {venue.available ? '可预约' : '已满'}
                    </span>
                  </div>
                  
                  {/* 时间段 */}
                  {venue.available && (
                    <div className="flex flex-wrap gap-2">
                      {venue.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => openBookingModal({ ...venue, slot })}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs tap-effect"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'study':
        return (
          <div className="p-4">
            {/* 日期选择 */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">选择日期</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {dateOptions.map((date) => (
                  <button
                    key={date.date}
                    onClick={() => setSelectedDate(date.date)}
                    className={`
                      flex-shrink-0 px-3 py-2 rounded-xl text-center min-w-[60px]
                      ${selectedDate === date.date
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                      }
                    `}
                  >
                    <p className="text-xs">{date.label}</p>
                    <p className="text-sm font-medium">{date.weekday}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 研读间列表 */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700">选择研讨间</p>
              {studyRooms.map((room) => (
                <div 
                  key={room.id}
                  onClick={() => room.available && openBookingModal(room)}
                  className={`
                    bg-white rounded-xl p-4 shadow-sm border border-slate-100
                    ${room.available ? 'tap-effect' : 'opacity-60'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <DoorClosed className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{room.name}</p>
                        <p className="text-xs text-slate-400">容纳 {room.capacity} 人</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      room.available 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {room.available ? '可预约' : '已满'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部 Header */}
      <header className="pt-12 px-4 pb-4 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button 
            onClick={selectedService ? () => setSelectedService(null) : onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold text-slate-800">
            {selectedService 
              ? serviceTypes.find(s => s.id === selectedService)?.name 
              : '预约服务'
            }
          </h1>
        </div>
      </header>

      {/* 今日预约状态区 */}
      {!selectedService && (
        <div className="px-4 py-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-700">今日预约</h2>
              <span className="text-xs text-slate-400">{todayReservations.length} 个</span>
            </div>
            
            {!hasReservations ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-400">今日暂无预约</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayReservations.map((reservation) => (
                  <div 
                    key={reservation.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{reservation.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" /> {reservation.location}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" /> {reservation.time}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px]">
                      未开始
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 预约服务网格 */}
      {!selectedService && (
        <div className="px-4">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">预约服务</h2>
          <div className="grid grid-cols-3 gap-3">
            {serviceTypes.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 tap-effect flex flex-col items-center"
                >
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-2`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-800">{service.name}</p>
                  <p className="text-[10px] text-slate-400 text-center mt-0.5 line-clamp-1">{service.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 服务详情 */}
      {selectedService && (
        <div className="animate-slide-in-right">
          {renderServiceDetail()}
        </div>
      )}

      {/* 预约确认弹窗 */}
      {showBookingModal && bookingItem && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setShowBookingModal(false)}
        >
          <div 
            className="w-full bg-white rounded-t-3xl p-5 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mb-5" />
            
            <h3 className="text-lg font-bold text-slate-800 mb-4">确认预约</h3>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${
                  selectedService === 'library' ? 'bg-violet-100' :
                  selectedService === 'sports' ? 'bg-emerald-100' : 'bg-amber-100'
                } flex items-center justify-center`}>
                  {selectedService === 'library' && <BookOpen className="w-5 h-5 text-violet-600" />}
                  {selectedService === 'sports' && <Goal className="w-5 h-5 text-emerald-600" />}
                  {selectedService === 'study' && <DoorClosed className="w-5 h-5 text-amber-600" />}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{bookingItem.name}</p>
                  {bookingItem.slot && (
                    <p className="text-xs text-slate-400">{bookingItem.slot}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{selectedDate}</span>
                </div>
                {bookingItem.location && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{bookingItem.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="flex-1 h-12 rounded-xl bg-slate-100 text-slate-600 font-medium"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  setShowBookingModal(false);
                  // 这里处理预约逻辑
                }}
                className="flex-1 h-12 rounded-xl bg-violet-500 text-white font-medium"
              >
                确认预约
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
