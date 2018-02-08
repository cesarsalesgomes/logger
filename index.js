const winston = require('winston');
require('winston-daily-rotate-file');

const utils = require('./utils');

/**
 *
 * @param dir - String com o nome do diretório onde serão armazenados os logs (/logs/ENV/dir?/YYYY/MM/DD.log)
 * @param levels - Array de strings com os levels adotados pelos logs. O padrão de levels npm será adotado caso não for definido
 *
 */
const logger = (dir, levels) => {
    // Cria o diretório de logs caso não existir
    let logDir = utils.createDir(__dirname, 'logs');

    // Cria o diretório de ambiente caso não existir
    let enviroment = '';
    switch (process.env.NODE_ENV) {
        case 'development':
            enviroment = 'DEV';
            break;
        case 'production':
            enviroment = 'PROD';
            break;
        default:
            enviroment = 'DEV';
            break;
    }
    logDir = utils.createDir(logDir, enviroment);

    // Cria o diretório especificado no construtor caso não existir
    if (dir) logDir = utils.createDir(logDir, dir);

    // Pré-configuração de como os logs serão criados
    const transport = new winston.transports.DailyRotateFile({
        filename: logDir,
        datePattern: '/yyyy/MM/dd.log',
        createTree: true,
        json: false, // Necessário para que a formatação abaixo seja aplicada
        timestamp: function() {
            return Date.now();
        },
        formatter: options => {
            const now = new Date(options.timestamp());

            let hours = utils.addZero(now.getHours(now));
            let minutes = utils.addZero(now.getMinutes(now));
            let seconds = utils.addZero(now.getSeconds(now));
            let miliseconds = now.getMilliseconds(now);

            return `[${hours}:${minutes}:${seconds}.${miliseconds}] [${options.level.toUpperCase()}] ${
                options.message
            }`;
        }
    });

    // Checa se o parâmetro levels foi enviado e se é um array
    // Caso verdadeiro, troca o padrão de levels npm pelo enviado
    let checkLevels = false;
    let customLevels = {};
    if (levels && Array.isArray(levels)) {
        checkLevels = true;

        for (let i = 0; i < levels.length; i++) {
            customLevels[levels[i]] = i;
        }
    }

    return new winston.Logger({
        level: checkLevels ? levels[levels.length - 1] : undefined,
        levels: checkLevels ? customLevels : undefined,
        transports: [transport]
    });
};

module.exports = logger;
