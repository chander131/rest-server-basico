const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/factory-jwt');
const { googleVerify } = require('../helpers/google.verify');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        const user = await User.findOne({ correo });

        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        if (!user?.estado) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = await generateJWT(user._id);

        res.json({ message: 'Login correcto', user, token });
    } catch (e) {
        console.log('ERROR in auth.controller => login', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const googleSignin = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        let user = await User.findOne({ correo });

        if (!user) {
            const dataStorage = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
            };

            user = new User(dataStorage);
            await user.save();
        }

        if (!user.estado) {
            return res.status(401).json({
                message: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generateJWT(user.id);

        res.json({ message: 'Login correcto', data: { user, token } });
    } catch (e) {
        console.log('ERROR in auth.controller => googleSignin', e);
        res.status(400).json({ message: 'Token de Google no es valido' });
    }
};

module.exports = {
    login,
    googleSignin,
};