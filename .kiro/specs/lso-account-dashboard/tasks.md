# Implementation Plan: LSO Account Dashboard - Navigation Redesign

## Overview

实现LSO账户管理仪表板的主导航重新设计，从标签式导航升级为6个独立模块页面（Overview, Claim, Admin, Address book, Report, Billing）。系统采用TypeScript + React构建，支持响应式布局，并包含完整的测试覆盖。

## Tasks

- [x] 1. 项目初始化和基础设置
  - 使用Create React App with TypeScript模板初始化项目
  - 配置ESLint和Prettier
  - 安装核心依赖：React Router, fast-check, @testing-library/react
  - 创建基础目录结构：components/, pages/, types/, utils/, styles/
  - 设置CSS模块或Styled Components
  - _Requirements: 所有需求的基础_

- [x] 2. 定义TypeScript类型和接口
  - [x] 2.1 创建核心数据模型类型文件 (types/models.ts)
    - 定义User, Address, Shipment, Package, AccountUser接口
    - 定义枚举类型：UserRole, ShipmentStatus, UserStatus
    - 定义Dimensions, TrackingEvent接口
    - _Requirements: 所有需求的数据基础_
  
  - [x] 2.2 创建组件Props类型文件 (types/components.ts)
    - 定义所有组件的Props接口
    - NavigationBarProps, WelcomeHeaderProps, MainNavigationProps等
    - _Requirements: 所有需求_
  
  - [ ] 2.3 更新类型定义以支持新的导航模块
    - 添加NavigationModule类型：'overview' | 'claim' | 'admin' | 'address-book' | 'report' | 'billing'
    - 添加TrackingResult, DetailedShipment, AdminUser, Claim, ReportData等新模型
    - 更新UserPermissions接口
    - _Requirements: 3.1, 3.2, 7.1-12.1_

- [x] 3. 实现NavigationBar组件
  - [x] 3.1 创建NavigationBar组件基础结构
    - 实现logo显示（左侧）
    - 实现主菜单项：SHIPPING, SERVICES, TRACKING, ABOUT US
    - 实现语言/地区选择器
    - 实现搜索输入框（placeholder: "Track a package"）
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 3.2 实现NavigationBar交互逻辑
    - 实现菜单项点击导航
    - 实现logo点击返回首页
    - 实现搜索功能（Enter键触发）
    - _Requirements: 1.6, 1.7, 16.1, 16.2_
  
  - [x] 3.3 实现NavigationBar响应式布局
    - 移动设备：汉堡菜单
    - 平板/桌面：完整菜单栏
    - _Requirements: 13.1, 13.2, 13.3_
  
  - [x] 3.4 编写NavigationBar单元测试
    - 测试logo显示
    - 测试菜单项显示
    - 测试语言选择器显示
    - 测试搜索框显示和placeholder
    - 测试logo点击导航
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.7, 16.1_
  
  - [x] 3.5 编写NavigationBar属性测试
    - **Property 1: Navigation bar presence**
    - **Property 2: Required menu items presence**
    - **Property 3: Menu navigation behavior**
    - **Validates: Requirements 1.1, 1.3, 1.6**

- [x] 4. 实现WelcomeHeader组件
  - [x] 4.1 创建WelcomeHeader组件
    - 显示"MY ACCOUNT"标题
    - 显示个性化问候"HI [NAME],"
    - 显示右侧装饰插图
    - 实现响应式布局
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 4.2 编写WelcomeHeader单元测试
    - 测试标题显示
    - 测试插图显示
    - _Requirements: 2.1, 2.3_
  
  - [x] 4.3 编写WelcomeHeader属性测试
    - **Property 4: Personalized greeting format**
    - **Validates: Requirements 2.2**

- [ ] 5. 实现MainNavigation组件（新）
  - [ ] 5.1 创建MainNavigation组件基础结构
    - 显示6个导航模块：Overview, Claim, Admin, Address book, Report, Billing
    - 实现模块按钮样式：非活动（#4a4a4a），活动（#003087）
    - 字体：17px，weight 600
    - 顶部圆角：8px
    - _Requirements: 3.1, 3.2, 3.6, 3.7, 3.8, 3.9_
  
  - [ ] 5.2 实现MainNavigation交互逻辑
    - 点击模块时切换页面
    - 高亮显示当前活动模块
    - 维护导航状态
    - _Requirements: 3.3, 3.4, 3.5_
  
  - [ ] 5.3 实现MainNavigation响应式布局
    - 移动设备：横向滚动或下拉菜单
    - 平板/桌面：完整显示
    - _Requirements: 13.1, 13.2, 13.3, 13.6_
  
  - [ ]* 5.4 编写MainNavigation单元测试
    - 测试6个模块显示
    - 测试活动模块高亮
    - 测试模块点击导航
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [ ]* 5.5 编写MainNavigation属性测试
    - **Property: Navigation modules presence**
    - **Property: Active module indication**
    - **Property: Module navigation behavior**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

- [ ] 6. 实现Overview页面重新设计
  - [ ] 6.1 创建TrackingSearch组件
    - 显示大型搜索输入框
    - Placeholder: "Enter up to 30 tracking numbers, separated by commas"
    - 实现搜索按钮和图标
    - 解析逗号分隔的追踪号
    - 验证追踪号数量（最多30个）
    - 显示验证错误消息
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [ ] 6.2 创建TrackingResultsList组件
    - 显示追踪结果列表
    - 显示"Delivered time"标签（而非"Signed"）
    - 仅在状态为"Delivered"时显示Delivered time
    - 不显示删除按钮
    - Service Type显示为蓝色边框徽章
    - Status显示为橙色边框徽章
    - 支持筛选、导出、分页功能
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 6.3 创建ActionCard组件
    - 显示图标和标题
    - 实现悬停视觉反馈
    - 实现点击操作
    - 响应式布局
    - _Requirements: 6.8, 6.9_
  
  - [ ] 6.4 重新设计OverviewTab页面
    - 顶部：TrackingSearch组件
    - 中部：TrackingResultsList组件
    - 底部：ActionCard网格布局（4个卡片）
    - 移除"Your Tracking"和"Your Shipments"区域标题
    - 实现响应式网格布局（移动1列，平板2列，桌面4列）
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_
  
  - [ ]* 6.5 编写Overview页面单元测试
    - 测试TrackingSearch显示
    - 测试ActionCard显示
    - 测试追踪号验证
    - 测试卡片点击导航
    - _Requirements: 4.1-6.9_
  
  - [ ]* 6.6 编写Overview页面属性测试
    - **Property: Tracking number validation**
    - **Property: Batch search limit enforcement**
    - **Property: Action card navigation**
    - **Property: Delivered time display logic**
    - **Validates: Requirements 4.6, 4.7, 5.2, 5.3, 6.4-6.7**

- [ ] 7. 实现ShipmentDetail页面（新）
  - [ ] 7.1 创建ShipmentDetail组件基础结构
    - 单屏布局，无需滚动
    - 顶部：4个操作按钮（Create Shipment, Schedule Pickup, Manage Pickup, Rate）
    - Package Info区域：Create Time, Billing Ref, Length, Width, Height, Weight
    - Tracking History区域：时间线视图
    - Sender Info区域：姓名和完整地址
    - Receiver Info区域：姓名和完整地址
    - Proof of Delivery区域：Delivery Date, Signed by
    - _Requirements: 7.1, 7.2, 7.7, 7.8, 7.9, 7.10, 7.11, 7.12_
  
  - [ ] 7.2 实现ShipmentDetail操作按钮
    - Create Shipment按钮导航到Ship With Account页面
    - Schedule Pickup按钮导航到Schedule Pickup页面
    - Manage Pickup按钮导航到Cancel Scheduled Pickup页面
    - Rate按钮导航到Calculate Rates页面
    - _Requirements: 7.3, 7.4, 7.5, 7.6_
  
  - [ ] 7.3 实现ShipmentDetail响应式布局
    - 桌面：单屏展示
    - 移动：可能需要滚动
    - 使用全屏宽度高效展示
    - _Requirements: 7.12, 13.1, 13.2, 13.3_
  
  - [ ]* 7.4 编写ShipmentDetail单元测试
    - 测试所有信息区域显示
    - 测试操作按钮导航
    - _Requirements: 7.1-7.12_
  
  - [ ]* 7.5 编写ShipmentDetail属性测试
    - **Property: All shipment info sections present**
    - **Property: Action button navigation**
    - **Validates: Requirements 7.1-7.12**

- [ ] 8. 实现Claim页面（新）
  - [ ] 8.1 创建ClaimPage组件
    - 显示"Your claims"区域
    - 显示"Click for New Claim Link"按钮
    - 实现可展开的索赔选项区域
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ] 8.2 实现新建索赔导航
    - 点击按钮导航到索赔提交表单
    - _Requirements: 8.5_
  
  - [ ]* 8.3 编写ClaimPage单元测试
    - 测试页面显示
    - 测试按钮导航
    - _Requirements: 8.1-8.5_

- [ ] 9. 实现Admin页面重新设计
  - [ ] 9.1 更新UserManagement组件
    - 添加Login/Username字段
    - 添加Password字段
    - 添加公司信息字段：Account Number, Company Name, Phone, Address, City, State, Zip
    - 添加权限设置：Billing Reference Required, User Admin, Show only user shipment
    - 实现用户列表显示（带编辑和删除选项）
    - 实现删除确认对话框
    - 实现表单验证
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_
  
  - [ ] 9.2 实现Admin权限控制
    - 非管理员用户显示访问拒绝消息
    - _Requirements: 9.9_
  
  - [ ]* 9.3 编写Admin页面单元测试
    - 测试表单字段显示
    - 测试权限控制
    - 测试删除确认对话框
    - _Requirements: 9.1-9.9_
  
  - [ ]* 9.4 编写Admin页面属性测试
    - **Property: Form validation**
    - **Property: Permission-based access control**
    - **Property: User CRUD operations**
    - **Validates: Requirements 9.1-9.9**

- [ ] 10. 实现Address Book页面增强
  - [ ] 10.1 更新AddressBook组件
    - 添加搜索功能
    - 添加Address Type字段（Residential/Commercial）
    - 实现与Ship With Account页面的集成
    - 优化地址列表显示
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9_
  
  - [ ]* 10.2 编写Address Book增强功能测试
    - 测试搜索功能
    - 测试地址类型选择
    - 测试Ship With Account集成
    - _Requirements: 10.2, 10.8, 10.9_
  
  - [ ]* 10.3 编写Address Book属性测试
    - **Property: Address search filtering**
    - **Property: Address type validation**
    - **Property: In-use address protection**
    - **Validates: Requirements 10.2, 10.7, 10.9**

- [ ] 11. 实现Report页面（新）
  - [ ] 11.1 创建ReportPage组件
    - 实现日期范围选择器
    - 实现"Run Report"按钮
    - 实现报告结果表格显示
    - 实现"Export CSV"功能（带导出对话框）
    - 实现打印功能
    - 保持TrackPackage实现的所有现有功能
    - 无列间垂直边框
    - 状态显示柔和视觉效果
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9_
  
  - [ ]* 11.2 编写Report页面单元测试
    - 测试日期范围选择
    - 测试报告生成
    - 测试导出功能
    - 测试打印功能
    - _Requirements: 11.1-11.9_
  
  - [ ]* 11.3 编写Report页面属性测试
    - **Property: Date range validation**
    - **Property: Report data export**
    - **Validates: Requirements 11.2, 11.5**

- [ ] 12. 实现Billing页面（占位符）
  - [ ] 12.1 创建BillingPage组件
    - 显示专业的"Coming Soon"消息
    - 包含相关图标或插图
    - _Requirements: 12.1, 12.2, 12.3_
  
  - [ ] 12.2 配置Billing导航项
    - 可选：在导航中隐藏
    - 可选：显示为禁用状态
    - _Requirements: 12.4, 12.5_

- [ ] 13. 实现路由系统更新
  - [ ] 13.1 更新App.tsx路由配置
    - 添加路由：/overview, /claim, /admin, /address-book, /report, /billing
    - 保持现有路由：/ship, /calculate-rates, /schedule-pickup, /manage-pickup
    - 添加动态路由：/shipment/:id
    - 实现404错误页面
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_
  
  - [ ] 13.2 实现路由历史管理
    - 支持浏览器后退/前进按钮
    - 更新浏览器历史记录
    - 保持向后兼容性
    - _Requirements: 15.6, 15.7, 15.8_
  
  - [ ]* 13.3 编写路由测试
    - 测试所有路由可访问
    - 测试404处理
    - 测试浏览器导航
    - _Requirements: 15.1-15.8_

- [ ] 14. 实现搜索功能增强
  - [ ] 14.1 更新NavigationBar搜索功能
    - 实现追踪号格式验证
    - 实现无效追踪号错误消息
    - 支持LSO追踪号格式
    - _Requirements: 16.2, 16.3, 16.4_
  
  - [ ] 14.2 实现搜索建议功能
    - 输入时显示搜索建议
    - _Requirements: 16.5_
  
  - [ ]* 14.3 编写搜索功能属性测试
    - **Property: Valid tracking number search**
    - **Property: Invalid tracking number handling**
    - **Property: Tracking format support**
    - **Property: Search suggestions**
    - **Validates: Requirements 16.2, 16.3, 16.4, 16.5**

- [ ] 15. 实现响应式设计更新
  - [ ] 15.1 更新全局样式和主题
    - 确保LSO品牌颜色一致性
    - 更新字体和排版样式
    - 定义新的间距和断点常量
    - _Requirements: 14.1, 14.5_
  
  - [ ] 15.2 实现响应式断点
    - 移动（< 768px）：单列布局
    - 平板（768-1024px）：双列布局
    - 桌面（> 1024px）：多列布局
    - _Requirements: 13.1, 13.2, 13.3_
  
  - [ ] 15.3 确保触摸友好性
    - 移动设备上所有交互元素至少44x44px
    - _Requirements: 13.4_
  
  - [ ] 15.4 实现设计一致性
    - 统一按钮样式
    - 统一图标样式
    - 统一间距和对齐
    - 边框样式徽章（Service Type蓝色，Status橙色）
    - 柔和视觉效果（降低不透明度）
    - _Requirements: 14.2, 14.3, 14.4, 14.6, 14.7_
  
  - [ ]* 15.5 编写响应式布局测试
    - 测试移动布局
    - 测试平板布局
    - 测试桌面布局
    - _Requirements: 13.1, 13.2, 13.3_
  
  - [ ]* 15.6 编写设计一致性属性测试
    - **Property: Touch target sizing**
    - **Property: Button style consistency**
    - **Property: Icon style consistency**
    - **Property: Brand color usage**
    - **Validates: Requirements 13.4, 14.2, 14.3, 14.5**

- [ ] 16. 迁移现有功能到新架构
  - [ ] 16.1 迁移Ship With Account页面
    - 确保与新导航系统集成
    - 确保与Address Book集成
    - _Requirements: 10.8_
  
  - [ ] 16.2 迁移Calculate Rates页面
    - 确保从Overview和ShipmentDetail可访问
    - _Requirements: 6.6, 7.6_
  
  - [ ] 16.3 迁移Track Package功能
    - 将报告功能提取到Report页面
    - 保持追踪功能在Overview页面
    - _Requirements: 11.7_
  
  - [ ] 16.4 更新所有页面的导航引用
    - 替换TabNavigation为MainNavigation
    - 更新所有内部链接
    - _Requirements: 3.1-3.9_

- [ ] 17. Checkpoint - 确保核心功能正常
  - 测试所有6个导航模块可访问
  - 测试Overview页面追踪搜索功能
  - 测试ShipmentDetail页面显示
  - 测试所有页面间导航
  - 如有问题，请询问用户

- [ ] 18. 实现错误处理和边缘情况
  - [ ] 18.1 创建错误边界组件
    - 捕获组件错误
    - 显示友好错误消息
    - _Requirements: 所有需求的错误处理_
  
  - [ ] 18.2 实现加载状态
    - 创建Loading组件
    - 在数据加载时显示
    - _Requirements: 所有需求的加载状态_
  
  - [ ] 18.3 实现空状态组件
    - 创建EmptyState组件
    - 在各列表为空时使用
    - _Requirements: 各页面的空状态_
  
  - [ ] 18.4 实现确认对话框
    - 创建ConfirmDialog组件
    - 用于删除操作确认
    - _Requirements: 9.7, 10.6_

- [ ] 19. 性能优化
  - [ ] 19.1 实现代码分割
    - 使用React.lazy和Suspense
    - 按路由分割代码
  
  - [ ] 19.2 优化渲染性能
    - 使用React.memo优化组件
    - 使用useMemo和useCallback
  
  - [ ] 19.3 优化资源加载
    - 图片懒加载
    - 字体优化

- [ ] 20. 最终测试和验证
  - [ ]* 20.1 运行所有单元测试
    - 确保所有测试通过
    - 检查测试覆盖率
  
  - [ ]* 20.2 运行所有属性测试
    - 确保所有属性测试通过（100次迭代）
    - 验证所有正确性属性
  
  - [ ] 20.3 手动测试所有用户流程
    - 测试完整的导航流程
    - 测试所有CRUD操作
    - 测试响应式布局
  
  - [ ] 20.4 验证设计一致性
    - 检查所有页面符合LSO设计指南
    - 验证颜色、字体、间距一致性
    - 验证响应式布局在所有设备上正常

- [ ] 21. 最终检查点
  - 确保所有6个导航模块功能完整
  - 确保所有测试通过
  - 确保响应式布局在所有设备上正常
  - 确保符合LSO设计指南
  - 确保向后兼容性
  - 如有问题，请询问用户

## Notes

- 任务标记`*`的为可选测试任务，可跳过以加快MVP开发
- 每个任务都引用了具体的需求编号以便追溯
- 检查点确保增量验证
- 属性测试验证通用正确性属性
- 单元测试验证具体示例和边缘情况
- 使用TypeScript确保类型安全
- 使用fast-check进行基于属性的测试
- 每个属性测试运行100次迭代
- 保留已完成的任务（标记为[x]）
- 新增任务专注于导航重新设计和新模块实现
