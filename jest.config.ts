import type { Config } from "jest";
import nextJest from "next/jest.js";

// --- 1. Get the Next.js setup helper ---
const createJestConfig = nextJest({
  dir: "./",
});

// --- 2. Define Custom Configuration ---
const customJestConfig: Config = {
  // Add more setup options before each test is run
  testEnvironment: "jest-environment-jsdom",
  coverageProvider: "v8",
  collectCoverage: true, // Ensure coverage collection is enabled

  // --- 🌟 The Critical Part: Path Alias Mapping 🌟 ---
  // This maps the aliases from your tsconfig.json to Jest's module resolver.
  moduleNameMapper: {
    // Handle module aliases (e.g., '@/components/Button')
    "^@/(.*)$": "<rootDir>/$1",

    // You can be more specific if needed, but the general pattern above covers most cases.
    // Example for your specific folders:
    // '^@/components/(.*)$': '<rootDir>/components/$1',
    // '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    // '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },

  // You might want to include your custom test directory
  testMatch: [
    "<rootDir>/app/**/*.test.{ts,tsx}",
    "<rootDir>/components/**/*.test.{ts,tsx}",
    "<rootDir>/_tests/**/*.test.{ts,tsx}", // Include your _tests directory
    // Add other directories like hooks/ and lib/ as needed
  ],

  // Directories where Jest should look for tests
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/convex/",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
