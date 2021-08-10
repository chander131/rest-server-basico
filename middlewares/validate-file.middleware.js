const { request, response } = require("express");

const hasFiles = async (req = request, res = response, next) => {
    const files = req.files;
    if (!files || Object.keys(files).length === 0 || !files?.file) {
        return res.status(400).send({ message: 'No hay archivos para subir' });
    }
    next();
};

module.exports = {
    hasFiles,
};