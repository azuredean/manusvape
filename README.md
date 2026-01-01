# ManusVape - 澳洲电子烟独立站

![ManusVape](https://img.shields.io/badge/ManusVape-Premium%20Vape%20Retailer-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-success)

## 📱 项目概述

ManusVape是一个为澳洲市场设计的高端电子烟独立电商网站，采用**行业顶级前端设计**，提供完整的电商功能和严格的法律合规保障。

### ✨ 核心特性

- **🔐 年龄门控系统** - 严格的18+验证机制，符合澳洲法规
- **🎨 行业顶级设计** - 现代化UI/UX，响应式布局，完美的视觉体验
- **🛍️ 完整电商功能** - 产品展示、购物车、结账流程、订单管理
- **📦 产品管理** - 12款精选产品（RELX、ALIBARBAR、IGET、BIMO四大品牌）
- **🚚 配送管理** - 标准配送和快速配送选项
- **⚖️ 法律合规** - 健康警告、使用条款、隐私政策、TGA声明
- **💾 数据持久化** - 购物车localStorage持久化、数据库订单记录

## 🚀 快速开始

### 前置要求

- Node.js 22.13.0+
- pnpm 10.4.1+
- MySQL/TiDB 数据库

### 安装依赖

```bash
cd /home/ubuntu/manusvape
pnpm install
```

### 数据库配置

```bash
# 运行数据库迁移
pnpm db:push
```

### 开发服务器

```bash
# 启动开发服务器
pnpm dev

# 服务器运行在 http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 📁 项目结构

```
manusvape/
├── client/                    # 前端应用
│   ├── src/
│   │   ├── pages/            # 页面组件
│   │   │   ├── Home.tsx      # 首页
│   │   │   ├── Products.tsx  # 产品列表
│   │   │   ├── ProductDetail.tsx  # 产品详情
│   │   │   ├── Cart.tsx      # 购物车
│   │   │   ├── Checkout.tsx  # 结账
│   │   │   ├── OrderConfirmation.tsx  # 订单确认
│   │   │   ├── AgeGate.tsx   # 年龄门控
│   │   │   └── Compliance.tsx # 法律合规
│   │   ├── components/       # 可复用组件
│   │   │   ├── Header.tsx    # 导航栏
│   │   │   ├── Footer.tsx    # 页脚
│   │   │   ├── ProductCard.tsx # 产品卡片
│   │   │   └── Layout.tsx    # 全局布局
│   │   ├── contexts/         # React Context
│   │   │   └── CartContext.tsx # 购物车状态管理
│   │   ├── data/             # 数据配置
│   │   │   └── products.ts   # 产品数据
│   │   └── public/           # 静态资源
│   │       └── products/     # 产品图片
│   └── index.html
├── server/                   # 后端应用
│   ├── routers/             # tRPC路由
│   │   ├── products.ts      # 产品API
│   │   └── compliance.ts    # 合规API
│   ├── db.ts                # 数据库查询
│   ├── routers.ts           # 主路由
│   └── auth.logout.test.ts  # 测试文件
├── drizzle/                 # 数据库架构
│   └── schema.ts            # 数据库表定义
├── shared/                  # 共享代码
├── package.json
└── README.md
```

## 🎯 主要功能

### 1. 年龄门控系统
- 两种验证方式：出生日期和复选框确认
- 审计日志记录所有验证尝试
- 符合澳洲法规要求

### 2. 产品展示
- 12款精选产品展示
- 按品牌、口味、尼古丁含量、价格筛选
- 产品详情页面，包含规格、评价、相关产品推荐

### 3. 购物车系统
- 实时购物车更新
- localStorage持久化
- 购物车数量实时显示

### 4. 结账流程
- 三步结账流程：
  1. 联系方式输入
  2. 配送地址选择
  3. 订单确认与支付
- 支持标准和快速配送
- 年龄验证确认

### 5. 订单管理
- 订单确认页面
- 订单号生成
- 预计配送时间显示

### 6. 法律合规
- 健康警告显示
- 使用条款页面
- 隐私政策页面
- TGA声明

## 🛠️ 技术栈

### 前端
- **React 19** - UI框架
- **Tailwind CSS 4** - 样式系统
- **shadcn/ui** - UI组件库
- **Wouter** - 路由管理
- **Framer Motion** - 动画库

### 后端
- **Express 4** - Web框架
- **tRPC 11** - RPC框架
- **Drizzle ORM** - 数据库ORM

### 数据库
- **MySQL/TiDB** - 数据存储
- **Drizzle Kit** - 数据库迁移

### 开发工具
- **Vite** - 构建工具
- **TypeScript** - 类型系统
- **Vitest** - 测试框架

## 📊 数据库架构

### 核心表

1. **users** - 用户表
2. **products** - 产品表
3. **orders** - 订单表
4. **orderItems** - 订单项目表
5. **userAddresses** - 用户地址表
6. **ageVerifications** - 年龄验证审计表
7. **cart** - 购物车表

## 🔐 安全性

- ✅ 年龄验证强制执行
- ✅ 审计日志记录
- ✅ 法律条款确认
- ✅ HTTPS加密通信
- ✅ 环境变量管理

## 📝 环境变量

```env
# 数据库
DATABASE_URL=mysql://user:password@host:port/database

# OAuth
JWT_SECRET=your_jwt_secret
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# 应用配置
VITE_APP_ID=your_app_id
VITE_APP_TITLE=ManusVape
VITE_APP_LOGO=/logo.png

# 存储
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your_api_key
```

## 🧪 测试

```bash
# 运行所有测试
pnpm test

# 运行特定测试
pnpm test compliance
pnpm test products
```

## 📱 浏览器支持

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ 移动浏览器（iOS Safari、Chrome Mobile）

## 🌐 页面路由

| 路由 | 描述 |
|------|------|
| `/` | 首页 |
| `/products` | 产品列表 |
| `/product/:id` | 产品详情 |
| `/cart` | 购物车 |
| `/checkout` | 结账 |
| `/order-confirmation` | 订单确认 |
| `/age-gate` | 年龄门控 |
| `/compliance` | 法律合规 |

## 📞 支持

- 📧 Email: support@manusvape.com.au
- 🌐 Website: https://manusvape.com.au
- 📱 Phone: 1300 VAPE AU

## ⚖️ 法律声明

本网站仅面向澳洲18岁及以上的成年人。所有产品的销售和使用受澳洲相关法律法规的约束。购买前请阅读完整的使用条款和隐私政策。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有贡献者和测试人员的支持！

---

**最后更新**: 2026年1月1日  
**版本**: 1.0.0  
**状态**: 生产就绪 ✅
