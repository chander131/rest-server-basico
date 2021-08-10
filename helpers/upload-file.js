const path = require('path');
const { v4: uuidv4 } = require('uuid');

const exts = ['png', 'jpg', 'jpeg', 'gif'];

const uploadsFiles = (
    files,
    extensionesValidas = exts,
    carpeta = '',
) => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const nombreCortado = file.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extencion: ${extension} no es permitida - ${extensionesValidas}`);
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(nameTemp);
        });
    });

};

module.exports = {
    uploadsFiles,
};
