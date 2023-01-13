import fastifyPlugin from 'fastify-plugin'
import fs from 'fs'

function fileReadAndUpload(server, opts, next) {
  server.decorate('fileReadAndUpload', (props) => {
    const { filePath, uploadPath, bucket } = props
    const params = {
      Bucket: bucket,
      Key: uploadPath
    }
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err)
        }
        params.Body = data

        // Call file upload middleware
        server.s3FileUpload(server.s3.s3Client, params, 1, resolve, reject, 3)
      })
    })
  })
  next()
}

export default fastifyPlugin(fileReadAndUpload)
