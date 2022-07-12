module.exports = {
    resetMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/serviceWorker.js", "!src/setupTests.js"],
    setupFiles: ["<rootDir>/src/setupTests"],
    testPathIgnorePatterns: [],
    testURL: "http://project.zion.bt.co.uk:18090",
    coverageReporters: ["html", "text", "lcov"],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    }
};
