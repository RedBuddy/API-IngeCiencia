import mysql from 'mysql2/promise';
import config from '../config';

const dbsettings = {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
};

export async function getcon() {
    try {
        const connection = await mysql.createConnection(dbsettings);
        return connection;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

export { mysql };


