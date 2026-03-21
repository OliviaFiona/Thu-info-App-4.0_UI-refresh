import React, { useState } from 'react';
import { ChevronLeft, Search, BookOpen } from 'lucide-react';
import { coursePlan } from '../data/appData';

interface CoursePlanPageProps {
  onBack: () => void;
}

export const CoursePlanPage: React.FC<CoursePlanPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const courseTypes = ['全部', '专业课', '公共必修课', '必修环节'];

  const filteredCourses = coursePlan.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.id.includes(searchQuery);
    const matchesType = !selectedType || selectedType === '全部' || course.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background animate-slide-in-right">
      {/* 顶部 Header */}
      <header className="pt-12 px-5 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">教学计划</h1>
        </div>
        
        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索课程名"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-thu-purple/30 transition-all"
          />
        </div>
      </header>

      {/* 类型筛选 */}
      <div className="px-5 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {courseTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`
                px-4 py-2 rounded-full text-sm whitespace-nowrap
                transition-all duration-300
                ${selectedType === type || (type === '全部' && !selectedType)
                  ? 'bg-thu-purple text-white'
                  : 'bg-white text-foreground shadow-light'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 课程列表 */}
      <div className="px-5 pb-8 space-y-3">
        {filteredCourses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl p-4 shadow-light card-hover"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-thu-purple/10 text-thu-purple">
                    {course.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-thu-mint/30 text-emerald-700">
                    {course.type}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{course.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  课程代码: {course.id} · {course.credits}学分
                </p>
              </div>
              
              <div className="w-10 h-10 rounded-xl bg-thu-purple/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-thu-purple" />
              </div>
            </div>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-thu-purple/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-thu-purple/50" />
            </div>
            <p className="text-muted-foreground">未找到相关课程</p>
          </div>
        )}
      </div>

      {/* 学分统计 */}
      <div className="px-5 pb-8">
        <div className="bg-gradient-to-r from-thu-purple/5 to-thu-mint/10 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">计划总学分</p>
              <p className="text-2xl font-bold text-thu-purple">
                {coursePlan.reduce((sum, c) => sum + c.credits, 0)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">课程数量</p>
              <p className="text-2xl font-bold text-foreground">{coursePlan.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlanPage;
