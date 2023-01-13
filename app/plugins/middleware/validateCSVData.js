import fastifyPlugin from 'fastify-plugin'

function validateCSVData(server, opts, next) {
  // This functions checks for empty data, if there is any empty data in required column
  // then true is returned to skip the record entry for chunk files
  server.decorate('checkCSVForBlankData', (data) => {
    const { record, columns } = data
    return Object.keys(record).some((ele) => {
      if (columns[ele].required) {
        if (
          record[ele] === undefined ||
          record[ele] === null ||
          record[ele].length === 0
        ) {
          return true
        } else if (columns[ele].condition) {
          return !columns[ele].condition(record[ele])
        }
      }
      return false
    })
  })

  // This function checks whether the header in CSV are the invalid or not
  server.decorate('checkCSVForInvalidHeaders', (data) => {
    const { header, columns } = data
    // When there is an empty column in header, the fast-csv library
    // adds an empty string in header array

    // Find any missing column or incorrect column and return true
    // to throw error or If excel has empty column inbetween then
    // return true to throw error
    return (
      header.includes('') ||
      Object.keys(columns).some((ele) => {
        return !header.includes(ele)
      })
    )
  })
  next()
}

export default fastifyPlugin(validateCSVData)
