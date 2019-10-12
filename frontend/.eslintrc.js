module.exports = {
  root: true,
  env: {
    es6: true,
    node: false,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    jsx: true,
    useJSXTextNode: true,
    sourceType: 'module',
    tsconfigRootDir: '.',
    project: 'tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],
  settings: {
    'import/resolver': { typescript: {} },
    react: { version: 'detect' },
  },
  rules: {
    'prettier/prettier': 'error',

    // TypeScript에서 이미 잡고 있는 문제이기 때문에 + location, document 등의 global variable도 잡아서
    'no-undef': 'off',

    // 아래 3개의 경우, Prettier가 이미 잘 해 주고 있는 부분이기 때문에
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    semi: 'off',

    // 이미 널리 쓰이고 있어 에러 수가 감당이 되지 않아 잠시 꺼둡니다.
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Strict-boolean-expression을 사용할지 아직 결론이 나지 않아서
    'no-extra-boolean-cast': 'off',

    // union type을 받는 함수에서 모든 경우의 수에 대해 return 해도 eslint가 추론하지 못하고 있어서 warn만 하고 있음
    'getter-return': 'warn',

    // 대부분의 경우 필요가 없어서
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Hoisting을 전략적으로 사용한 경우가 많아서
    '@typescript-eslint/no-use-before-define': 'off',

    // 모델 정의 부분에서 class와 interface를 합치기 위해 사용하는 용법도 잡고 있어서
    '@typescript-eslint/no-empty-interface': 'off',

    // 모델 정의 부분에서 파라미터 프로퍼티를 잘 쓰고 있어서
    '@typescript-eslint/no-parameter-properties': 'off',

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'util',
            importNames: ['isArray'],
            message: '`Array.isArray`를 대신 사용해주세요!',
          },
        ],
      },
    ],

    '@typescript-eslint/camelcase': ['error', { properties: 'never', ignoreDestructuring: true }],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'private-static-field',
          'public-instance-field',
          'private-instance-field',
          'public-constructor',
          'private-constructor',
          'public-instance-method',
          'private-instance-method',
        ],
      },
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    curly: ['error', 'all'],
    'import/no-cycle': ['error', { maxDepth: Infinity }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'import/no-duplicates': 'error',

    // TypeScript에서 이미 잘 해주고 있어서
    'react/prop-types': 'off',

    // React.memo, React.forwardRef에서 사용하는 경우도 막고 있어서
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
