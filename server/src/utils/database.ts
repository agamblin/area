import { sqlDb, sqlHost, sqlPassword, sqlPort, sqlUser } from '../keys';
import * as Sequelize from 'sequelize';

export default new Sequelize(sqlDb, sqlUser, sqlPassword, {
	dialect: 'mysql',
	host: sqlHost,
	port: sqlPort
});
