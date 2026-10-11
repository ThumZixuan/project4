/**
 * Performance Monitor Utility
 * From Activity 10: Optimized List
 *
 * STATUS: 100% COMPLETE - USE AS IS ✅
 *
 * Provides methods for monitoring app performance:
 * - Track render times
 * - Monitor memory usage
 * - Log performance metrics
 *
 * Usage:
 *   PerformanceMonitor.startRender('GalleryScreen');
 *   // ... render logic ...
 *   PerformanceMonitor.endRender('GalleryScreen');
 */

class PerformanceMonitorClass {
  constructor() {
    this.renderTimes = {};
    this.memoryWarnings = 0;
  }

  /**
   * Start tracking render time for a component
   * @param {string} componentName - Name of the component
   */
  startRender(componentName) {
    this.renderTimes[componentName] = {
      start: Date.now(),
    };
  }

  /**
   * End tracking and log render time
   * @param {string} componentName - Name of the component
   * @returns {number} Render time in milliseconds
   */
  endRender(componentName) {
    if (!this.renderTimes[componentName]) {
      console.warn(`No start time found for ${componentName}`);
      return 0;
    }

    const endTime = Date.now();
    const renderTime = endTime - this.renderTimes[componentName].start;

    // Log if render time exceeds threshold (16ms for 60fps)
    if (renderTime > 16) {
      console.warn(
        `⚠️ ${componentName} took ${renderTime}ms to render (>16ms)`
      );
    } else {
      console.log(`✅ ${componentName} rendered in ${renderTime}ms`);
    }

    delete this.renderTimes[componentName];
    return renderTime;
  }

  /**
   * Log memory warning
   */
  logMemoryWarning() {
    this.memoryWarnings++;
    console.warn(`⚠️ Memory warning #${this.memoryWarnings}`);
  }

  /**
   * Get performance summary
   * @returns {object} Performance metrics
   */
  getSummary() {
    return {
      memoryWarnings: this.memoryWarnings,
      activeRenders: Object.keys(this.renderTimes).length,
    };
  }

  /**
   * Reset all metrics
   */
  reset() {
    this.renderTimes = {};
    this.memoryWarnings = 0;
  }
}

// Export singleton instance
export const PerformanceMonitor = new PerformanceMonitorClass();

// Export class for testing
export default PerformanceMonitorClass;
