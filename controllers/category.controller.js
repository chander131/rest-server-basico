const { request, response } = require('express');
const { Types } = require('mongoose');

const ObjectId = Types.ObjectId;

const { Category } = require('../models');

const getCategories = async (req = request, res = response) => {
    let { limit = 10, pagina = 1, orderby = 'asc' } = req.query;
    const filter = { estado: true };


    try {
        let limite = isNaN(Number(limit)) ? 10 : Number(limit);
        let page = (isNaN(Number(pagina)) || pagina === '0') ? 1 : Number(pagina);
        let desde = (page - 1) * limite;
        orderby = orderby.toLowerCase() === 'desc' ? -1 : +1;

        const populate = {
            path: 'usuario',
            select: 'nombre'
        };

        const [categories, total] = await Promise.all([
            Category.find(filter).populate(populate).limit(limite).skip(desde).sort({ _id: orderby }),
            Category.countDocuments(filter)
        ]);


        res.json({ message: 'Peticion exitosa', data: { categories, total } });
    } catch (e) {
        console.log('ERROR in category.controller => getCategories', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const getCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const populate = {
            path: 'usuario',
            select: 'nombre'
        };

        const category = await Category.findById(id).populate(populate);

        res.json({ message: 'Peticion exitosa', data: category });
    } catch (e) {
        console.log('ERROR in category.controller => getCategory', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const addCategory = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
        const { _id } = req.user;

        const category = new Category({ nombre, usuario: new ObjectId(_id), estado: true });
        await category.save();

        res.status(201).json({ message: 'Categoría creada correctamente', data: category });
    } catch (e) {
        console.log('ERROR in category.controller => addCategory', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const updateCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const nombre = req.body.nombre.toUpperCase();

        const category = await Category.findByIdAndUpdate(id,
            { nombre, usuario: new ObjectId(_id) },
            { new: true }
        );

        res.json({ message: 'Petición exitosa', data: category });
    } catch (e) {
        console.log('ERROR in category.controller => updateCategory', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const updatePartialCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const category = await Category.findByIdAndUpdate(id, { nombre }, { new: true });

        res.json({ message: 'Peticion exitosa', data: category });
    } catch (e) {
        console.log('ERROR in category.controller => updatePartialCategory', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const deleteCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;

        const category = await Category.findByIdAndUpdate(id,
            { usuario: new ObjectId(_id), estado: false },
            { new: true }
        );

        res.json({ message: 'Peticion exitosa', data: category });
    } catch (e) {
        console.log('ERROR in category.controller => deleteCategory', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};


module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    updatePartialCategory,
    deleteCategory,
};
