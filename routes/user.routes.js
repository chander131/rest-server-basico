const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validateJWT,
    validateRole,
    hasRole,
} = require('../middlewares');

const { esRolValido, validarEmail, existUserById } = require('../helpers/db-validators');
const { ADMIN_ROLE, VENTAS_ROLE } = require('../config/constants');

const {
    usersGet,
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', usersGet);
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos,
], userGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('correo', 'El correo no es valido').notEmpty().isEmail(),
    check('correo').custom(validarEmail),
    check('password', 'La contraseña debe de tener mínimo 6 caracteres y máximo 15').isLength({ min: 6, max: 15 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos,
], userPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(esRolValido),
    validarCampos,
], userPut);
router.patch('/', userPatch);
router.delete('/:id', [
    validateJWT,
    // validateRole,
    hasRole(ADMIN_ROLE, VENTAS_ROLE),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos,
], userDelete);

module.exports = router;
