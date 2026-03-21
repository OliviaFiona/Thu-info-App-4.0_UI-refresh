import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { transcriptData } from '../data/appData';

interface TranscriptPageProps {
  onBack: () => void;
}

const getGradeColor = (grade: string) => {
  if (grade === 'A' || grade === 'A-') return 'bg-emerald-100 text-emerald-700';
  if (grade === 'B+' || grade === 'B') return 'bg-blue-100 text-blue-700';
  if (grade === 'B-') return 'bg-amber-100 text-amber-700';
  if (grade === 'P' || grade === 'Ex') return 'bg-purple-100 text-purple-700';
  return 'bg-gray-100 text-gray-700';
};

export const TranscriptPage: React.FC<TranscriptPageProps> = ({ onBack }) => {
  const [expandedSemesters, setExpandedSemesters] = useState<string[]>(['2024-spring']);

  const toggleSemester = (id: string) => {
    setExpandedSemesters(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
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
          <h1 className="text-xl font-bold text-foreground">成绩单</h1>
        </div>
      </header>

      {/* GPA 总览卡片 */}
      <div className="px-5 py-4">
        <div className="relative overflow-hidden rounded-3xl p-6 gradient-purple shadow-card-hover">
          {/* 装饰 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-400/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-purple-400/10 blur-xl" />

          <div className="relative text-center">
            <p className="text-purple-700/80 text-sm mb-1">总 GPA</p>
            <p className="text-5xl font-bold text-purple-900">{transcriptData.gpa}</p>

            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-purple-300/30">
              <div>
                <p className="text-2xl font-semibold text-purple-900">{transcriptData.totalCredits}</p>
                <p className="text-purple-700/80 text-xs">总学分</p>
              </div>
              <div className="w-px h-10 bg-purple-300/40" />
              <div>
                <p className="text-2xl font-semibold text-purple-900">{transcriptData.gpaCredits}</p>
                <p className="text-purple-700/80 text-xs">计入GPA学分</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学期列表 */}
      <div className="px-5 pb-8 space-y-3">
        {transcriptData.semesters.map((semester) => {
          const isExpanded = expandedSemesters.includes(semester.id);
          
          return (
            <div key={semester.id} className="bg-white rounded-2xl shadow-light overflow-hidden">
              {/* 学期标题 */}
              <button
                onClick={() => toggleSemester(semester.id)}
                className="w-full px-4 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F2EDFE] flex items-center justify-center backdrop-blur-md border border-[#9359FF]/20 shadow-[0_2px_8px_rgba(147,89,255,0.1)]">
                    <BookOpen className="w-5 h-5 text-[#9359FF]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{semester.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-[#9359FF]">{semester.totalCredits}</span>学分 · {semester.courses.length}门课程
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {semester.gpa && (
                    <span className="text-lg font-bold text-[#9359FF]">{semester.gpa}</span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {/* 课程列表 */}
              {isExpanded && (
                <div className="border-t border-border">
                  {semester.courses.map((course, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 flex items-center justify-between ${
                        index !== semester.courses.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{course.name}</p>
                        <p className="text-xs text-muted-foreground"><span className="text-[#9359FF]">{course.credits}</span>学分</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs font-medium
                          ${getGradeColor(course.grade)}
                        `}>
                          {course.grade}
                        </span>
                        {course.gradePoint && (
                          <span className="text-sm text-[#9359FF] w-8 text-right">
                            {course.gradePoint}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 提示 */}
      <div className="px-5 pb-8">
        <p className="text-xs text-muted-foreground text-center">
          GPA计算结果仅供参考，请以官方成绩单为准。
        </p>
      </div>
    </div>
  );
};

export default TranscriptPage;
