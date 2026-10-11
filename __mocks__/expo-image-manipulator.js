/**
 * Mock for expo-image-manipulator
 * Used in testing
 */

export const manipulateAsync = jest.fn(async (uri, actions, options) => ({
  uri: `optimized_${uri}`,
  width: 400,
  height: 300,
}));

export const SaveFormat = {
  JPEG: 'jpeg',
  PNG: 'png',
};

export default {
  manipulateAsync,
  SaveFormat,
};
