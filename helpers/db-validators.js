const { Role, User, Category, Product } = require('../models');

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

const existCategory = async (nombre = '') => {
    const category = nombre.toUpperCase();
    const isExist = await Category.findOne({ nombre: category });

    if (isExist) {
        throw new Error(`La categoría ${nombre} ya existe`);
    }
};

const existCategoryById = async (id = '') => {
    const isExist = await Category.findById(id);

    if (!isExist) {
        throw new Error(`La categoría no existe`);
    }
};

const existProduct = async (nombre = '') => {
    const product = nombre.toUpperCase();
    const isExist = await Product.findOne({ nombre: product });

    if (isExist) {
        throw new Error(`El producto ${nombre} ya existe`);
    }
};

const existProductById = async (id = '') => {
    const isExist = await Product.findById(id);

    if (!isExist) {
        throw new Error(`El producto no existe`);
    }
};

const validCollections = (collection = '', allowedCollections = []) => {
    if (!allowedCollections.includes(collection.toLowerCase().trim())) {
        throw new Error(`La colección: ${collection} no esta permitida - allowedCollections`);
    }
    return true;
};

module.exports = {
    esRolValido,
    validarEmail,
    existUserById,
    existCategory,
    existCategoryById,
    existProduct,
    existProductById,
    validCollections,
};
