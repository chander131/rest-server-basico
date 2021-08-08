const API_VERSION = 'v1';

const ADMIN_ROLE = 'ADMIN_ROLE';
const VENTAS_ROLE = 'VENTAS_ROLE';
const USER_ROLE = 'USER_ROLE';

const CATEGORIES = 'categories';
const PRODUCTS = 'products';
const USERS = 'users';

const ALLOWEDCOLLECTIONS = [
    CATEGORIES,
    PRODUCTS,
    USERS,
];

const ALLOWEDROLES = [
    ADMIN_ROLE,
    VENTAS_ROLE,
];

module.exports = {
    API_VERSION,
    ADMIN_ROLE,
    VENTAS_ROLE,
    USER_ROLE,
    ALLOWEDROLES,
    CATEGORIES,
    PRODUCTS,
    USERS,
    ALLOWEDCOLLECTIONS,
};