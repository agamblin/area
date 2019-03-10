import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const googleDriveFile: any = sequelize.define('GoogleDriveFile', {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	downloadUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	contentUrl: {
		type: Sequelize.STRING,
		allowNull: true
	},
	iconUrl: {
		type: Sequelize.STRING,
		allowNull: true
	},
	thumbnailUrl: {
		type: Sequelize.STRING,
		allowNull: true
	},
	createdDate: {
		type: Sequelize.STRING,
		allowNull: false
	},
	modifiedDate: {
		type: Sequelize.STRING,
		allowNull: false
	},
	fileExtension: {
		type: Sequelize.STRING,
		allowNull: false
	},
	size: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default googleDriveFile;
