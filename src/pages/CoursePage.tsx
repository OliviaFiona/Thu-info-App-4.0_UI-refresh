import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { courseSemesters, coursePlan } from '../data/appData';

interface CoursePageProps {
  onBack: () => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ onBack }) => {
  const [selectedSemester, setSelectedSemester] = useState(courseSemesters[0]);

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

      {/* 学期选择 */}
      <div className="px-5 py-3">
        <div className="space-y-3">
          {courseSemesters.map((semester) => (
            <button
              key={semester.id}
              onClick={() => setSelectedSemester(semester)}
              className={`
                w-full flex items-center justify-between px-5 py-4 rounded-2xl
                transition-all duration-300
                ${selectedSemester.id === semester.id
                  ? 'bg-thu-purple text-white shadow-glow'
                  : 'bg-white text-foreground shadow-light hover:bg-thu-purple/5'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${selectedSemester.id === semester.id ? 'bg-white/20' : 'bg-thu-purple/10'}
                `}>
                  <GraduationCap className={`
                    w-5 h-5
                    ${selectedSemester.id === semester.id ? 'text-white' : 'text-thu-purple'}
                  `} />
                </div>
                <div className="text-left">
                  <p className={`font-semibold ${selectedSemester.id === semester.id ? 'text-white' : 'text-foreground'}`}>
                    {semester.name}
                  </p>
                  <p className={`text-sm ${selectedSemester.id === semester.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {semester.code}
                  </p>
                </div>
              </div>
              
              <ChevronRight className={`
                w-5 h-5
                ${selectedSemester.id === semester.id ? 'text-white' : 'text-muted-foreground'}
              `} />
            </button>
          ))}
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
                
                <div className="w-10 h-10 rounded-xl bg-thu-purple/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-thu-purple" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 学分统计 */}
      <div className="px-5 mt-5 pb-8">
        <div className="bg-gradient-to-r from-thu-purple/5 to-thu-mint/10 rounded-2xl p-4">
          <h3 className="font-medium text-foreground mb-3">学分统计</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-thu-purple">
                {coursePlan.reduce((sum, c) => sum + c.credits, 0)}
              </p>
              <p className="text-xs text-muted-foreground">总学分</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {coursePlan.filter(c => c.type === '专业课').reduce((sum, c) => sum + c.credits, 0)}
              </p>
              <p className="text-xs text-muted-foreground">专业课</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">
                {coursePlan.filter(c => c.type === '公共必修课').reduce((sum, c) => sum + c.credits, 0)}
              </p>
              <p className="text-xs text-muted-foreground">公共课</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
