import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'react-refresh/only-export-components': 'off',
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
    'react-dom/no-missing-button-type': 'off',
  },
})
