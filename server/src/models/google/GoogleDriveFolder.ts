import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const GoogleDriveFolder: any = sequelize.define('GoogleDriveFolder', {
	googleId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	}
});

export default GoogleDriveFolder;
