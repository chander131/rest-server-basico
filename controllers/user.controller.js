const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {
    let { limit = 10, pagina = 1, orderby = 'asc' } = req.query;
    const filter = { estado: true };
    // res.send({
    //     status: 200,
    //     message: 'Respuesta exitosa',
    //     data: { id: 1299912, cod: '2109B7SHU9810' }
    // });

    try {
        let limite = isNaN(Number(limit)) ? 10 : Number(limit);
        let page = isNaN(Number(pagina)) ? 1 : Number(pagina);
        let desde = (page - 1) * limite
        orderby = orderby.toLowerCase() === 'desc' ? -1 : +1;

        const [users, total] = await Promise.all([
            User.find(filter).skip(desde).limit(limite).sort({ _id: orderby }),
            User.countDocuments(filter)
        ]);

        res.json({ message: 'Petición realizada con éxito', data: { users, total } });
    } catch (e) {
        console.log('ERROR user.controller => usersGet', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const userGet = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        res.json({ message: 'Respuesta exitosa', data: user })
    } catch (e) {
        console.log('ERROR in user.controller => userGet', e.message);
        res.status(500).json({ message: 'Error del servidor' });
    }
    const { id } = req.params;
    res.status(200).json({
        message: 'Respuesta exitosa GET',
        data: { id, cod: id + '2109B7SHU9810' + Math.random() }
    });
};

const userPost = async (req = request, res = response) => {
    try {

        const { nombre, correo, password, rol } = req.body;
        const user = new User({ nombre, correo, password, rol });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({ message: 'Usuario creado con éxito', data: user });
    } catch (e) {
        console.log("🚀 ~ file: user.controller.js ~ line 44 ~ userPost ~ e", e);
        res.status(500).json({
            message: 'Error del servidor',
            data: null
        });
    }
};

const userPut = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id, password, google, correo, ...rest } = req.body;

        if (password) {
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync(password, salt);
        }

        const userStorage = await User.findOneAndUpdate({ _id: id }, rest, { new: true });

        return res.status(200).json({
            message: 'Usuario actualizado con éxito',
            data: userStorage
        });
    } catch (e) {
        console.log("🚀 ~ file: user.controller.js ~ line 67 ~ userPut ~ e", e);
        res.status(500).json({ message: 'Error del servidor', error: e.message })
    }
};

const userPatch = (req = request, res = response) => {
    res.json({
        message: 'Respuesta exitosa PATCH',
        data: { id: 1299912, cod: '2109B7SHU9810' }
    });
};

const userDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        // esta propiedad se agrego en el middleware de validación del token
        // const uid = req.uid;

        // No se recomienda eliminar data
        // const userDeleted = await User.findByIdAndDelete(id);

        const userInactived = await User.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.json({ message: 'Usuario eliminado correctamente', data: userInactived });
    } catch (e) {
        console.log('ERROR in user.controller => userDelete', e.message);
        res.status(500).json({ message: 'Error del servidor' })
    }
};

module.exports = {
    usersGet,
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
};