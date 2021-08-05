const validarCampos = require('./validar-campos.middleware');
const validateJWT = require('./validate-jwt-middleware');
const validateRoles = require('./validate-role-middleware');

module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...validateRoles,
};