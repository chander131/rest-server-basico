const validarCampos = require('./validar-campos.middleware');
const validateJWT = require('./validate-jwt-middleware');
const validateRoles = require('./validate-role-middleware');
const validateFiles = require('./validate-file.middleware');

module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...validateRoles,
    ...validateFiles,
};