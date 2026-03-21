import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, Search, Building2, MapPin, School, Microscope, BookOpen, GraduationCap, Atom, FlaskConical, Leaf, Cpu, Droplets, Landmark, BookMarked, Scale, Radio, Briefcase, Palette, Zap, Cog, MessageSquare, Users, Mountain, Glasses, BookCopy, Stethoscope, Dna } from 'lucide-react';
import { buildings } from '../data/appData';

// 建筑图标映射 - 根据建筑类型返回不同图标
const getBuildingIcon = (building: string) => {
  // 教学楼 - 区分不同教学楼
  if (building.includes('一教') || building.includes('四教')) return School;
  if (building.includes('二教') || building.includes('五教')) return GraduationCap;
  if (building.includes('三教') || building.includes('六教')) return BookOpen;
  if (building.includes('阶梯')) return Building2;
  // 理科
  if (building.includes('物理')) return Atom;
  if (building.includes('化学')) return FlaskConical;
  if (building.includes('生物')) return Leaf;
  if (building.includes('理科')) return Microscope;
  if (building.includes('技术科学')) return Cpu;
  // 工科 - 各自使用不同图标
  if (building.includes('工物')) return Radio;
  if (building.includes('旧水利')) return Droplets;
  if (building.includes('新水利')) return Mountain;
  if (building.includes('建筑')) return Landmark;
  if (building.includes('清华学堂')) return School;
  if (building.includes('罗姆')) return Zap;
  if (building.includes('蒙民伟科技')) return Cog;
  // 文科 - 各自使用不同图标
  if (building.includes('逸夫图书馆')) return BookMarked;
  if (building.includes('法律图书馆')) return BookCopy;
  if (building.includes('法律')) return Scale;
  if (building.includes('人文')) return Users;
  if (building.includes('文北')) return Glasses;
  if (building.includes('文南')) return Briefcase;
  // 艺术
  if (building.includes('艺教') || building.includes('蒙民伟楼')) return Palette;
  // 标志性建筑
  if (building.includes('李兆基')) return Landmark;
  if (building.includes('自强')) return Cpu;
  if (building.includes('主楼')) return Building2;
  // 研讨/会议
  if (building.includes('研讨') || building.includes('报告厅')) return MessageSquare;
  if (building.includes('经管') || building.includes('建华') || building.includes('舜德')) return Briefcase;
  // 其他
  if (building.includes('近春园')) return Leaf;
  if (building.includes('何添')) return Atom;
  // 默认
  return Building2;
};

interface ClassroomPageProps {
  onBack: () => void;
}

export const ClassroomPage: React.FC<ClassroomPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  const filteredBuildings = buildings.filter(building =>
    building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 按区域分组
  const buildingGroups = {
    '教学区': filteredBuildings.filter(b => 
      ['一教', '二教', '三教', '四教', '五教', '六教', '西阶梯教室', '东阶梯教室'].some(k => b.includes(k))
    ),
    '理科区': filteredBuildings.filter(b => 
      ['理科楼', '物理楼', '化学楼', '生物楼', '技术科学楼'].some(k => b.includes(k))
    ),
    '工科区': filteredBuildings.filter(b => 
      ['工物馆', '建筑馆', '水利馆', '李兆基', '自强科技楼', '罗姆楼'].some(k => b.includes(k))
    ),
    '文科区': filteredBuildings.filter(b => 
      ['文北楼', '文南楼', '人文楼', '法律图书馆', '明理楼'].some(k => b.includes(k))
    ),
    '其他': filteredBuildings.filter(b => 
      !['一教', '二教', '三教', '四教', '五教', '六教', '西阶梯教室', '东阶梯教室',
        '理科楼', '物理楼', '化学楼', '生物楼', '技术科学楼',
        '工物馆', '建筑馆', '水利馆', '李兆基', '自强科技楼', '罗姆楼',
        '文北楼', '文南楼', '人文楼', '法律图书馆', '明理楼'].some(k => b.includes(k))
    ),
  };

  return (
    <div className="min-h-full bg-background animate-slide-in-right">
      {/* 顶部 Header */}
      <header className="pt-12 px-5 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">教室资源</h1>
        </div>
        
        {/* 搜索栏 - 内嵌玻璃效果 */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索教学楼"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#F2EDFE]/50 backdrop-blur-md text-foreground placeholder:text-purple-400/70 focus:outline-none focus:bg-[#F2EDFE]/80 focus:ring-2 focus:ring-[#9359FF]/20 transition-all border border-[#9359FF]/15 shadow-[inset_0_2px_4px_rgba(147,89,255,0.08)]"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9359FF]/70" />
        </div>
      </header>

      {/* 教学楼列表 */}
      <div className="px-5 pb-8">
        {searchQuery ? (
          // 搜索结果
          <div className="grid grid-cols-4 gap-2">
            {filteredBuildings.map((building) => {
              const Icon = getBuildingIcon(building);
              return (
                <button
                  key={building}
                  onClick={() => setSelectedBuilding(building)}
                  className="bg-white rounded-xl p-3 shadow-light card-hover flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center backdrop-blur-sm border border-violet-500/50">
                    <Icon className="w-5 h-5 text-violet-700" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center line-clamp-2">{building}</span>
                </button>
              );
            })}
          </div>
        ) : (
          // 分组显示
          <div className="space-y-6">
            {Object.entries(buildingGroups).map(([groupName, groupBuildings]) => (
              groupBuildings.length > 0 && (
                <div key={groupName}>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">{groupName}</h2>
                  <div className="grid grid-cols-4 gap-2">
                    {groupBuildings.map((building) => {
                      const Icon = getBuildingIcon(building);
                      return (
                        <button
                          key={building}
                          onClick={() => setSelectedBuilding(building)}
                          className="bg-white rounded-xl p-3 shadow-light card-hover flex flex-col items-center gap-2"
                        >
                          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center backdrop-blur-sm border border-violet-500/50">
                            <Icon className="w-5 h-5 text-violet-700" />
                          </div>
                          <span className="text-xs font-medium text-foreground text-center line-clamp-2">
                            {building}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {filteredBuildings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-violet-500/50">
              <Search className="w-10 h-10 text-violet-700/70" />
            </div>
            <p className="text-muted-foreground">未找到相关教学楼</p>
          </div>
        )}
      </div>

      {/* 选中教学楼详情弹窗 - 使用 Portal 挂载到 body，避免受父元素 transform 影响 */}
      {selectedBuilding && (() => {
        const DetailIcon = getBuildingIcon(selectedBuilding);
        const drawer = (
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            style={{ transform: 'translateZ(0)' }}
            onClick={() => setSelectedBuilding(null)}
          >
            <div 
              className="fixed left-0 right-0 bottom-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up"
              style={{ 
                paddingBottom: 'max(24px, env(safe-area-inset-bottom, 0px))'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 rounded-full bg-muted mx-auto mb-6" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center backdrop-blur-sm border border-violet-500/50">
                  <DetailIcon className="w-8 h-8 text-violet-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedBuilding}</h2>
                  <div className="flex items-center gap-1 text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4 text-violet-700" />
                    <span className="text-sm">清华大学校园内</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBuilding(null)}
                className="w-full py-4 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-700 font-medium border border-violet-500/50 hover:bg-violet-500/30 transition-colors"
              >
                查看教室空闲情况
              </button>
            </div>
          </div>
        );
        return createPortal(drawer, document.body);
      })()}
    </div>
  );
};

export default ClassroomPage;
