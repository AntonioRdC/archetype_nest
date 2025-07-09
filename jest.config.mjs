export default {
    rootDir: './',
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    resetMocks: true,
    restoreMocks: true,
    clearMocks: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@infra/(.*)$': '<rootDir>/src/infra/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
    },
    coverageReporters: ['text'],
    testMatch: ['<rootDir>/tests/**/*.unit.ts'],
};
