import { useState, useEffect } from 'react';
import { Search, FolderOpen, Heart, Bell, X, ChevronRight, Check } from 'lucide-react';

// 两级分类数据
const categories = [
  {
    id: 'academic',
    name: '教务教学',
    children: [
      { id: 'course', name: '课程相关' },
      { id: 'exam', name: '考试安排' },
      { id: 'grade', name: '成绩查询' },
      { id: 'enrollment', name: '选课通知' },
    ],
  },
  {
    id: 'student',
    name: '学生工作',
    children: [
      { id: 'scholarship', name: '奖学金' },
      { id: 'activity', name: '社团活动' },
      { id: 'discipline', name: '纪律处分' },
      { id: 'award', name: '评优评先' },
    ],
  },
  {
    id: 'research',
    name: '科研学术',
    children: [
      { id: 'project', name: '科研项目' },
      { id: 'paper', name: '论文发表' },
      { id: 'conference', name: '学术会议' },
      { id: 'competition', name: '学科竞赛' },
    ],
  },
  {
    id: 'career',
    name: '就业创业',
    children: [
      { id: 'recruitment', name: '校园招聘' },
      { id: 'internship', name: '实习信息' },
      { id: 'lecture', name: '就业指导' },
      { id: 'startup', name: '创业支持' },
    ],
  },
  {
    id: 'life',
    name: '校园生活',
    children: [
      { id: 'dormitory', name: '宿舍管理' },
      { id: 'dining', name: '餐饮服务' },
      { id: 'transport', name: '交通出行' },
      { id: 'facility', name: '设施维护' },
    ],
  },
];

// 新闻数据
const newsList = [
  {
    id: 1,
    title: '关于推荐2026年度何梁何利基金科学与技术奖候选人的通知',
    source: '科研院',
    categoryId: 'project',
    categoryName: '科研项目',
    parentCategory: 'research',
    time: '2026-02-07',
    starred: false,
    subscribed: true,
    summary: '各院系、各单位：根据何梁何利基金评选委员会通知，现开展2026年度何梁何利基金科学与技术奖候选人推荐工作...',
  },
  {
    id: 2,
    title: '关于学生宿舍区无线网络维护的通知',
    source: '信息技术中心',
    categoryId: 'facility',
    categoryName: '设施维护',
    parentCategory: 'life',
    time: '2026-02-06',
    starred: false,
    subscribed: false,
    summary: '信息技术中心将于本周五凌晨进行网络维护，届时宿舍区网络可能出现短暂中断...',
  },
  {
    id: 3,
    title: '清校发(2026) 第15号 关于公布《清华大学图书文物陈列品资产管理办法》的通知',
    source: '党政办',
    categoryId: 'discipline',
    categoryName: '纪律处分',
    parentCategory: 'student',
    time: '2026-02-06',
    starred: true,
    subscribed: true,
    summary: '为进一步规范学校图书文物陈列品资产管理，特制定本办法...',
  },
  {
    id: 4,
    title: '2025-2026学年春季学期选课通知',
    source: '教务处',
    categoryId: 'enrollment',
    categoryName: '选课通知',
    parentCategory: 'academic',
    time: '2026-02-05',
    starred: false,
    subscribed: true,
    summary: '2025-2026学年春季学期选课将于2月10日开始，请各位同学及时登录选课系统...',
  },
  {
    id: 5,
    title: '腾讯校园招聘会',
    source: '就业中心',
    categoryId: 'recruitment',
    categoryName: '校园招聘',
    parentCategory: 'career',
    time: '2026-02-05',
    starred: false,
    subscribed: false,
    summary: '腾讯公司将于本周五下午在职业发展中心举办校园招聘会，欢迎同学们参加...',
  },
  {
    id: 6,
    title: '关于评选2026年度国家奖学金的通知',
    source: '学生处',
    categoryId: 'scholarship',
    categoryName: '奖学金',
    parentCategory: 'student',
    time: '2026-02-04',
    starred: true,
    subscribed: true,
    summary: '根据教育部相关文件精神，现开展2026年度国家奖学金评选工作...',
  },
];

export const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [showSubscribedOnly, setShowSubscribedOnly] = useState(false);
  const [starredNews, setStarredNews] = useState<number[]>([]);
  const [subscribedCategories, setSubscribedCategories] = useState<string[]>(['enrollment', 'project', 'scholarship']);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const items: number[] = [];
      for (let i = 0; i < newsList.length; i++) {
        setTimeout(() => {
          items.push(i);
          setAnimatedItems([...items]);
        }, i * 50);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 切换收藏
  const toggleStar = (id: number) => {
    setStarredNews(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 切换分类选择
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // 切换订阅
  const toggleSubscribe = (categoryId: string) => {
    setSubscribedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // 清除所有筛选
  const clearFilters = () => {
    setSelectedCategories([]);
    setShowStarredOnly(false);
    setShowSubscribedOnly(false);
    setSearchQuery('');
  };

  // 筛选新闻
  const filteredNews = newsList.filter(news => {
    // 搜索筛选
    const matchesSearch = !searchQuery || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 分类筛选
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(news.categoryId) ||
      selectedCategories.includes(news.parentCategory);
    
    // 收藏筛选
    const matchesStarred = !showStarredOnly || starredNews.includes(news.id);
    
    // 订阅筛选
    const matchesSubscribed = !showSubscribedOnly || 
      subscribedCategories.includes(news.categoryId);
    
    return matchesSearch && matchesCategory && matchesStarred && matchesSubscribed;
  });

  // 是否有激活的筛选
  const hasActiveFilters = selectedCategories.length > 0 || showStarredOnly || showSubscribedOnly || searchQuery;

  return (
    <div className="pb-24 bg-slate-50">
      {/* 搜索框 - 缩小间距 */}
      <div className="pt-5 px-4 pb-2 bg-white sticky top-0 z-20 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-9 rounded-xl bg-slate-100 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* 筛选工具栏 */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 sticky top-[68px] z-10">
        <div className="flex items-center gap-2">
          {/* 全部分类 */}
          <button
            onClick={() => setShowCategoryPanel(true)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all shadow-lg shadow-violet-200
              ${selectedCategories.length > 0
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                : 'bg-violet-500 text-white hover:bg-violet-600'
              }
            `}
          >
            <FolderOpen className="w-4 h-4" />
            <span>全部分类</span>
            {selectedCategories.length > 0 && (
              <span className="ml-0.5 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">({selectedCategories.length})</span>
            )}
          </button>

          {/* 收藏 */}
          <button
            onClick={() => setShowStarredOnly(!showStarredOnly)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all
              ${showStarredOnly 
                ? 'bg-red-500 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-red-50'
              }
            `}
          >
            <Heart className={`w-4 h-4 ${showStarredOnly ? 'fill-white' : ''}`} />
            <span>收藏</span>
          </button>

          {/* 订阅 */}
          <button
            onClick={() => setShowSubscribedOnly(!showSubscribedOnly)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all
              ${showSubscribedOnly 
                ? 'bg-amber-500 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
              }
            `}
          >
            <Bell className={`w-4 h-4 ${showSubscribedOnly ? 'fill-white' : ''}`} />
            <span>订阅</span>
          </button>

          {/* 清除筛选 */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
              清除
            </button>
          )}
        </div>
      </div>

      {/* 新闻列表 */}
      <div className="px-4 pt-3 space-y-2">
        {filteredNews.map((news, index) => (
          <div
            key={news.id}
            className={`
              bg-white rounded-xl p-3 shadow-sm border border-slate-100 tap-effect
              transition-all duration-500
              ${animatedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {/* 标题 */}
                <h3 className="text-xs font-medium text-slate-800 line-clamp-2 leading-snug">
                  {news.title}
                </h3>
                
                {/* 分类标签 */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-violet-100 text-violet-600">
                    {news.categoryName}
                  </span>
                  <span className="text-[9px] text-slate-400">{news.source}</span>
                  <span className="text-[9px] text-slate-400">·</span>
                  <span className="text-[9px] text-slate-400">{news.time}</span>
                </div>
                
                {/* 摘要 */}
                <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-1">
                  {news.summary}
                </p>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(news.id);
                  }}
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      starredNews.includes(news.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
                {subscribedCategories.includes(news.categoryId) && (
                  <Bell className="w-3 h-3 text-amber-500 fill-amber-500" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-sm text-slate-400">暂无相关内容</p>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="mt-2 text-sm text-violet-600"
              >
                清除筛选条件
              </button>
            )}
          </div>
        )}
      </div>

      {/* 分类选择面板 */}
      {showCategoryPanel && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={() => setShowCategoryPanel(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[70vh] overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 面板头部 */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">选择分类</h3>
              <button 
                onClick={() => setShowCategoryPanel(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            {/* 分类列表 */}
            <div className="overflow-y-auto max-h-[50vh]">
              {categories.map((category) => (
                <div key={category.id} className="border-b border-slate-100 last:border-b-0">
                  {/* 大类 */}
                  <button
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )}
                    className="w-full px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{category.name}</span>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                        expandedCategory === category.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                    {/* 订阅大类 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const childIds = category.children.map(c => c.id);
                        const allSubscribed = childIds.every(id => subscribedCategories.includes(id));
                        if (allSubscribed) {
                          setSubscribedCategories(prev => prev.filter(id => !childIds.includes(id)));
                        } else {
                          setSubscribedCategories(prev => [...new Set([...prev, ...childIds])]);
                        }
                      }}
                      className="p-1.5 rounded-lg hover:bg-amber-50"
                    >
                      <Bell className={`w-4 h-4 ${
                        category.children.every(c => subscribedCategories.includes(c.id))
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-300'
                      }`} />
                    </button>
                  </button>
                  
                  {/* 小类 */}
                  {expandedCategory === category.id && (
                    <div className="bg-slate-50 px-4 py-2 space-y-1">
                      {category.children.map((child) => (
                        <div 
                          key={child.id}
                          className="flex items-center justify-between py-2"
                        >
                          <button
                            onClick={() => toggleCategory(child.id)}
                            className="flex items-center gap-2 flex-1"
                          >
                            <div className={`
                              w-5 h-5 rounded border flex items-center justify-center
                              ${selectedCategories.includes(child.id) 
                                ? 'bg-violet-500 border-violet-500' 
                                : 'border-slate-300'
                              }
                            `}>
                              {selectedCategories.includes(child.id) && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span className="text-sm text-slate-700">{child.name}</span>
                          </button>
                          
                          {/* 订阅小类 */}
                          <button
                            onClick={() => toggleSubscribe(child.id)}
                            className="p-1.5 rounded-lg hover:bg-amber-50"
                          >
                            <Bell className={`w-4 h-4 ${
                              subscribedCategories.includes(child.id)
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-slate-300'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* 底部按钮 */}
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => setShowCategoryPanel(false)}
                className="w-full h-12 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-700 font-medium border border-violet-500/50 hover:bg-violet-500/30 transition-colors"
              >
                确定 ({selectedCategories.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
