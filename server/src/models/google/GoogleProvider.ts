import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import googleDrive from '../../api/googleDrive';
import projectType from 'projectType';

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

GoogleProvider.prototype.createFolder = async function(project: projectType) {
	const { name } = project;
	try {
		const { data } = await googleDrive.post(
			'/files',
			{
				name,
				mimeType: 'application/vnd.google-apps.folder'
			},
			{ headers: { Authorization: `Bearer ${this.accessToken}` } }
		);
		const driveFolder = await project.createGoogleDriveFolder({
			googleId: data.id,
			name: data.name
		});
		return driveFolder;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export default GoogleProvider;
