
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
});

RoleSchema.methods.toJSON = function () {
    const { __v, ...role } = this.toObject();
    return { ...role };
};

module.exports = model('Role', RoleSchema, 'Roles');
