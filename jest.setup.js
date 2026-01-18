import '@testing-library/jest-native/extend-expect';

// 1. The "Memory Saver" - Prevents loading heavy images
jest.mock('react-native/Libraries/Image/RelativeImageStub', () => 'RelativeImageStub');

// 2. Mock specific high-res assets
jest.mock('./assets/images/welcome-bg.png', () => 'test-file-stub');

// 3. Global Router Mock (so you can remove it from your individual test files!)
jest.mock('expo-router', () => ({
    useRouter: () => ({
        replace: jest.fn(),
        push: jest.fn(),
        back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
}));

// This runs after every single test file finishes
afterAll(() => {
  if (global.gc) {
    global.gc(); // Manually force the memory to clear
  }
});