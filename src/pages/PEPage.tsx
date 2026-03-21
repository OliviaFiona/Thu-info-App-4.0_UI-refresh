import { ChevronLeft, Trophy, TrendingUp, Activity } from 'lucide-react';

interface PEPageProps {
  onBack: () => void;
}

// 体测数据
const peData = {
  overall: {
    score: 85,
    grade: '良好',
    rank: '前 30%',
  },
  items: [
    { name: '身高体重', score: 100, unit: 'BMI 21.5', status: '正常' },
    { name: '肺活量', score: 85, unit: '4200 ml', status: '良好' },
    { name: '50米跑', score: 80, unit: '7.2 秒', status: '良好' },
    { name: '坐位体前屈', score: 90, unit: '18.5 cm', status: '优秀' },
    { name: '立定跳远', score: 85, unit: '245 cm', status: '良好' },
    { name: '引体向上', score: 75, unit: '12 个', status: '及格' },
    { name: '1000米跑', score: 80, unit: '3:45', status: '良好' },
  ],
  history: [
    { year: '2024', score: 85, grade: '良好' },
    { year: '2023', score: 82, grade: '良好' },
    { year: '2022', score: 78, grade: '及格' },
  ],
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

const getScoreBg = (score: number) => {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

export const PEPage: React.FC<PEPageProps> = ({ onBack }) => {
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
          <h1 className="text-xl font-bold text-foreground">体测成绩</h1>
        </div>
      </header>

      {/* 总评卡片 */}
      <div className="px-5 py-4">
        <div className="relative overflow-hidden rounded-3xl p-6 gradient-purple shadow-card-hover">
          {/* 装饰 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-400/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-purple-400/10 blur-xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-purple-600/70" />
              <span className="text-purple-700/80 text-sm">2024年度体测</span>
            </div>

            <div className="flex items-end gap-2 mb-4">
              <p className="text-5xl font-bold text-purple-800">{peData.overall.score}</p>
              <div className="mb-2">
                <span className="px-3 py-1 rounded-full bg-[#9359FF]/20 text-[#9359FF] text-sm font-medium">
                  {peData.overall.grade}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 text-sm">
                超过全校 {peData.overall.rank} 的同学
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 各项成绩 */}
      <div className="px-5">
        <h2 className="text-lg font-semibold text-foreground mb-3">各项成绩</h2>
        
        <div className="space-y-3">
          {peData.items.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-4 shadow-light"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-thu-purple/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-thu-purple" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${getScoreColor(item.score)}`}>
                    {item.score}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.score >= 90 ? 'bg-emerald-100 text-emerald-700' :
                    item.score >= 80 ? 'bg-blue-100 text-blue-700' :
                    item.score >= 60 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
              
              {/* 进度条 */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${getScoreBg(item.score)}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 历史成绩 */}
      <div className="px-5 mt-6 pb-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">历史成绩</h2>
        
        <div className="bg-white rounded-2xl p-4 shadow-light">
          <div className="space-y-3">
            {peData.history.map((record, index) => (
              <div
                key={record.year}
                className={`flex items-center justify-between py-2 ${
                  index !== peData.history.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <span className="text-foreground">{record.year}年</span>
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${getScoreColor(record.score)}`}>
                    {record.score}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    record.score >= 90 ? 'bg-emerald-100 text-emerald-700' :
                    record.score >= 80 ? 'bg-blue-100 text-blue-700' :
                    record.score >= 60 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {record.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PEPage;
