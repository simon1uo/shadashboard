# 代码风格与约定
- 语言：TypeScript，React 函数组件与 Hooks。
- 样式：Tailwind v4 原子类，使用 `@container`、`@theme` 变量等；保持类名简洁，可复用组件放入 `src/components`。
- 导入与路径：使用 alias `@/`；依赖按组排序；懒加载路由通过 `lazy(() => import('@/...'))`。
- 状态/逻辑：表单使用 `react-hook-form` + `zod`；权限通过 `AuthProvider` + `useAuth()`。
- ESLint：使用 `@antfu/eslint-config` 默认规则，保持无分号、单引号/双引号依 config（当前代码常用单引号与模板字符串），尽量保持现有风格。
