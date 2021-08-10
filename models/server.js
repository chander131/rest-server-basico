const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

// const userController = require('../routes/user.routes');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // this.userRoutes = '/api/users';
        // this.authRoutes = '/api/auth';
        // this.categoriesRoutes = '/api/categories';
        this.paths = {
            authRoutes: '/api/auth',
            categoriesRoutes: '/api/categories',
            productsRoutes: '/api/products',
            searchRoutes: '/api/search',
            userRoutes: '/api/users',
            uploadsRoutes: '/api/uploads',
        }

        // Conexion a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        // this.app.use(fileUpload({
        //     limits: { fileSize: 50 * 1024 * 1024 },
        // }));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }

    routes() {
        // this.app.use('/api/users', userController);
        this.app.use(this.paths.authRoutes, require('../routes/auth.routes'));
        this.app.use(this.paths.categoriesRoutes, require('../routes/category.routes'));
        this.app.use(this.paths.productsRoutes, require('../routes/product.routes'));
        this.app.use(this.paths.searchRoutes, require('../routes/search.routes'));
        this.app.use(this.paths.userRoutes, require('../routes/user.routes'));
        this.app.use(this.paths.uploadsRoutes, require('../routes/uploads.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('###############################################');
            console.log('###############################################');
            console.log('###############################################');
            console.log('###############################################');
            console.log(`########### Server run in port ${this.port} ###########`);
            console.log('###############################################');
            console.log('###############################################');
            console.log('###############################################');
            console.log('###############################################');
        });
    }
}

module.exports = Server;

