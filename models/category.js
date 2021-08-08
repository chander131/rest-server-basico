const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado de la categoría es obligatorio'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario de la categoría es obligatorio']
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, estado, ...category } = this.toObject();
    return { ...category };
};

module.exports = model('Category', CategorySchema, 'Categories');
