const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id: uid, ...user } = this.toObject();
    return { ...user, uid };
};

module.exports = model('User', UserSchema, 'User');
