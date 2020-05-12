import logger from './logger'
import _ from 'lodash'

function Responder () {}

/*
 * This method sends the response to the client.
 */
function sendResponse (res, status, body) {
  if (!res.headersSent) {
    if (body) {
      return res.send(body, status)
    }
    return res.send(status)
  } else {
    logger.error('Response already sent.')
  }
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Responder.success = (res, message) => {
  message = _.isString(message) ? { message } : message
  return sendResponse(res, 200, { result: message })
}

Responder.created = (res, object) => {
  return sendResponse(res, 201, object)
}

Responder.deleted = res => {
  return sendResponse(res, 204)
}

Responder.operationFailed = (res, reason) => {
  const status = reason.status || 400
  if (reason.name === 'SequelizeUniqueConstraintError') {
    reason = reason.errors.map(er => {
      let errors = {}
      errors[er.path] = er.message
      return errors
    })
  } else {
    reason = reason.message || reason
  }
  delete reason.status
  let errors = [reason]
  if (reason instanceof Object)
    errors = _.flatten(
      _.flatMap(reason).map(object => {
        return _.flatMap(object)
      })
    )
  return sendResponse(res, status, { reason, errors })
}

export default Responder
