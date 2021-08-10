const dbValidators = require('./db-validators');
const factoryJWT = require('./factory-jwt');
const googleVerify = require('./google.verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...factoryJWT,
    ...googleVerify,
    ...uploadFile,
};
