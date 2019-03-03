import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import googleDrive from '../../api/googleDrive';

const GoogleProvider: any = sequelize.define('GoogleProvider', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

GoogleProvider.prototype.fetchFiles = async function() {
	try {
		const { data } = await googleDrive.get('/files', {
			headers: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
		return data.items;
	} catch (err) {
		return {
			error: "Can't fetch files"
		};
	}
};

export default GoogleProvider;
