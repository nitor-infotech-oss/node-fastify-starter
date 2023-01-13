import fastifyPlugin from 'fastify-plugin'

function prepareSkippedRecordsMail(server, opts, next) {
  server.decorate('prepareSkippedRecordsMail', async (props) => {
    const {
      email,
      userTemplate,
      donwloadLinkList
    } = props
    const mailDetails = {}
    mailDetails.email = email
    mailDetails.userTemplate = userTemplate
    let templateContent = '<GET THE SKIPPED RECORDS TEMPLATE FROM AN API OR CONFIG>'
    // Replace the data needed in the template
    // Following is the example of using dynamic template to fill the data and finalizing the email body
    // and creating subject
    /*    templateContent = templateContent.replace(
            'userFullName',
            `${firstName} ${lastName}`
          )
          templateContent = templateContent.replace('operationName', operationName)
          // Create subject
          mailDetails.userTemplate.subject = `${userTemplate.subject} - ${operationName}`
    */

    // Prepare the list for html template
    let downloadLinkList = ''
    donwloadLinkList.map((ele, index) => {
      downloadLinkList += `<li><a href="${ele}">Record ${index + 1}</a></li>`
    })

    templateContent = templateContent.replace(
      'listOfDOwnloadLinks',
      downloadLinkList
    )

    mailDetails.templateContent = templateContent

    return mailDetails
  })
  next()
}

export default fastifyPlugin(prepareSkippedRecordsMail)
