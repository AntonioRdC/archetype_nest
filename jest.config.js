const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname, './'),
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
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/**/*.{module,dto}.{js,ts}',
        '!src/config/config.ts',
        '!src/main.ts',
    ],
    testMatch: ['<rootDir>/tests/**/*.unit.ts'],
};
