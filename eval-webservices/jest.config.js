// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js',
    '<rootDir>/tests/cleanup.js',
  ],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.js'],
  // Si vous souhaitez ignorer certains dossiers:
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
