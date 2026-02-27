# Requirements Document

## Introduction

本文档定义了LSO（物流公司）账户管理系统的需求。该系统为用户提供一个集中的仪表板，用于管理其物流账户、追踪包裹、访问报告和管理配置。系统必须遵循LSO设计指南，提供直观的用户体验。

## Glossary

- **System**: LSO账户管理系统
- **User**: 已登录的LSO账户持有者
- **Admin**: 具有管理权限的用户
- **Dashboard**: 用户账户的主页面
- **Navigation_Bar**: 页面顶部的主导航栏
- **Navigation_Module**: 主导航栏中的功能模块（Overview, Claim, Admin等）
- **Overview_Page**: 系统主页，包含追踪搜索和快速操作
- **Tracking_Search**: 批量追踪号搜索功能
- **Action_Card**: 快速操作卡片
- **Package**: 用户通过LSO运输的货物
- **Shipment**: 一次完整的货运操作
- **Shipment_Details**: 货运详情页面
- **Address_Book**: 存储的收发地址列表
- **Proof_of_Delivery**: 包裹已送达的证明文档
- **Claim**: 货运索赔
- **Report**: 货运数据报告

## Requirements

### Requirement 1: 顶部导航栏

**User Story:** 作为用户，我想要访问主要的系统功能区域，以便我可以在不同的服务之间导航。

#### Acceptance Criteria

1. THE System SHALL display a navigation bar at the top of every page
2. THE Navigation_Bar SHALL include the LSO brand logo on the left side
3. THE Navigation_Bar SHALL display menu items: SHIPPING, SERVICES, TRACKING, ABOUT US
4. THE Navigation_Bar SHALL include a language/region selector
5. THE Navigation_Bar SHALL include a search input with placeholder text "Track a package"
6. WHEN a user clicks on a menu item, THE System SHALL navigate to the corresponding section
7. WHEN a user clicks the logo, THE System SHALL navigate to the home page

### Requirement 2: 用户欢迎区域

**User Story:** 作为用户，我想看到个性化的欢迎信息，以便确认我已登录到正确的账户。

#### Acceptance Criteria

1. THE System SHALL display "MY ACCOUNT" as the page title
2. THE System SHALL display a personalized greeting with the user's first name in format "HI [NAME],"
3. THE System SHALL display a decorative illustration on the right side of the welcome area
4. WHEN a user is not authenticated, THE System SHALL redirect to the login page

### Requirement 3: 主导航模块

**User Story:** 作为用户，我想在账户的不同功能模块之间切换，以便访问不同的管理功能。

#### Acceptance Criteria

1. THE System SHALL display a horizontal navigation bar with 6 main modules
2. THE System SHALL include navigation modules: Overview, Claim, Admin, Address book, Report, Billing
3. WHEN a user clicks on a navigation module, THE System SHALL navigate to the corresponding page
4. THE System SHALL visually highlight the currently active navigation module
5. THE System SHALL maintain navigation state across page transitions
6. THE Navigation modules SHALL have dark gray background (#4a4a4a) when inactive
7. THE Active navigation module SHALL have blue background (#003087)
8. THE Navigation module text SHALL be 17px with font weight 600
9. THE Navigation modules SHALL have 8px border radius on top corners

### Requirement 4: Overview页面 - 追踪搜索

**User Story:** 作为用户，我想在Overview页面顶部快速搜索包裹追踪信息，以便批量查询多个包裹。

#### Acceptance Criteria

1. THE System SHALL display a prominent tracking search box at the top of the Overview page
2. THE System SHALL support batch query of up to 30 tracking numbers
3. THE System SHALL accept comma-separated tracking numbers as input
4. THE System SHALL display placeholder text: "Enter up to 30 tracking numbers, separated by commas"
5. THE System SHALL provide a search button with icon
6. WHEN a user enters more than 30 tracking numbers, THE System SHALL display a validation error
7. WHEN a user submits the search, THE System SHALL display tracking results below the search box

### Requirement 5: Overview页面 - 追踪结果列表

**User Story:** 作为用户，我想查看追踪搜索结果，以便了解包裹的当前状态。

#### Acceptance Criteria

1. THE System SHALL display tracking results in a list format
2. THE System SHALL show "Delivered time" label instead of "Signed" for delivered packages
3. WHEN a package status is not "Delivered", THE System SHALL hide the "Delivered time" field
4. THE System SHALL NOT display delete icon or delete functionality in tracking results
5. THE System SHALL maintain all other tracking result features: filter, export, pagination
6. THE System SHALL display Service Type badge with blue border for each tracking result
7. THE System SHALL display Status badge with orange border for each tracking result

### Requirement 6: Overview页面 - 快速操作卡片

**User Story:** 作为用户，我想快速访问常用功能，以便高效完成日常任务。

#### Acceptance Criteria

1. THE System SHALL display quick action cards on the Overview page
2. THE System SHALL merge "Your Tracking" and "Your Shipments" sections without section titles
3. THE System SHALL display action cards in a user-friendly grid layout
4. THE System SHALL include "Create Shipment" card that navigates to Ship With Account page
5. THE System SHALL include "Schedule Pickup" card that navigates to Schedule Pickup page
6. THE System SHALL include "Calculate Rates" card that navigates to Calculate Rates page
7. THE System SHALL include "Track Package" card that scrolls to tracking search
8. WHEN displaying an action card, THE System SHALL show an icon and title
9. THE System SHALL provide visual feedback on card hover

### Requirement 7: 货运详情页面重新设计

**User Story:** 作为用户，我想在一个屏幕内查看完整的货运详情，以便快速了解所有信息并执行相关操作。

#### Acceptance Criteria

1. THE System SHALL display all shipment information in a single-screen layout without scrolling
2. THE System SHALL display action buttons at the top: Create Shipment, Schedule Pickup, Manage Pickup, Rate
3. WHEN a user clicks "Create Shipment", THE System SHALL navigate to Ship With Account page
4. WHEN a user clicks "Schedule Pickup", THE System SHALL navigate to Schedule Pickup page
5. WHEN a user clicks "Manage Pickup", THE System SHALL navigate to Cancel Scheduled Pickup page
6. WHEN a user clicks "Rate", THE System SHALL navigate to Calculate Rates page
7. THE System SHALL display Package Info section with: Create Time, Billing Ref, Length, Width, Height, Weight
8. THE System SHALL display Tracking History in timeline view
9. THE System SHALL display Sender Info with name and full address
10. THE System SHALL display Receiver Info with name and full address
11. THE System SHALL display Proof of Delivery section with Delivery Date and Signed by
12. THE System SHALL use full screen width efficiently for information display

### Requirement 8: Claim页面

**User Story:** 作为用户，我想提交和查看索赔信息，以便处理货运问题。

#### Acceptance Criteria

1. WHEN a user clicks the "Claim" navigation module, THE System SHALL display the Claim page
2. THE System SHALL display "Your claims" section content
3. THE System SHALL provide a "Click for New Claim Link" button
4. THE System SHALL display claim options in an expandable section
5. WHEN a user clicks the new claim button, THE System SHALL navigate to claim submission form

### Requirement 9: Admin页面 - 用户管理

**User Story:** 作为管理员，我想管理账户用户和公司信息，以便控制系统访问和配置。

#### Acceptance Criteria

1. WHEN a user clicks the "Admin" navigation module, THE System SHALL display the Admin page
2. THE System SHALL display "Add additional user" form for admin users
3. THE System SHALL allow admin users to add new users with: Login/Username, First Name, Last Name, Email, Password
4. THE System SHALL allow admin users to manage company information: Account Number, Company Name, Phone, Address, City, State, Zip
5. THE System SHALL allow admin users to set user permissions: Billing Reference Required, User Admin, Show only user shipment
6. THE System SHALL display a list of existing users with edit and delete options
7. THE System SHALL provide confirmation dialogs for delete operations
8. THE System SHALL validate all form inputs before submission
9. WHEN a non-admin user accesses the Admin page, THE System SHALL display access denied message

### Requirement 10: Address Book页面 - 地址管理

**User Story:** 作为用户，我想管理我的收发地址，以便在创建货运时快速选择。

#### Acceptance Criteria

1. WHEN a user clicks the "Address book" navigation module, THE System SHALL display the Address Book page
2. THE System SHALL display a list of saved addresses with search functionality
3. THE System SHALL allow users to add new addresses with fields: Name/Company, Address Line 1, Address Line 2, City, State, Zip Code, Country, Phone Number, Address Type
4. THE System SHALL allow users to edit existing addresses
5. THE System SHALL allow users to delete addresses with confirmation dialog
6. THE System SHALL validate address format before saving
7. WHEN an address is in use by active shipments, THE System SHALL prevent deletion and display a warning
8. THE System SHALL integrate with Ship With Account page for quick address selection
9. THE System SHALL provide address type selection: Residential or Commercial

### Requirement 11: Report页面

**User Story:** 作为用户，我想生成和导出货运报告，以便分析我的物流数据。

#### Acceptance Criteria

1. WHEN a user clicks the "Report" navigation module, THE System SHALL display the Report page
2. THE System SHALL provide date range selection for report generation
3. THE System SHALL provide "Run Report" button to generate reports
4. THE System SHALL display report results in table format
5. THE System SHALL provide "Export CSV" functionality with export dialog
6. THE System SHALL provide print functionality for reports
7. THE System SHALL maintain all existing report features from TrackPackage implementation
8. THE System SHALL display report columns without vertical borders
9. THE System SHALL display status with softened visual effects

### Requirement 12: Billing页面

**User Story:** 作为用户，我想访问账单功能，以便管理我的财务信息。

#### Acceptance Criteria

1. WHEN a user clicks the "Billing" navigation module, THE System SHALL display the Billing page
2. THE System SHALL display a professional "Coming Soon" message
3. THE System SHALL include relevant icon or illustration on the placeholder page
4. THE System MAY hide the Billing navigation item temporarily
5. THE System MAY show the Billing navigation item in disabled state

### Requirement 13: 响应式布局

**User Story:** 作为用户，我想在不同设备上访问系统，以便随时随地管理我的账户。

#### Acceptance Criteria

1. WHEN the viewport width is less than 768px, THE System SHALL display a mobile-optimized layout
2. WHEN the viewport width is between 768px and 1024px, THE System SHALL display a tablet-optimized layout
3. WHEN the viewport width is greater than 1024px, THE System SHALL display a desktop layout
4. THE System SHALL ensure all interactive elements are touch-friendly on mobile devices
5. THE System SHALL maintain readability and usability across all viewport sizes
6. THE Navigation modules SHALL be responsive and accessible on all device sizes

### Requirement 14: 设计一致性

**User Story:** 作为用户，我想要一个视觉一致的界面，以便获得专业和可信的体验。

#### Acceptance Criteria

1. THE System SHALL follow LSO design guidelines for colors, typography, and spacing
2. THE System SHALL use consistent button styles throughout the interface
3. THE System SHALL use consistent icon styles for all visual elements
4. THE System SHALL maintain consistent spacing and alignment across all components
5. THE System SHALL use the LSO brand color palette for all UI elements
6. THE System SHALL use border-style badges for status and service type displays
7. THE System SHALL apply softened visual effects for status displays with reduced opacity

### Requirement 15: 路由和导航

**User Story:** 作为用户，我想通过URL直接访问特定页面，以便分享链接和使用浏览器导航。

#### Acceptance Criteria

1. THE System SHALL provide unique routes for each main navigation module
2. THE System SHALL support routes: /overview, /claim, /admin, /address-book, /report, /billing
3. THE System SHALL support routes for existing pages: /ship, /calculate-rates, /schedule-pickup, /manage-pickup
4. THE System SHALL support dynamic route for shipment details: /shipment/:id
5. THE System SHALL handle 404 errors with a user-friendly page
6. THE System SHALL maintain backward compatibility with existing bookmarks
7. THE System SHALL update browser history on navigation
8. THE System SHALL support browser back/forward buttons

### Requirement 16: 搜索功能

**User Story:** 作为用户，我想快速搜索包裹追踪号，以便立即查看包裹状态。

#### Acceptance Criteria

1. THE System SHALL provide a search input in the navigation bar
2. WHEN a user enters a tracking number and presses Enter, THE System SHALL navigate to the tracking results
3. WHEN a user enters an invalid tracking number, THE System SHALL display an error message
4. THE System SHALL support tracking number formats used by LSO
5. THE System SHALL provide search suggestions as the user types
