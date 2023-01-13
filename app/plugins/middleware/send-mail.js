import fastifyPlugin from 'fastify-plugin'
const sgMail = require('@sendgrid/mail')
import config from '../../../config/app'
const mailerInfo = config.get('mailer_info')
sgMail.setApiKey(mailerInfo.sendgrid_key)

function SendMail(server, opts, next) {
  server.decorate('sendMail', async (details) => {
    const mailData = {
      to: details.email,
      from: mailerInfo.sender,
      subject: details.userTemplate.subject,
      html: details.templateContent
    }
    if (details.attachments) {
      mailData.attachments = details.attachments
    }
    try {
      return await sgMail.send(mailData)
    } catch (error) {
      server.log.info('Error in sending mail: ' + error)
      throw new Error(error)
    }
  })
  next()
}

export default fastifyPlugin(SendMail)
