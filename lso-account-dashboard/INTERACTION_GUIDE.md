# LSO Account Dashboard - 交互操作指南

## 🎯 快速开始

访问地址：**http://localhost:3002**

## 📋 主要交互功能

### 1. 展开/收起模块

所有主要内容模块都支持展开和收起：

#### Your Tracking（默认展开）
- 点击右上角的 **▲** 按钮收起
- 点击 **▼** 按钮展开
- 点击 "Your tracking options" 查看更多选项

#### Your Shipments（默认展开）
- 点击右上角的 **▲** 按钮收起
- 点击 **▼** 按钮展开
- 点击 "Your shipment options" 查看更多选项

#### Your Claims（默认收起）
- 点击右上角的 **▼** 按钮展开
- 点击 **▲** 按钮收起
- 点击 "Your claim options" 查看更多选项

#### Your Preferences（默认收起）
- 点击右上角的 **▼** 按钮展开
- 点击 **▲** 按钮收起

### 2. 导航菜单下拉

#### SHIPPING 菜单
1. 将鼠标悬停在 "SHIPPING ▼" 上
2. 下拉菜单自动显示
3. 可选择：
   - Ship a Package
   - Create an LSO Account
   - Branch Locator

#### SERVICES 菜单
1. 将鼠标悬停在 "SERVICES ▼" 上
2. 下拉菜单自动显示
3. 可选择：
   - LSO Shipping Rates
   - Schedule an LSO Pickup
   - About Us

#### ABOUT US 菜单
1. 将鼠标悬停在 "ABOUT US ▼" 上
2. 下拉菜单自动显示
3. 可选择：
   - About Us
   - Cookie Program
   - Submit a Claim

### 3. 追踪功能卡片

#### Track a Package
1. 找到 "Track a Package" 卡片（卡车图标）
2. 点击卡片或 "Click Here" 按钮
3. 跳转到包裹追踪页面

#### Reports
1. 找到 "Reports" 卡片（盒子图标）
2. 点击卡片或 "Click Here" 按钮
3. 跳转到报告页面

#### Proof of Delivery
1. 找到 "Proof of Delivery" 卡片（放大镜图标）
2. 点击卡片或 "Click Here" 按钮
3. 跳转到交付证明页面

### 4. 货运操作卡片

#### Create Airbill
1. 找到 "Create airbill" 卡片
2. 点击 "Click Here" 按钮
3. 开始创建运单流程

#### Schedule Pickup
1. 找到 "Schedule pickup" 卡片（时钟图标）
2. 点击 "Click Here" 按钮
3. 安排取件时间

#### Locate a Dropbox
1. 找到 "Locate a dropbox" 卡片（搜索图标）
2. 点击 "Click Here" 按钮
3. 查找附近的投递箱

#### Cancel a Scheduled Pickup
1. 找到 "Cancel a scheduled pickup" 卡片（取消图标）
2. 点击 "Click Here" 按钮
3. 取消已预约的取件

### 5. 标签切换

#### 切换到不同标签
1. 点击顶部标签栏中的任意标签：
   - **Overview** - 查看概览
   - **Datahub** - 数据中心（即将推出）
   - **Add additional user** - 添加用户
   - **Address book** - 管理地址
   - **Group maintenance** - 组维护（即将推出）

2. 当前活动标签会显示蓝色下划线

### 6. 地址簿操作

#### 添加新地址
1. 点击 "Address book" 标签
2. 点击 "+ Add New Address" 按钮
3. 填写表单：
   - Label（标签）
   - Recipient Name（收件人）
   - Address Line 1（地址行1）
   - Address Line 2（地址行2，可选）
   - City（城市）
   - State（州）
   - Postal Code（邮编）
   - Country（国家）
   - Phone（电话）
4. 点击 "Save" 保存

#### 编辑地址
1. 找到要编辑的地址卡片
2. 点击 "Edit" 按钮
3. 修改信息
4. 点击 "Update" 更新

#### 删除地址
1. 找到要删除的地址卡片
2. 点击 "Delete" 按钮
3. 如果地址正在使用中，会显示警告消息
4. 未使用的地址会被直接删除

### 7. 用户管理操作

#### 添加新用户
1. 点击 "Add additional user" 标签
2. 点击 "+ Add New User" 按钮
3. 填写表单：
   - First Name（名）
   - Last Name（姓）
   - Email（邮箱）- 会自动验证格式
   - Role（角色）- 选择 Viewer, User, 或 Admin
4. 点击 "Send Invitation" 发送邀请

#### 移除用户
1. 在用户列表中找到要移除的用户
2. 点击该用户行的 "Remove" 按钮
3. 用户将被移除

### 8. 搜索功能

#### 搜索包裹
1. 在顶部导航栏找到搜索框
2. 输入追踪号码
3. 按 **Enter** 键
4. 跳转到追踪结果页面

### 9. Newsletter 订阅

#### 订阅更新
1. 滚动到页面底部
2. 在 Newsletter 区域找到邮箱输入框
3. 输入您的邮箱地址
4. 点击 "Subscribe" 按钮
5. 订阅成功

### 10. 用户账户

#### 查看账户选项
1. 点击顶部导航栏的 "ANDY ▼"
2. 查看账户相关选项（即将实现）

## 🎨 视觉反馈

### 悬停效果
- **卡片**: 悬停时会轻微上浮并显示阴影
- **按钮**: 悬停时颜色会变深
- **链接**: 悬停时颜色变为蓝色

### 点击反馈
- **按钮**: 点击时会有轻微的按下效果
- **卡片**: 点击时会触发导航或操作

### 展开/收起动画
- **模块**: 展开时有平滑的下滑动画
- **下拉菜单**: 出现时有淡入效果

## 📱 响应式操作

### 桌面（> 1024px）
- 所有功能完整显示
- 卡片以网格形式排列
- 导航菜单横向排列

### 平板（768px - 1024px）
- 卡片网格调整为2列
- 导航菜单保持横向
- 部分内容自适应调整

### 移动（< 768px）
- 卡片垂直堆叠
- 导航菜单可能需要滚动
- 触摸友好的大按钮

## ⚡ 快捷操作

### 快速导航
- 点击 **LSO Logo** - 返回首页
- 点击 **TRACKING** - 直接进入追踪页面
- 点击 **My Account**（页脚）- 返回账户页面

### 快速联系
- 点击 **Call us (888) 438-6000** - 拨打电话
- 点击 **Contact us** 按钮 - 打开联系表单
- 点击 **Email** 链接 - 发送邮件

## 🔍 提示和技巧

1. **保持模块展开**: 常用的模块（Your Tracking, Your Shipments）默认展开
2. **快速搜索**: 使用顶部搜索框快速追踪包裹
3. **地址管理**: 在地址簿中保存常用地址，加快发货速度
4. **用户协作**: 添加团队成员，共同管理账户
5. **订阅更新**: 订阅 Newsletter 获取最新优惠和功能

## ❓ 常见问题

**Q: 如何展开已收起的模块？**
A: 点击模块右上角的 ▼ 按钮

**Q: 下拉菜单不显示怎么办？**
A: 确保鼠标悬停在带有 ▼ 符号的菜单项上

**Q: 为什么无法删除某个地址？**
A: 该地址可能正在被活跃的货运使用，系统会显示警告消息

**Q: 如何切换语言？**
A: 功能即将推出，目前支持英文界面

**Q: 移动设备上如何操作？**
A: 所有功能都支持触摸操作，按钮大小已优化为触摸友好

---

**需要帮助？**
- 📞 电话: (888) 438-6000
- 📧 邮箱: preferredcustomerservice@lso.com
- 📍 地址: 1500 River Pl, Drive, Austin, TX 78728
