module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '^@api$': '<rootDir>/src/utils/burger-api',
      '^@utils-types$': '<rootDir>/src/utils/types',
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
    transform: {
      '^.+\\.tsx?$': ['ts-jest']
    }
  };