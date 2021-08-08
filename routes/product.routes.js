const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validateJWT,
    validateRole,
    hasRole,
} = require('../middlewares');

const { existProduct, existCategoryById, existProductById } = require('../helpers/db-validators');
const { ADMIN_ROLE } = require('../config/constants');

const router = Router();

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    updatePartialProduct,
    deleteProduct,
} = require('../controllers/product.controller');

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductById),
    validarCampos,
], getProduct);

router.post('/', [
    validateJWT,
    validateRole,
    check('nombre', 'El nombre del producto es obligatorio').notEmpty(),
    check('nombre').custom(existProduct),
    check('categoria', 'La categoría no es un ID válido').isMongoId(),
    check('categoria').custom(existCategoryById),
    validarCampos,
], createProduct);

router.put('/:id', [
    validateJWT,
    validateRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductById),
    // check('nombre', 'El nombre del producto es obligatorio').notEmpty(),
    // check('nombre').custom(existProduct),
    // check('categoria', 'La categoría no es un ID válido').isMongoId(),
    // check('categoria').custom(existCategoryById),
    validarCampos,
], updateProduct);

router.patch('/:id', [
    validateJWT,
    validateRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductById),
    // check('nombre', 'El nombre del producto es obligatorio').notEmpty(),
    // check('nombre').custom(existProduct),
    // check('categoria', 'La categoría no es un ID válido').isMongoId(),
    // check('categoria').custom(existCategoryById),
    validarCampos,
], updatePartialProduct);

router.delete('/:id', [
    validateJWT,
    hasRole(ADMIN_ROLE),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductById),
    validarCampos
], deleteProduct);

module.exports = router;
