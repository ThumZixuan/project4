/**
 * Mock for expo-camera
 * Used in testing
 */

export const Camera = 'Camera';

export const CameraType = {
  back: 'back',
  front: 'front',
};

export const requestCameraPermissionsAsync = jest.fn(async () => ({
  status: 'granted',
}));

export default {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
};
