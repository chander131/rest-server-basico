const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
    const { search, filter, collection } = req.query;
    // res.send({
    //     status: 200,
    //     message: 'Respuesta exitosa',
    //     data: { id: 1299912, cod: '2109B7SHU9810' }
    // });
    res.status(200).json({
        message: 'Respuesta exitosa GET',
        data: { id: 1299912, cod: '2109B7SHU9810' }
    });
    // res.status(403).json({
    //     message: 'Sin autorizacion',
    //     data: null
    // });
};

const userGet = (req = request, res = response) => {
    const { id } = req.params;
    res.status(200).json({
        message: 'Respuesta exitosa GET',
        data: { id, cod: id + '2109B7SHU9810' + Math.random() }
    });
};

const userPost = (req = request, res = response) => {
    const { name, lastname, age } = req.body;
    res.status(201).json({
        message: 'Respuesta exitosa POST',
        data: {
            id: Math.random().toString().slice(2),
            name: name.toUpperCase(),
            lastname: lastname.toUpperCase(),
            age,
        }
    });
};

const userPut = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        message: 'Respuesta exitosa PUT',
        data: { id, cod: '2109B7SHU9810' }
    });
};

const userPatch = (req = request, res = response) => {
    res.json({
        message: 'Respuesta exitosa PATCH',
        data: { id: 1299912, cod: '2109B7SHU9810' }
    });
};

const userDelete = (req = request, res = response) => {
    res.json({
        message: 'Respuesta exitosa DELETE',
        data: { id: 1299912, cod: '2109B7SHU9810' }
    });
};

module.exports = {
    usersGet,
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
};