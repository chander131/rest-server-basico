const { request, response } = require('express');
const { Types } = require('mongoose');

const ObjectId = Types.ObjectId;

const { Product } = require('../models');

const populateUser = {
    path: 'usuario',
    select: 'nombre'
};

const populateCategory = {
    path: 'categoria',
    select: 'nombre'
};

const getProducts = async (req = request, res = response) => {
    let { limit = 10, pagina = 1, orderby = 'asc' } = req.query;
    const filter = { estado: true };


    try {
        let limite = isNaN(Number(limit)) ? 10 : Number(limit);
        let page = (isNaN(Number(pagina)) || pagina === '0') ? 1 : Number(pagina);
        let desde = (page - 1) * limite;
        orderby = orderby.toLowerCase() === 'desc' ? -1 : +1;

        const [products, total] = await Promise.all([
            Product.find(filter).populate(populateUser).populate(populateCategory).limit(limite).skip(desde).sort({ _id: orderby }),
            Product.countDocuments(filter)
        ]);


        res.json({ message: 'Peticion exitosa', data: { products, total } });
    } catch (e) {
        console.log('ERROR in product.controller => getProducts', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const getProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate(populateUser).populate(populateCategory);

        res.json({ message: 'Peticion exitosa', data: product });
    } catch (e) {
        console.log('ERROR in product.controller => getProduct', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};


const createProduct = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
        const { categoria, precio, descripcion } = req.body;
        const { _id } = req.user;

        const product = new Product({
            nombre,
            usuario: new ObjectId(_id),
            categoria: new ObjectId(categoria),
            estado: true,
            precio,
            descripcion,
            disponible: true,
        });
        await product.save();

        res.status(201).json({ message: 'Producto creado correctamente', data: product });
    } catch (e) {
        console.log('ERROR in product.controller => createProduct', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const updateProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const nombre = req.body.nombre.toUpperCase();
        const { estado, usuario, categoria, ...data } = req.body;

        const product = await Product.findByIdAndUpdate(id,
            {
                nombre,
                usuario: new ObjectId(_id),
                categoria: new ObjectId(categoria),
                ...data,
            },
            { new: true }
        );

        res.json({ message: 'Producto actualizado correctamente', data: product });
    } catch (e) {
        console.log('ERROR in product.controller => updateProduct', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const updatePartialProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const nombre = req.body.nombre.toUpperCase();
        const { categoria, precio, descripcion, disponible } = req.body;

        const product = await Product.findByIdAndUpdate(id,
            {
                nombre,
                usuario: new ObjectId(_id),
                categoria: new ObjectId(categoria),
                precio,
                descripcion,
                disponible,
            },
            { new: true }
        );

        res.json({ message: 'Producto actualizado correctamente', data: product });
    } catch (e) {
        console.log('ERROR in category.controller => updatePartialCategory', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const deleteProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;

        const product = await Product.findByIdAndUpdate(id,
            { usuario: new ObjectId(_id), estado: false },
            { new: true }
        );

        res.json({ message: 'Producto eliminado correctamente', data: product });
    } catch (e) {
        console.log('ERROR in product.controller => deleteProduct', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    updatePartialProduct,
    deleteProduct,
};