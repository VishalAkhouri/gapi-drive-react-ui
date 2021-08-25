export { }

// module.exports = {
//     "testEnvironment": "node",
//     "roots": [
//         "<rootDir>/pages"
//     ],
//     "preset": 'ts-jest',
//     "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
//     // setupFilesAfterEnv: [
//     //     "@testing-library/react/cleanup-after-each",
//     //     "@testing-library/jest-dom/extend-expect"
//     // ],
//     "transform": {
//         "^.+\\.tsx?$": "ts-jest"
//     },
//     "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
//     "moduleFileExtensions": [
//         "ts",
//         "tsx",
//         "js",
//         "jsx",
//         "json",
//         "node"
//     ],
//     "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"],
//     "snapshotSerializers": ["enzyme-to-json/serializer"],

//     // https://github.com/zeit/next.js/issues/8663#issue-490553899
//     "globals": {
//         // we must specify a custom tsconfig for tests because we need the typescript transform
//         // to transform jsx into js rather than leaving it jsx such as the next build requires. you
//         // can see this setting in tsconfig.jest.json -> "jsx": "react"
//         "ts-jest": {
//             "tsConfig": "tsconfig.jest.json"
//         }
//     }
// }

// module.exports = {
//     testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
//     setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//     transform: {
//         "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
//         "\\.(css|less|scss|sass)$": "identity-obj-proxy"
//     }
// };

// module.exports = {
//     testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/cypress/", "<rootDir>/node_modules/"],
//     setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//     moduleNameMapper: {
//         "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     },
//     globals: {
//         "ts-jest": {
//             "ts-config": "tsconfig.jest.json"
//         }
//     }
// };

module.exports = {
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
      "**/__tests__/*.(ts|tsx)"
    ],
    setupFilesAfterEnv: [
      "<rootDir>/jest.setup.ts"
    ],
    testPathIgnorePatterns: [
      "./.next/",
      "./node_modules/"
    ],
    globals: {
      "ts-jest": {
        "tsconfig": "tsconfig.jest.json"
      }
    }
  }