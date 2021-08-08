const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("sign-x-token");

    if (!token) {
        return res.status(401).json({ message: 'No hay token en la petición' })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETSIGNATUREOFTOKEN);

        const userAuth = await User.findById(uid);

        if (!userAuth || !userAuth.estado) {
            return res.status(401).json({ message: 'Sin autorización' });
        }

        req.uid = uid;
        req.user = userAuth;

        next();
    } catch (e) {
        console.log('ERROR in validate-jwt-middleware => validateJWT', e);
        return res.status(401).json({ message: 'Token no valido' });
    }
};


module.exports = {
    validateJWT,
};
