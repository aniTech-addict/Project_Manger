class ApiResponse {
  constructor(res, status, data, message, options = {}) {
    res.status(status).json({
      success: status < 400,
      message,
      data,
      ...options,
    });
  }
}

export default ApiResponse;
