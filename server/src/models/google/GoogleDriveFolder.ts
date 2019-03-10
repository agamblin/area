import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import googleDrive from '../../api/googleDrive';
import googleDriveFile from './GoogleDriveFile';

const GoogleDriveFolder: any = sequelize.define('GoogleDriveFolder', {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
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

GoogleDriveFolder.prototype.fetchFiles = async function() {
	try {
		const { data } = await googleDrive.get(
			`files?q='${this.id}'+in+parents&fields=files(*)`,
			{
				headers: {
					Authorization: `Bearer ${this.accessToken}`
				}
			}
		);
		const files = data.files.map((file: any) => {
			return {
				id: file.id,
				name: file.name.split('.')[0],
				downloadUrl: file.webContentLink,
				contentUrl: file.webViewLink,
				iconUrl: file.iconLink,
				thumbnailUrl: file.thumbnailLink,
				createdDate: file.createdTime.split('T')[0],
				modifiedDate: file.modifiedTime.split('T')[0],
				fileExtension: file.fullFileExtension,
				size: +file.size / 1000,
				accessToken: this.accessToken,
				GoogleDriveFolderId: this.id
			};
		});
		googleDriveFile.bulkCreate(files, {
			updateOnDuplicate: [
				'name',
				'downloadUrl',
				'contentUrl',
				'iconUrl',
				'thumbnailUrl',
				'modifiedDate',
				'size'
			]
		});
	} catch (err) {
		console.log(err);
	}
};

export default GoogleDriveFolder;
