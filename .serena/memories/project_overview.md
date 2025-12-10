# 项目概要
- 技术栈：React 19 + TypeScript + Vite 7；Tailwind CSS v4（`@import "tailwindcss"`），tw-animate-css，Lucide 图标，Radix UI 组件等；路径别名 `@/*` 指向 `src/*`。
- 主要结构：
  - `src/App.tsx` 通过 `ThemeProvider`、`AuthProvider`、`RouteProvider` 包裹应用。
  - `src/routes/index.tsx` 使用 `react-router-dom` 7 创建路由，包含受保护的 Dashboard、Settings 系列页面和公开的 Auth/错误页面。
  - `src/pages` 下包含 `dashboard`、`setting`、`auth`、`errors` 等页面模块；`src/configs` 下有 `nav-data.ts`、`app-data.ts`、`user.ts`。
  - Vite 入口 `src/main.tsx`，样式入口 `src/index.css`（tailwind 主题变量、字体导入）。
- 目的：提供一个可定制的后台管理/仪表盘模板，涵盖登录注册、设置、错误页等场景。
- 依赖管理：存在 `pnpm-lock.yaml`，默认使用 pnpm。
