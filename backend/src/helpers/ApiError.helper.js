class ApiError extends Error {
  constructor(statusCode, message = '', data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = 'ApiError';
  }
}

export default ApiError;
