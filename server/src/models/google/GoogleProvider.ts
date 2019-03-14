import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import googleDrive from '../../api/googleDrive';
import projectType from 'projectType';
import User from '../User';

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
			id: data.id,
			name: data.name,
			accessToken: this.accessToken
		});
		return driveFolder;
	} catch (e) {
		console.log(e);
		return null;
	}
};

GoogleProvider.prototype.healthCheck = async function() {
	let healthState: boolean = true;
	try {
		await googleDrive.get('/files', {
			headers: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
	} catch (err) {
		healthState = false;
		const user = await User.findByPk(this.userId);
		user.googleService = false;
		await user.save();
		await this.destroy();
	} finally {
		return healthState;
	}
};

export default GoogleProvider;
