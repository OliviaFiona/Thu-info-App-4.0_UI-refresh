import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { AIPage } from './pages/AIPage';
import { PlanPage } from './pages/PlanPage';
import { SettingsPage } from './pages/SettingsPage';
import { TranscriptPage } from './pages/TranscriptPage';
import { CalendarPage } from './pages/CalendarPage';
import { CoursePage } from './pages/CoursePage';
import { ClassroomPage } from './pages/ClassroomPage';
import { FinancePage } from './pages/FinancePage';
import { DormitoryPage } from './pages/DormitoryPage';
import { ReservationPage } from './pages/ReservationPage';
import { NetworkPage } from './pages/NetworkPage';
import { CoursePlanPage } from './pages/CoursePlanPage';
import { PEPage } from './pages/PEPage';
import { EvaluationPage } from './pages/EvaluationPage';

type PageType = 
  | 'home' | 'news' | 'ai' | 'plan'
  | 'transcript' | 'calendar' | 'course' | 'classroom'
  | 'finance' | 'dormitory' | 'reservation' | 'network'
  | 'course-plan' | 'pe' | 'evaluation' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 处理页面导航
  const navigateTo = (page: PageType) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 150);
  };

  // 处理底部导航切换
  const handleTabChange = (tab: string) => {
    const tabMap: Record<string, PageType> = {
      'home': 'home',
      'news': 'news',
      'plan': 'plan',
      'ai': 'ai',
    };
    navigateTo(tabMap[tab] || 'home');
  };

  // 处理主页功能导航
  const handleHomeNavigate = (page: string) => {
    const pageMap: Record<string, PageType> = {
      'transcript': 'transcript',
      'calendar': 'calendar',
      'course': 'course',
      'classroom': 'classroom',
      'finance': 'finance',
      'dormitory': 'dormitory',
      'reservation': 'reservation',
      'network': 'network',
      'course-plan': 'course-plan',
      'pe': 'pe',
      'evaluation': 'evaluation',
      'settings': 'settings',
    };
    
    if (pageMap[page]) {
      navigateTo(pageMap[page]);
    }
  };

  // 返回主页
  const goBack = () => {
    navigateTo('home');
  };

  // 渲染当前页面
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleHomeNavigate} />;
      case 'news':
        return <NewsPage />;
      case 'ai':
        return <AIPage />;
      case 'plan':
        return <PlanPage />;
      case 'settings':
        return <SettingsPage />;
      case 'transcript':
        return <TranscriptPage onBack={goBack} />;
      case 'calendar':
        return <CalendarPage onBack={goBack} />;
      case 'course':
        return <CoursePage onBack={goBack} />;
      case 'classroom':
        return <ClassroomPage onBack={goBack} />;
      case 'finance':
        return <FinancePage onBack={goBack} />;
      case 'dormitory':
        return <DormitoryPage onBack={goBack} />;
      case 'reservation':
        return <ReservationPage onBack={goBack} />;
      case 'network':
        return <NetworkPage onBack={goBack} />;
      case 'course-plan':
        return <CoursePlanPage onBack={goBack} />;
      case 'pe':
        return <PEPage onBack={goBack} />;
      case 'evaluation':
        return <EvaluationPage onBack={goBack} />;
      default:
        return <HomePage onNavigate={handleHomeNavigate} />;
    }
  };

  // 判断是否显示底部导航
  const showBottomNav = ['home', 'news', 'ai', 'plan'].includes(currentPage);

  return (
    <div className="min-h-screen bg-background">
      {/* 页面内容 */}
      <main 
        className={`
          transition-all duration-300
          ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
        `}
      >
        {renderPage()}
      </main>

      {/* 底部导航 */}
      {showBottomNav && (
        <BottomNav 
          activeTab={currentPage} 
          onTabChange={handleTabChange} 
        />
      )}
    </div>
  );
}

export default App;
