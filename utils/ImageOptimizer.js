/**
 * Image Optimizer Utility
 * From Activity 10: Optimized List
 *
 * STATUS: 100% COMPLETE - USE AS IS ✅
 *
 * Provides methods for optimizing images for mobile devices:
 * - Resize images to optimal dimensions
 * - Compress images to reduce file size
 * - Convert formats for better performance
 *
 * Usage:
 *   const optimizedUri = await ImageOptimizer.optimizeForList(imageUri, 400);
 *   const thumbnail = await ImageOptimizer.createThumbnail(imageUri);
 */

import * as ImageManipulator from 'expo-image-manipulator';

class ImageOptimizerClass {
  /**
   * Optimize image for list rendering
   * Resizes to specified width and compresses
   *
   * @param {string} uri - Original image URI
   * @param {number} width - Target width in pixels (default: 400)
   * @param {number} quality - Compression quality 0-1 (default: 0.7)
   * @returns {Promise<string>} Optimized image URI
   */
  async optimizeForList(uri, width = 400, quality = 0.7) {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width } }],
        { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
      );

      return manipResult.uri;
    } catch (error) {
      console.error('Image optimization error:', error);
      return uri; // Fallback to original image
    }
  }

  /**
   * Create thumbnail from image
   * Smaller and more compressed than list images
   *
   * @param {string} uri - Original image URI
   * @returns {Promise<string>} Thumbnail URI
   */
  async createThumbnail(uri) {
    return this.optimizeForList(uri, 100, 0.5);
  }

  /**
   * Optimize image for full-screen display
   * Higher quality but still compressed
   *
   * @param {string} uri - Original image URI
   * @returns {Promise<string>} Optimized image URI
   */
  async optimizeForFullScreen(uri) {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1080 } }], // Full HD width
        { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
      );

      return manipResult.uri;
    } catch (error) {
      console.error('Full-screen optimization error:', error);
      return uri;
    }
  }

  /**
   * Batch optimize multiple images
   * Optimizes images in parallel for faster processing
   *
   * @param {string[]} uris - Array of image URIs
   * @param {number} width - Target width
   * @param {number} quality - Compression quality
   * @returns {Promise<string[]>} Array of optimized URIs
   */
  async batchOptimize(uris, width = 400, quality = 0.7) {
    try {
      const optimizedPromises = uris.map(uri =>
        this.optimizeForList(uri, width, quality)
      );

      return await Promise.all(optimizedPromises);
    } catch (error) {
      console.error('Batch optimization error:', error);
      return uris; // Fallback to original images
    }
  }

  /**
   * Calculate estimated file size reduction
   * Returns percentage saved
   *
   * @param {number} originalWidth - Original width
   * @param {number} targetWidth - Target width
   * @param {number} quality - Compression quality
   * @returns {number} Estimated percentage reduction
   */
  estimateSizeReduction(originalWidth, targetWidth, quality) {
    const dimensionReduction = Math.pow(targetWidth / originalWidth, 2);
    const compressionReduction = quality;
    const totalReduction = dimensionReduction * compressionReduction;

    return Math.round((1 - totalReduction) * 100);
  }
}

// Export singleton instance
export const ImageOptimizer = new ImageOptimizerClass();

// Export class for testing
export default ImageOptimizerClass;
