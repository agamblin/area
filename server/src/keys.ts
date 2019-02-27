export const sqlHost = process.env.SQL_HOST;
export const sqlUser = process.env.SQL_USER;
export const sqlPassword = process.env.SQL_PASSWORD;
export const sqlDb = process.env.SQL_DB;
export const sqlPort: number = parseInt(process.env.SQL_PORT);
export const jwtSecret = process.env.JWT_SECRET;

let s3id: string;
let s3secret: string;

if (process.env.S3_AWS_KEY_ID) {
	s3id = process.env.S3_AWS_KEY_ID;
	s3secret = process.env.S3_AWS_KEY_SECRET;
} else {
	const keys = require('./keysAws');
	s3id = keys.S3_ID;
	s3secret = keys.S3_SECRET;
}

export const s3accessKeyId = s3id;
export const s3secretKey = s3secret;

export const githubId = process.env.GITHUB_ID;
export const githubSecret = process.env.GITHUB_SECRET;
export const githubRedirectUri = process.env.GITHUB_REDIRECT_URI;

export const trelloKey = process.env.TRELLO_KEY;
export const trelloSecret = process.env.TRELLO_SECRET;
