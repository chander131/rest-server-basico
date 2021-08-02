const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

// const userController = require('../routes/user.routes');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userRoutes = '/api/users';

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
    }

    routes() {
        // this.app.use('/api/users', userController);
        this.app.use(this.userRoutes, require('../routes/user.routes'));
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

