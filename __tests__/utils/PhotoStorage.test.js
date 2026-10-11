/**
 * PhotoStorage Utility Tests
 * From Activity 11: Test My App
 *
 * STATUS: 30% COMPLETE ⚠️ - STUDENT TODO
 *
 * TODO FOR STUDENTS:
 * - Complete all test cases
 * - Test CRUD operations
 * - Test error handling
 * - Mock AsyncStorage properly
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PhotoStorage } from '../../utils/PhotoStorage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  multiRemove: jest.fn(),
}));

describe('PhotoStorage Utility Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // TODO: Test 1 - Get photos returns empty array initially
  it('returns empty array when no photos stored', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const photos = await PhotoStorage.getPhotos();

    expect(photos).toEqual([]);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@photos');
  });

  // TODO: Test 2 - Save photo successfully
  it('saves a photo successfully', async () => {
    // TODO: Mock existing photos
    // TODO: Call savePhoto
    // TODO: Verify AsyncStorage.setItem was called
    // TODO: Verify photo was added with unique ID
  });

  // TODO: Test 3 - Delete photo by ID
  it('deletes a photo by ID', async () => {
    // TODO: Mock existing photos
    // TODO: Call deletePhoto
    // TODO: Verify photo was removed
    // TODO: Verify AsyncStorage was updated
  });

  // TODO: Test 4 - Handle errors gracefully
  it('handles errors when AsyncStorage fails', async () => {
    // TODO: Mock AsyncStorage to throw error
    // TODO: Call getPhotos
    // TODO: Verify it returns empty array instead of crashing
  });

  // TODO: Test 5 - Clear all data
  it('clears all storage data', async () => {
    AsyncStorage.multiRemove.mockResolvedValue(true);

    const result = await PhotoStorage.clearAll();

    expect(result).toBe(true);
    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
      '@photos',
      '@albums',
    ]);
  });
});

/**
 * TESTING TIPS (from Activity 11):
 *
 * 1. Mock AsyncStorage before tests:
 *    AsyncStorage.getItem.mockResolvedValue('{"id":"1"}');
 *
 * 2. Test both success and failure cases
 *
 * 3. Verify function calls:
 *    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
 *
 * 4. Test edge cases:
 *    - Empty data
 *    - Invalid data
 *    - Network errors
 *
 * 5. Use beforeEach to reset mocks
 */
