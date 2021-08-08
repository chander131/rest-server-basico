const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validateJWT,
    validateRole,
    hasRole,
} = require('../middlewares');

const { existCategory, existCategoryById } = require('../helpers/db-validators');
const { ADMIN_ROLE, VENTAS_ROLE } = require('../config/constants');

const router = Router();

const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    updatePartialCategory,
    deleteCategory,
} = require('../controllers/category.controller');

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategoryById),
    validarCampos,
], getCategory);

router.post('/', [
    validateJWT,
    validateRole,
    check('nombre', 'El nombre de la categoría es obligatoria').notEmpty(),
    check('nombre').custom(existCategory),
    validarCampos,
], addCategory);

router.put('/:id', [
    validateJWT,
    validateRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre de la categoría es obligatoria').notEmpty(),
    check('id').custom(existCategoryById),
    check('nombre').custom(existCategory),
    validarCampos,
], updateCategory);

router.patch('/:id', [
    validateJWT,
    validateRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre de la categoría es obligatoria').notEmpty(),
    check('id').custom(existCategoryById),
    check('nombre').custom(existCategory),
    validarCampos,
], updatePartialCategory);

router.delete('/:id', [
    validateJWT,
    hasRole(ADMIN_ROLE),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategoryById),
    validarCampos,
], deleteCategory);

module.exports = router;
