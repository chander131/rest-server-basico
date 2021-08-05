const { request, response } = require('express');
const { ALLOWEDROLES } = require('../config/constants');

const validateRole = async (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'No existe información del rol en la petición'
        });
    }

    const { rol, nombre } = req.user;

    if (!ALLOWEDROLES.includes(rol)) {
        return res.status(401).json({ message: `Usuario ${nombre}: no posee permisos para ejecutar esta acción` });
    }

    next();
};

const hasRole = (...roles) => async (req = request, res = response, next) => {
    const { user } = req;
    if (!user) {
        return res.status(500).json({
            message: 'No existe información del rol en la petición'
        });
    }

    if (!roles.includes(user.rol)) {
        return res.status(401).json({ message: `Usuario ${user.nombre}: no posee permisos para ejecutar esta acción` });
    }

    next();
};

module.exports = {
    validateRole,
    hasRole,
};
