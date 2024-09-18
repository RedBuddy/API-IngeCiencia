import sql from 'mssql'
import config from '../config'

const dbsettings = {
    user: config.DB_USER,
    password: config.DB_PASS,
    server: config.DB_SERVER,
    database: config.DB_NAME,
    options: {
        trustServerCertificate: true,
    },
}

export async function getcon() {
    try {
        const pool = await sql.connect(dbsettings)
        return pool
    } catch (error) {
        console.error(error)
    }
}

export { sql }
