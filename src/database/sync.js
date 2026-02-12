import sequelize from "./connection.js";
import { Sequelize } from "sequelize";
import config from "../config.js";

/**
 * Crea la base de datos si no existe
 */
async function createDatabaseIfNotExists() {
  try {
    // Crear una conexión sin especificar la base de datos
    const sequelizeWithoutDB = new Sequelize({
      host: config.DB_HOST,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      port: config.DB_PORT,
      dialect: "mysql",
      logging: false,
    });

    // Crear la base de datos
    await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_DATABASE}\`;`);
    console.log(`✓ Base de datos '${config.DB_DATABASE}' lista`);

    // Cerrar la conexión temporal
    await sequelizeWithoutDB.close();
  } catch (error) {
    console.error("✗ Error creando la base de datos:", error.message);
    throw error;
  }
}

/**
 * Sincroniza la base de datos con los modelos de Sequelize
 * Crea las tablas si no existen
 * @param {boolean} force - Si true, elimina y recrea todas las tablas
 * @returns {Promise}
 */
export async function syncDatabase(force = false) {
  try {
    // Primero crear la base de datos si no existe
    await createDatabaseIfNotExists();

    // Sincronizar la base de datos
    await sequelize.sync({ force });
    console.log("✓ Base de datos sincronizada correctamente");
    console.log("↳ Para cargar datos iniciales, ejecuta: pnpm seed");
  } catch (error) {
    console.error("✗ Error sincronizando la base de datos:", error.message);
    throw error;
  }
}

export default {
  syncDatabase,
};
