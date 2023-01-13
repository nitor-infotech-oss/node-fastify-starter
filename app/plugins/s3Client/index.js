import fastifyPlugin from 'fastify-plugin'
import AWS from 'aws-sdk'
import config from '../../../config/app'

function s3Storage(fastify, options, next) {
  const s3Config = config.get('aws_s3')

  const s3Client = new AWS.S3({
    accessKeyId: s3Config.access_key,
    secretAccessKey: s3Config.secret_key,
    region: s3Config.region
  })

  const downloadParams = {
    Bucket: s3Config.bucket
  }

  const s3 = {}
  s3.s3Client = s3Client
  s3.downloadParams = downloadParams

  fastify.decorate('s3', s3)
  next()
}

export default fastifyPlugin(s3Storage)
