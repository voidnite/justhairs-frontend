/**
 * Global error handler middleware.
 * Must be the last middleware registered in server.js.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode
  const isDev = process.env.NODE_ENV === 'development'

  console.error(`[${new Date().toISOString()}] ${err.message}`)

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  })
}

module.exports = errorHandler
