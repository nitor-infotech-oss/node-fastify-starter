import fastifyPlugin from 'fastify-plugin'
import fs from 'fs'

function unlinkFiles(server, opts, next) {
  server.decorate('unlinkFiles', (data) => {
    const { uniqueProcessId, processName, fileCountLimit, fileName } = data
    // Unlink the main file
    // 999999999_<process name>_<file name>.csv
    const mainFilePath = `${uniqueProcessId}_${processName}_${fileName}`
    fs.unlink(mainFilePath, (err) => {
      if (err)
        server.log.info(
          'FILE_UNLINK_ERROR:Unable to unlink file at ' +
            mainFilePath +
            ' due to an error: ' +
            err
        )
      // Emit final progress after all the files are unlinked
      server.log.info('FILE_UNLINK:File unlinked: ' + mainFilePath)
    })

    // Unlink chunk files
    // 999999999_<process name>_<file count>.csv
    for (let fileCount = 1; fileCount <= fileCountLimit; fileCount++) {
      const chunkFilePath = `${uniqueProcessId}_${processName}_${fileCount}.csv`
      fs.unlink(chunkFilePath, (err) => {
        if (err)
          server.log.info(
            'FILE_UNLINK_ERROR:Unable to unlink file at ' +
              chunkFilePath +
              ' due to an error: ' +
              err
          )
        // Emit final progress after all the files are unlinked
        server.log.info('FILE_UNLINK:File unlinked: ' + chunkFilePath)
      })
    }
  })
  server.decorate('unlinkSkippedRecodsFiles', (data) => {
    const { uniqueProcessId, processName, SkippedfileCountLimit } = data
    // unlink skipped records chunk files
    // 999999999_<process name>_SkippedRecords_<skipped file count>.csv
    for (let fileCount = 1; fileCount <= SkippedfileCountLimit; fileCount++) {
      const chunkFilePath = `${uniqueProcessId}_${processName}_SkippedRecords_${fileCount}.csv`
      fs.unlink(chunkFilePath, (err) => {
        if (err)
          server.log.info(
            'FILE_UNLINK_ERROR:Unable to unlink file at ' +
              chunkFilePath +
              ' due to an error: ' +
              err
          )
        // Emit final progress after all the files are unlinked
        server.log.info('FILE_UNLINK:File unlinked: ' + chunkFilePath)
      })
    }
  })
  next()
}

export default fastifyPlugin(unlinkFiles)
