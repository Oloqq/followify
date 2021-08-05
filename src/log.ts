import { Logger } from "../types/log";

const simpleNodeLogger = require('simple-node-logger');
const logger: Logger = simpleNodeLogger.createSimpleLogger('logs/basic.log');
module.exports = logger;
