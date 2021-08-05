const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/factory-jwt');

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

module.exports = {
    login,
};