import fastifyPlugin from 'fastify-plugin'

function S3FileUpload(server, opts, next) {
  server.decorate(
    's3FileUpload',
    (s3Client, params, retryCount, resolve, reject, maxRetry) => {
      const MAX_FILE_UPLOAD_RETRY = maxRetry || 3
      let count = retryCount || 1
      s3Client
        .upload(params, (err) => {
          if (err) {
            server.log.info(params.Key + 'File upload Error: ' + err)
            if (count > MAX_FILE_UPLOAD_RETRY) {
              reject('File upload error: ' + params.Key)
            } else {
              server.log.info(params.Key + 'upload retry count: ' + count)
              server.s3FileUpload(params, count + 1, resolve, reject, maxRetry)
            }
          } else {
            server.log.info('File ' + params.Key + ' uploaded successfully')
            resolve()
          }
        })
        .on('httpUploadProgress', (progress) => {
          server.log.info(params.Key + 'progress.total: ' + progress.total)
          server.log.info(params.Key + 'progress.loaded: ' + progress.loaded)
          let progressPercentage = Math.round(
            (progress.loaded / progress.total) * 100
          )
          if (progressPercentage < 100) {
            server.log.info(params.Key + ' Progress % - ' + progressPercentage)
          } else if (progressPercentage == 100) {
            server.log.info(params.Key + ' Progress % - ' + progressPercentage)
          }
        })
    }
  )
  next()
}

export default fastifyPlugin(S3FileUpload)
