# 来华留学学校推荐系统

这是一个基于 Next.js 和 TypeScript 开发的来华留学学校推荐系统。系统通过收集用户的学术背景、留学目标、经济条件和个人偏好等信息，为用户推荐最适合的中国高校。

## 功能特点

- 多步骤表单收集用户信息
- 智能推荐算法
- 冲刺、求稳、保底三类推荐方案
- 支持个性化偏好调整
- 多语言支持
- 响应式设计

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Prisma
- PostgreSQL

## 开发环境要求

- Node.js 18+
- PostgreSQL 14+

## 安装步骤

1. 安装 Node.js (推荐使用 nvm)
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 配置 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 安装 Node.js
nvm install 18
nvm use 18
```

2. 安装项目依赖
```bash
npm install
```

3. 配置环境变量
```bash
# 创建 .env 文件并添加以下配置
DATABASE_URL="postgresql://username:password@localhost:5432/study_abroad_db"
```

4. 初始化数据库
```bash
npx prisma migrate dev
```

5. 启动开发服务器
```bash
npm run dev
```

## 项目结构

```
src/
├── app/                    # Next.js 应用目录
│   ├── api/               # API 路由
│   ├── [locale]/         # 多语言路由
│   └── layout.tsx        # 全局布局
├── components/            # React 组件
│   ├── forms/            # 表单相关组件
│   ├── ui/               # UI 组件
│   └── recommendations/  # 推荐相关组件
├── lib/                   # 工具函数和配置
│   ├── prisma/           # Prisma 配置
│   ├── auth/             # 认证相关
│   └── recommendations/  # 推荐算法
└── styles/               # 全局样式
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT 