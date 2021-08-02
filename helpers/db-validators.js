const Role = require('../models/role');
const User = require('../models/user');

const esRolValido = async (rol = '') => {
    const isExistRole = await Role.findOne({ rol });
    if (!isExistRole) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
};

const validarEmail = async (correo = '') => {
    const isExist = await User.findOne({ correo });

    if (isExist) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
};

const existUserById = async (id) => {
    const isExist = await User.findById(id);

    if (!isExist) {
        throw new Error(`El usuario con ID: ${id} no existe`);
    }
};

module.exports = {
    esRolValido,
    validarEmail,
    existUserById,
};
