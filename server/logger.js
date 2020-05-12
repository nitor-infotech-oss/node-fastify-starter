import winston from 'winston'
import fs from 'fs'
import config from '../config/app'

const logDir = 'logs'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

// winston.emitErrs = true

let logLevel = config.get('log_level')

const timestampFormat = () => {
  const date = new Date()
  return `${date.toDateString()} - ${date.toLocaleTimeString()}`
}

const transports = [
  new winston.transports.Console({
    level: logLevel,
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: timestampFormat
  })
]

const logger = winston.createLogger({
  transports: transports,
  exitOnError: false
})

export default class Logger {
  static info (logTitle, argHash) {
    this.log('info', logTitle, argHash)
  }

  static debug (logTitle, argHash) {
    this.log('debug', logTitle, argHash)
  }

  static error (logTitle, argHash) {
    this.log('error', logTitle, argHash)
  }

  static log (logType, logTitle, argHash) {
    const allArgs = Object.assign({ logTitle }, argHash)
    const logMessage = this.buildMessage(allArgs)
    this.writeToLog(logType, logTitle, logMessage, argHash)
  }

  static writeToLog (logType, logTitle, logMessage, argHash) {
    if (argHash && ['start', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](this.generateWrapStr(logTitle, 'START'))
    } else if (argHash && ['end', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](this.generateWrapStr(logTitle, 'END'))
    } else {
      logger[logType](...logMessage)
    }
  }

  static generateWrapStr (logTitle, seperatorType) {
    return `${seperatorType}${'='.repeat(
      15
    )}${logTitle.toUpperCase()}${'='.repeat(15)}${seperatorType}`
  }

  static buildMessage (logAttrs) {
    let msg = [`${logAttrs.logTitle} => `]
    if (logAttrs.klass) {
      msg.push('Class:', logAttrs.klass.name, ',')
    }
    if (logAttrs.message) {
      msg.push('Message:', logAttrs.message, ',')
    }
    if (logAttrs.context) {
      msg.push('Context:', logAttrs.context, ',')
    }
    if (logAttrs.metadata) {
      msg.push('Metadata:', logAttrs.metadata, ',')
    }
    if (logAttrs.tagCtx) {
      msg.push('TagsCtx:', logAttrs.tagCtx, ',')
    }
    if (logAttrs.userCtx) {
      msg.push('UserCtx:', logAttrs.userCtx, ',')
    }
    if (logAttrs.exception) {
      msg.push('ExceptionBacktrace:', logAttrs.exception.stack, ',')
    }
    if (logAttrs.stack) {
      msg.push('ExceptionBacktrace:', logAttrs.stack, ',')
    }
    if (logAttrs.fault) {
      msg.push('Fault:', logAttrs.fault, ',')
    }
    return msg
  }
}
