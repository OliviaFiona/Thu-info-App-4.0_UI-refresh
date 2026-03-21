import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { courseSemesters, coursePlan } from '../data/appData';

interface CoursePageProps {
  onBack: () => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ onBack }) => {
  const [selectedSemester, setSelectedSemester] = useState(courseSemesters[0]);
  const [showSemesterSelector, setShowSemesterSelector] = useState(false);

  // 获取当前学期的索引
  const currentIndex = courseSemesters.findIndex(s => s.id === selectedSemester.id);
  // 判断是否可以切换
  const canGoPrev = currentIndex < courseSemesters.length - 1;
  const canGoNext = currentIndex > 0;

  const handlePrevSemester = () => {
    if (canGoPrev) {
      setSelectedSemester(courseSemesters[currentIndex + 1]);
    }
  };

  const handleNextSemester = () => {
    if (canGoNext) {
      setSelectedSemester(courseSemesters[currentIndex - 1]);
    }
  };

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
          <h1 className="text-xl font-bold text-foreground">选课信息</h1>
        </div>
      </header>

      {/* 学期卡片（带切换功能） */}
      <div className="px-5 py-4">
        <div className="relative overflow-hidden rounded-3xl p-6 gradient-purple shadow-card-hover">
          {/* 装饰 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-400/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-purple-400/10 blur-xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              {/* 左箭头 - 切换到上一个学期 */}
              <button
                onClick={handlePrevSemester}
                disabled={!canGoPrev}
                className={`p-2 rounded-xl transition-colors ${canGoPrev ? 'hover:bg-purple-800/20' : 'opacity-30 cursor-not-allowed'}`}
              >
                <ChevronLeft className="w-6 h-6 text-purple-900" />
              </button>

              {/* 学期信息 */}
              <div className="text-center flex-1">
                <p className="font-semibold text-lg text-purple-900">{selectedSemester.name}</p>
                <p className="text-sm text-purple-700/80">{selectedSemester.code}</p>
              </div>

              {/* 右箭头 - 切换到下一个学期 */}
              <button
                onClick={handleNextSemester}
                disabled={!canGoNext}
                className={`p-2 rounded-xl transition-colors ${canGoNext ? 'hover:bg-purple-800/20' : 'opacity-30 cursor-not-allowed'}`}
              >
                <ChevronRight className="w-6 h-6 text-purple-900" />
              </button>
            </div>

            {/* 学分统计 - 放在学期卡片下方 */}
            <div className="mt-4 pt-4 border-t border-purple-300/30">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-900">
                    {coursePlan.reduce((sum, c) => sum + c.credits, 0)}
                  </p>
                  <p className="text-xs text-purple-700/80">总学分</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-900">
                    {coursePlan.filter(c => c.type === '专业课').reduce((sum, c) => sum + c.credits, 0)}
                  </p>
                  <p className="text-xs text-purple-700/80">专业课</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-900">
                    {coursePlan.filter(c => c.type === '公共必修课').reduce((sum, c) => sum + c.credits, 0)}
                  </p>
                  <p className="text-xs text-purple-700/80">公共课</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 已选课程 */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">已选课程</h2>
          <span className="text-sm text-muted-foreground">
            共 {coursePlan.length} 门
          </span>
        </div>

        <div className="space-y-3">
          {coursePlan.map((course, index) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-4 shadow-light card-hover"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: '#F2EDFE', color: '#9359FF' }}>
                      {course.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: '#C6FCE4', color: '#00BC7C' }}>
                      {course.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{course.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    课程代码: {course.id} · {course.credits}学分
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-violet-500/20 backdrop-blur-sm flex items-center justify-center border border-violet-500/50">
                  <BookOpen className="w-5 h-5 text-violet-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
};

export default CoursePage;
