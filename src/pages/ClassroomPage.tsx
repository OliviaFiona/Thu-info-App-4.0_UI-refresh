import React, { useState } from 'react';
import { ChevronLeft, Search, Building2, MapPin } from 'lucide-react';
import { buildings } from '../data/appData';

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
        
        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索教学楼"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-thu-purple/30 transition-all"
          />
        </div>
      </header>

      {/* 教学楼列表 */}
      <div className="px-5 pb-8">
        {searchQuery ? (
          // 搜索结果
          <div className="grid grid-cols-2 gap-3">
            {filteredBuildings.map((building) => (
              <button
                key={building}
                onClick={() => setSelectedBuilding(building)}
                className="bg-white rounded-2xl p-4 shadow-light card-hover flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-thu-purple/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-thu-purple" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{building}</span>
              </button>
            ))}
          </div>
        ) : (
          // 分组显示
          <div className="space-y-6">
            {Object.entries(buildingGroups).map(([groupName, groupBuildings]) => (
              groupBuildings.length > 0 && (
                <div key={groupName}>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">{groupName}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {groupBuildings.map((building) => (
                      <button
                        key={building}
                        onClick={() => setSelectedBuilding(building)}
                        className="bg-white rounded-2xl p-4 shadow-light card-hover flex flex-col items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-xl bg-thu-purple/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-thu-purple" />
                        </div>
                        <span className="text-sm font-medium text-foreground text-center line-clamp-2">
                          {building}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {filteredBuildings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-thu-purple/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-thu-purple/50" />
            </div>
            <p className="text-muted-foreground">未找到相关教学楼</p>
          </div>
        )}
      </div>

      {/* 选中教学楼详情弹窗 */}
      {selectedBuilding && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setSelectedBuilding(null)}
        >
          <div 
            className="w-full bg-white rounded-t-3xl p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 rounded-full bg-muted mx-auto mb-6" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedBuilding}</h2>
                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">清华大学校园内</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 rounded-2xl bg-thu-purple text-white font-medium">
                查看教室空闲情况
              </button>
              <button 
                onClick={() => setSelectedBuilding(null)}
                className="w-full py-4 rounded-2xl bg-muted text-foreground font-medium"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomPage;
