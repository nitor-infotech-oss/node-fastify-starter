import fastifyPlugin from 'fastify-plugin'
import ObjectsToCsv from 'objects-to-csv'

function prepareSkippedRecords(server, opts, next) {
  server.decorate('prepareSkippedRecords', async (props) => {
    const { skippedRecords, uniqueProcessId, operationKey } = props
    let records = [] // Stores the records for a single chunk
    let skippedRecordsCount = 0 // Used to track the parsed records
    let skippedFileCount = 0 // Count for chunks used to create file name
    const skippedRecordsChunk = 120000 // Chunk size
    const numberOfChunks = parseInt(skippedRecords.length / skippedRecordsChunk)
    const lastChunk =
      skippedRecords.length - skippedRecordsChunk * numberOfChunks
    const skippedRecordFilePaths = []
    let skipProcess = false
    try {
      await Promise.all(
        skippedRecords.map(async (ele) => {
          try {
            // If there any error while adding the file in disk, skip will become true and skip all the
            // futhur processing
            if (skipProcess) return null
            records.push(ele)
            skippedRecordsCount += 1
            // Increase the count till chunk size is reach. Records are pushed in records array.
            if (
              skippedRecordsCount >= skippedRecordsChunk ||
              (numberOfChunks === skippedFileCount &&
                skippedRecordsCount >= lastChunk)
            ) {
              // Convert the data in csv
              const skippedRecordsCSV = new ObjectsToCsv(records)
              // Reset counts and arrays
              skippedRecordsCount = 0
              records = []
              skippedFileCount += 1
              const skippedRecordsFileName = `${uniqueProcessId}_${operationKey}_SkippedRecords_${skippedFileCount}.csv`
              skippedRecordFilePaths.push({
                filePath: skippedRecordsFileName,
                count: skippedFileCount
              })
              await skippedRecordsCSV.toDisk(skippedRecordsFileName)
            }
          } catch (error) {
            skipProcess = true
            throw error
          }
        })
      )
      return skippedRecordFilePaths
    } catch (error) {
      server.unlinkSkippedRecodsFiles({
        uniqueProcessId,
        processName: operationKey,
        SkippedfileCountLimit: skippedRecordFilePaths.length
      })
      throw error
    }
  })
  next()
}

export default fastifyPlugin(prepareSkippedRecords)
