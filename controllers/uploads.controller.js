const path = require('path');
const fs = require('fs');
const { request, response } = require('express');
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

const { USERS, PRODUCTS } = require('../config/constants');

const { uploadsFiles } = require('../helpers');

const { User, Product } = require('../models');

const uploadFile = async (req = request, res = response) => {
    try {
        // const name = await uploadsFiles(req.files, ['txt', 'md'], 'txts');
        const name = await uploadsFiles(req.files, undefined, 'images');

        res.json({ message: 'Archivo subido correctamente', data: { name } });
    } catch (e) {
        console.log('ERROR in uploads.controller => uploadFile', e);
        res.status(400).json({ message: 'Error del servidor', data: { error: e } });
    }
};

const updateImg = async (req = request, res = response) => {
    const { id, collection } = req.params;
    const files = req.files;
    let model;

    try {
        switch (collection) {
            case USERS:
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({ message: `No existe usuario con el id ${id}` });
                }
                break;

            case PRODUCTS:
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({ message: `No existe un producto con el id ${id}` });
                }
                break;

            default:
                return res.status(500).json({ message: `Se olvido agregar esta colección ${collection}` });
        }

        if (model.img) {
            const pathImgOld = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImgOld)) {
                fs.unlinkSync(pathImgOld);
            }
        }

        const name = await uploadsFiles(files, undefined, collection);
        model.img = name;

        await model.save();

        res.json({ message: 'Imagen actualizada correctamente', data: model });
    } catch (e) {
        console.log('ERROR in uploads.controller => updateAvatarUser', e);
        res.status(400).json({ message: 'Error del servidor', data: { error: e } });
    }
};

const updateImgCloudinary = async (req = request, res = response) => {
    const { id, collection } = req.params;
    const { file } = req.files;
    let model;

    try {
        switch (collection) {
            case USERS:
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({ message: `No existe usuario con el id ${id}` });
                }
                break;

            case PRODUCTS:
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({ message: `No existe un producto con el id ${id}` });
                }
                break;

            default:
                return res.status(500).json({ message: `Se olvido agregar esta colección ${collection}` });
        }

        if (model.img) {
            const arr = model.img.split('/');
            const name = arr[arr.length - 1];
            const [public_id] = name.split('.');

            cloudinary.uploader.destroy(public_id);
        }

        const { tempFilePath } = file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        model.img = secure_url;

        await model.save();

        res.json({ message: 'Imagen actualizada correctamente', data: model });
    } catch (e) {
        console.log('ERROR in uploads.controller => updateAvatarUser', e);
        res.status(400).json({ message: 'Error del servidor', data: { error: e } });
    }
};


const showImage = async (req = request, res = response) => {
    const { id, collection } = req.params;
    let model;

    try {
        switch (collection) {
            case USERS:
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({ message: `No existe usuario con el id ${id}` });
                }
                break;

            case PRODUCTS:
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({ message: `No existe un producto con el id ${id}` });
                }
                break;

            default:
                return res.status(500).json({ message: `Se olvido agregar esta colección ${collection}` });
        }

        if (model.img) {
            const pathImg = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg);
            }
        }
        res.sendFile(path.join(__dirname, '../assets/img/jpg/no-image.jpg'));
    } catch (e) {
        console.log('ERROR in uploads.controller => showImage', e);
        res.status(400).json({ message: 'Error del servidor', data: { error: e } });
    }
};

module.exports = {
    uploadFile,
    updateImg,
    showImage,
    updateImgCloudinary,
};
