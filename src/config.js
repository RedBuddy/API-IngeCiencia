import { config } from 'dotenv'
config();

export default {
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_SERVER: process.env.DB_SERVER,
    DB_NAME: process.env.DB_NAME
}