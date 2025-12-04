import antfu from '@antfu/eslint-config'

export default antfu({
  // 启用 React/JSX 规则集（需要 @eslint-react/eslint-plugin）
  react: true,
  // 明确忽略构建产物
  ignores: ['dist'],
  // 指定 TS 配置，确保类型信息可用
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
