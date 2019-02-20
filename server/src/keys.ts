export const sqlHost = process.env.RDS_HOSTNAME;
export const sqlUser = process.env.RDS_USERNAME;
export const sqlPassword = process.env.RDS_PASSWORD;
export const sqlDb = process.env.RDS_DB_NAME;
export const sqlPort: number = parseInt(process.env.RDS_PORT);

export const s3accessKeyId = process.env.S3_ACCESS_KEY_ID;
export const s3secretKey = process.env.S3_SECRET_KEY;
