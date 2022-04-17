module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.jsx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { jsx: true },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.(s?css|png|jpg)$': 'identity-obj-proxy',
  },
  coverageReporters: [
    'cobertura',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-router-transition)/)',
  ],
};
