import {JestConfigWithTsJest} from "ts-jest";

import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  passWithNoTests: true,
  forceExit: true,
  detectOpenHandles: true,
  openHandlesTimeout: 10_000,
  clearMocks: true,
  resetMocks: true,
  testTimeout: 20 * 1000, // 20 sec
  testRegex: 'tests/.*\\.test\\.ts$',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: ['dotenv/config']
};
export default config;
