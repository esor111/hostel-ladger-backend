export class ResponseUtil {
  /**
   * Standard response for list/collection endpoints
   * Uses 'result' key to match Express API
   */
  static success(result: any, status: number = 200) {
    return {
      status,
      result
    };
  }

  /**
   * Standard response for statistics endpoints
   * Uses 'stats' key to match Express API
   */
  static stats(stats: any, status: number = 200) {
    return {
      status,
      stats
    };
  }

  /**
   * Standard response for individual items and actions
   * Uses 'data' key to match Express API
   */
  static data(data: any, status: number = 200) {
    return {
      status,
      data
    };
  }

  /**
   * Standard error response
   */
  static error(message: string, status: number = 400, errors?: any) {
    return {
      status,
      message,
      ...(errors && { errors })
    };
  }
}