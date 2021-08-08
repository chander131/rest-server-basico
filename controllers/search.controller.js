const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const {
    CATEGORIES,
    PRODUCTS,
    USERS,
    ALLOWEDCOLLECTIONS,
} = require('../config/constants');

const { Category, Product, User } = require('../models');

const searchCategory = async (termino = '', res = response) => {
    try {
        const isID = ObjectId.isValid(termino);

        if (isID) {
            const category = await Category.findById(termino).populate('usuario', 'nombre');
            return res.json({ message: 'Categoria encontrada', data: category ? [category] : [] });
        }

        const regex = new RegExp(termino, 'i');

        const categories = await Category
            .find({ nombre: regex, estado: true })
            .populate('usuario', 'nombre');

        res.json({ message: 'Categorías encontradas', data: categories });
    } catch (e) {
        console.log('ERROR in search.controller => searchCategory', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const searchProduct = async (termino = '', res = response) => {
    try {
        const isID = ObjectId.isValid(termino);

        if (isID) {
            const product = await Product
                .findById(termino)
                .populate('categoria', 'nombre')
                .populate('usuario', 'nombre');
            return res.json({ message: 'Producto encontrado', data: product ? [product] : [] });
        }

        const regex = new RegExp(termino, 'i');

        const products = await Product
            .find({ nombre: regex, estado: true })
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre');

        res.json({ message: 'Productos encontrados', data: products });
    } catch (e) {
        console.log('ERROR in search.controller => searchProduct', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const searchUser = async (termino = '', res = response) => {
    try {
        const isID = ObjectId.isValid(termino);

        if (isID) {
            const user = await User.findById(termino);
            return res.json({ message: 'Usuario encontrado', data: user ? [user] : [] });
        }

        const regex = new RegExp(termino, 'i');

        const users = await User.find({
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{ estado: true }],
        });

        res.json({ message: 'Usuario encontrado', data: users });
    } catch (e) {
        console.log('ERROR in search.controller => searchUser', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const search = async (req = request, res = response) => {
    try {
        const { coleccion, termino } = req.params;

        if (!ALLOWEDCOLLECTIONS.includes(coleccion)) {
            return res.status(400).json({ message: `Las colecciones permitidas son: ${ALLOWEDCOLLECTIONS}` });
        }

        switch (coleccion) {
            case CATEGORIES:
                await searchCategory(termino, res);
                break;
            case PRODUCTS:
                await searchProduct(termino, res);
                break;
            case USERS:
                await searchUser(termino, res);
                break;

            default:
                return res.status(500).json({ message: `Se olvido hacer esta busqueda: ${coleccion}` });
        }
    } catch (e) {
        console.log('ERROR in search.controller => search', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = {
    search,
};
