import config from '../config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: 'mysql',
    port: config.DB_PORT,
    logging: false
});

export default sequelize;
