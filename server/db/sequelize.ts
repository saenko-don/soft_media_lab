import {Sequelize} from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

const {USER_DB, PASSWORD_DB, ADDRESS_DB, PORT_DB, DB_NAME} = process.env;

export default new Sequelize(`postgres://${USER_DB}:${PASSWORD_DB}@${ADDRESS_DB}:${PORT_DB}/${DB_NAME}`);