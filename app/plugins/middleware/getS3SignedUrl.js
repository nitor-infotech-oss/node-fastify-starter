import fastifyPlugin from 'fastify-plugin'

function getS3SignedUrl(server, opts, next) {
  server.decorate('getS3SignedUrl', (data) => {
    return new Promise((resolve, reject) => {
      const {
        bucket,
        bucketFilePath,
        expiry,
        isCustomFileName = false,
        customFileName = 'Bucket File'
      } = data
      const getSignedUrlParams = {
        Bucket: bucket,
        Key: bucketFilePath,
        Expires: expiry
      }
      if (isCustomFileName) {
        getSignedUrlParams.ResponseContentDisposition = `attachment; filename="${customFileName}"`
      }

      server.s3.s3Client.getSignedUrl(
        'getObject',
        getSignedUrlParams,
        (err, url) => {
          if (err) {
            reject(err)
          }
          resolve(url)
        }
      )
    })
  })
  next()
}

export default fastifyPlugin(getS3SignedUrl)
