// 最近使用功能
export const recentUsed = [
  { id: 'transcript', name: '成绩单', icon: 'FileText', color: 'from-violet-400 to-purple-500' },
  { id: 'pe', name: '体测成绩', icon: 'Dumbbell', color: 'from-emerald-400 to-teal-500' },
  { id: 'evaluation', name: '教学评估', icon: 'Star', color: 'from-amber-400 to-orange-500' },
  { id: 'classroom', name: '教室资源', icon: 'DoorOpen', color: 'from-rose-400 to-pink-500' },
];

// 全部功能
export const allFunctions = [
  { id: 'pe', name: '体测成绩', icon: 'Dumbbell', color: 'from-emerald-400 to-teal-500', category: 'academic' },
  { id: 'evaluation', name: '教学评估', icon: 'Star', color: 'from-amber-400 to-orange-500', category: 'academic' },
  { id: 'transcript', name: '成绩单', icon: 'FileText', color: 'from-violet-400 to-purple-500', category: 'academic' },
  { id: 'classroom', name: '教室资源', icon: 'DoorOpen', color: 'from-rose-400 to-pink-500', category: 'academic' },
  { id: 'reservation', name: '预约', icon: 'Clock', color: 'from-cyan-400 to-blue-500', category: 'life' },
  { id: 'finance', name: '校园财务', icon: 'CreditCard', color: 'from-indigo-400 to-purple-500', category: 'life' },
  { id: 'dormitory', name: '宿舍', icon: 'Bed', color: 'from-sky-400 to-indigo-500', category: 'life' },
  { id: 'network', name: '校园网', icon: 'Globe', color: 'from-teal-400 to-cyan-500', category: 'life' },
  { id: 'calendar', name: '校历', icon: 'Calendar', color: 'from-orange-400 to-red-500', category: 'academic' },
  { id: 'course', name: '选课信息', icon: 'GraduationCap', color: 'from-pink-400 to-rose-500', category: 'academic' },
];

// 公告数据
export const announcements = [
  {
    id: 1,
    title: '微信校园卡充值无法使用',
    content: 'card.tsinghua.edu.cn 的手机微信充值损坏，APP无法正常调用。敬请谅解',
    source: '信息中心',
    category: '系统通知',
    time: '2小时前',
    important: true,
  },
  {
    id: 2,
    title: '关于推荐2026年度何梁何利基金科学与技术奖候选人的通知',
    content: '各院系、各单位：根据何梁何利基金评选委员会通知...',
    source: '科研院',
    category: '科研通知',
    time: '2026-02-07',
    important: false,
  },
  {
    id: 3,
    title: '关于学生宿舍区无线网络维护的通知',
    content: '信息技术中心将于本周五凌晨进行网络维护...',
    source: '信息技术中心',
    category: '办公通知',
    time: '2026-02-06',
    important: false,
  },
];

// 通知分类
export const newsCategories = [
  { id: 'all', name: '全部' },
  { id: 'public', name: '公共信息' },
  { id: 'study', name: '学习研究' },
  { id: 'student', name: '学生工作' },
  { id: 'campus', name: '校园生活' },
];

// 通知列表
export const newsList = [
  {
    id: 1,
    title: '关于推荐2026年度何梁何利基金科学与技术奖候选人的通知',
    source: '科研院',
    category: '科研通知',
    time: '2026-02-07',
    starred: false,
  },
  {
    id: 2,
    title: '关于学生宿舍区无线网络维护的通知',
    source: '信息技术中心',
    category: '办公通知',
    time: '2026-02-06',
    starred: false,
  },
  {
    id: 3,
    title: '清校发(2026) 第15号 关于公布《清华大学图书文物陈列品资产管理办法》的通知',
    source: '党政办',
    category: '办公通知',
    time: '2026-02-06',
    starred: true,
  },
  {
    id: 4,
    title: '清校发(2026) 第14号 关于修订《清华大学文物保护管理规定》的通知',
    source: '党政办',
    category: '办公通知',
    time: '2026-02-06',
    starred: false,
  },
  {
    id: 5,
    title: '清委发(2026) 第5号 关于修订《清华大学校管干部选拔任用工作办法》的通知',
    source: '党政办',
    category: '办公通知',
    time: '2026-02-05',
    starred: false,
  },
  {
    id: 6,
    title: '清委发(2026) 第6号 关于公布《教师参与学生工作经历认定办法》的通知',
    source: '党政办',
    category: '办公通知',
    time: '2026-02-05',
    starred: false,
  },
];

// 成绩单数据
export const transcriptData = {
  gpa: 3.9,
  totalCredits: 30,
  gpaCredits: 26,
  totalGradePoints: 100.4,
  semesters: [
    {
      id: '2025-summer',
      name: '2025-夏',
      gpa: null,
      totalCredits: 1,
      gpaCredits: 0,
      gradePoints: 0,
      courses: [
        { name: '社会实践', credits: 1, grade: 'P', gradePoint: null },
      ],
    },
    {
      id: '2024-spring',
      name: '2024-春',
      gpa: 3.9,
      totalCredits: 12,
      gpaCredits: 11,
      gradePoints: 42.4,
      courses: [
        { name: '不确定规划', credits: 4, grade: 'B+', gradePoint: 3.6 },
        { name: '自然辩证法概论', credits: 1, grade: 'A-', gradePoint: 4.0 },
        { name: '研究生学术与职业素养', credits: 1, grade: 'P', gradePoint: null },
        { name: '算法与算法复杂性理论', credits: 3, grade: 'A', gradePoint: 4.0 },
        { name: '分布式系统导论', credits: 3, grade: 'A-', gradePoint: 4.0 },
      ],
    },
    {
      id: '2023-fall',
      name: '2023-秋',
      gpa: 3.9,
      totalCredits: 15,
      gpaCredits: 15,
      gradePoints: 58.0,
      courses: [
        { name: '组合数学', credits: 3, grade: 'A', gradePoint: 4.0 },
        { name: '最优化方法', credits: 4, grade: 'A', gradePoint: 4.0 },
        { name: '并行计算', credits: 3, grade: 'B+', gradePoint: 3.6 },
        { name: '大数据系统导论', credits: 3, grade: 'A-', gradePoint: 4.0 },
        { name: '中国马克思主义与当代', credits: 2, grade: 'B+', gradePoint: 3.6 },
      ],
    },
    {
      id: '2023-summer',
      name: '2023-夏',
      gpa: null,
      totalCredits: 2,
      gpaCredits: 0,
      gradePoints: 0,
      courses: [
        { name: '博士生英语', credits: 2, grade: 'Ex', gradePoint: null },
      ],
    },
  ],
};

// 教学计划数据
export const coursePlan = [
  { id: '70240263', name: '并行计算', credits: 3, type: '专业课', category: '学位课' },
  { id: '94200012', name: '博士生英语', credits: 2, type: '公共必修课', category: '学位课' },
  { id: '60420214', name: '不确定规划', credits: 4, type: '专业课', category: '学位课' },
  { id: '80240693', name: '大数据系统导论', credits: 3, type: '专业课', category: '学位课' },
  { id: '80240613', name: '分布式系统导论', credits: 3, type: '专业课', category: '学位课' },
  { id: '69990041', name: '社会实践', credits: 1, type: '必修环节', category: '学位课' },
  { id: '70240193', name: '算法与算法复杂性理论', credits: 3, type: '专业课', category: '学位课' },
  { id: '99990041', name: '文献综述与选题报告', credits: 1, type: '必修环节', category: '学位课' },
];

// 选课信息学期
export const courseSemesters = [
  { id: '2025-2026-2', name: '2025-2026学年-春', code: '2025-2026-2' },
  { id: '2025-2026-1', name: '2025-2026学年-秋', code: '2025-2026-1' },
];

// 教学楼列表
export const buildings = [
  '建筑馆', '西阶梯教室', '东阶梯教室', '工物馆', '理科楼', '旧水利馆',
  '新水利馆', '文北楼', '旧经管报告厅', '明理楼', '一教', '二教',
  '三教', '四教', '五教', '六教', '技术科学楼', '清华学堂',
  '蒙民伟楼(艺教)', '逸夫图书馆', '主楼', '建华楼研讨间',
  '建华/经管新楼', '舜德/经管西楼', '李兆基科技大楼', '法律图书馆',
  '文南楼', '物理楼', '何添楼', '人文楼', '自强科技楼', '罗姆楼',
  '蒙民伟科技', '近春园楼', '研讨间',
];

// 校园财务功能
export const financeFunctions = [
  { id: 'card', name: '新版校园卡', icon: 'CreditCard' },
  { id: 'bank', name: '银行代发', icon: 'Landmark' },
  { id: 'invoice', name: '电子发票', icon: 'Receipt' },
  { id: 'income', name: '研究生收入', icon: 'Banknote' },
];

// 宿舍功能
export const dormitoryFunctions = [
  { id: 'washer', name: '洗衣机查询', icon: 'WashingMachine' },
  { id: 'water', name: '清紫源泉', icon: 'Droplets' },
  { id: 'electricity', name: '宿舍电费', icon: 'Plug' },
];

// 校园网功能
export const networkFunctions = [
  { id: 'details', name: '校园网详情', icon: 'Network' },
  { id: 'devices', name: '在线设备', icon: 'Monitor' },
];

// 预约功能
export const reservationFunctions = [
  { id: 'library', name: '图书馆', icon: 'BookOpen' },
  { id: 'sports', name: '体育场馆预约', icon: 'Goal' },
  { id: 'study', name: '研读间预约', icon: 'DoorClosed' },
];

// 今日计划
export const todayPlans = [
  { id: 1, time: '08:00', title: '并行计算课程', location: '六教6A301', type: 'course', completed: true },
  { id: 2, time: '14:00', title: '实验室组会', location: 'FIT楼3-622', type: 'meeting', completed: false },
  { id: 3, time: '19:00', title: '健身房', location: '紫荆健身房', type: 'personal', completed: false },
];

// 倒计时事件
export const countdownEvents = [
  { id: 1, name: '期末考试周', date: '2026-01-13', daysLeft: 5 },
  { id: 2, name: '寒假开始', date: '2026-01-20', daysLeft: 12 },
];

// 快捷问题
export const quickQuestions = [
  '教务通知',
  '学生工作通知',
  '就业通知',
  '图书馆开放时间',
  '校车时刻表',
];
