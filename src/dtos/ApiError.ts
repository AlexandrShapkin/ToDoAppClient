interface ApiError {
  message: string,
  errors: Error[],
}

export default ApiError;