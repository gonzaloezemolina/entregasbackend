import winston from "winston";

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

const colors = {
  debug: 'blue',
  http: 'green',
  info: 'cyan',
  warning: 'yellow',
  error: 'red',
  fatal: 'magenta',
};

winston.addColors(colors);

const developmentLogger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
});

const productionLogger = winston.createLogger({
  levels,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      level: 'info', // Solo registra a partir del nivel info en producción
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'errors.log', // Archivo para registros de nivel error y superior
    }),
  ],
});

// Función para seleccionar el logger adecuado según el entorno
function getLogger() {
  if (process.env.NODE_ENV === 'prod') {
    return productionLogger;
  }
  return developmentLogger;
}

export default getLogger();
