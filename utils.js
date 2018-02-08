const _path = require('path');
const fs = require('fs');

// Checa e cria o diretório no caminho 'path+dir' e retorna o caminho
const createDir = (path, dir) => {
    let fullPath = _path.join(path, dir);

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }

    return fullPath;
};

// Adiciona um zero a esquerda na string caso seu tamanho for 1
const addZero = str => {
    return str.toString().length === 1 ? '0' + str : str;
};

module.exports = {
    createDir,
    addZero
};
