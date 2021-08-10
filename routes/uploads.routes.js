const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validarCampos, validateJWT, validateRole } = require('../middlewares');
const { uploadFile, updateImg, showImage, updateImgCloudinary } = require('../controllers/uploads.controller');
const { USERS, PRODUCTS } = require('../config/constants');
const { validCollections } = require('../helpers');
const { hasFiles } = require('../middlewares/validate-file.middleware');

router.post('/', [
    hasFiles,
    validateJWT,
    validateRole,
    validarCampos,
], uploadFile);

router.put('/:collection/:id', [
    hasFiles,
    validateJWT,
    validateRole,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('collection').custom(c => validCollections(c, [USERS, PRODUCTS])),
    validarCampos,
], updateImgCloudinary);
// ], updateImg);

router.get('/:collection/:id', [
    validateJWT,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('collection').custom(c => validCollections(c, [USERS, PRODUCTS])),
    validarCampos,
], showImage);

module.exports = router;
