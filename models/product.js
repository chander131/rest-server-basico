const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado del producto es obligatorio'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario del producto es obligatorio']
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoría del producto es obligatorio'],
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
});


ProductSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return { ...data };
};

module.exports = model('Product', ProductSchema, 'Products');
