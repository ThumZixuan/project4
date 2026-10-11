module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage|expo-status-bar|expo-camera|expo-audio|expo-image-manipulator|@react-navigation)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  moduleNameMapper: {
    '^expo-status-bar$': '<rootDir>/node_modules/expo-status-bar',
    '^expo-camera$': '<rootDir>/__mocks__/expo-camera.js',
    '^expo-audio$': '<rootDir>/__mocks__/expo-audio.js',
    '^expo-image-manipulator$': '<rootDir>/__mocks__/expo-image-manipulator.js',
  },
  collectCoverageFrom: ['screens/**/*.{js,jsx}', 'components/**/*.{js,jsx}', 'utils/**/*.{js,jsx}', '!**/*.test.{js,jsx}'],
};
