export const sqlHost = process.env.RDS_HOSTNAME;
export const sqlUser = process.env.RDS_USERNAME;
export const sqlPassword = process.env.SQL_PASSWORD;
export const sqlDb = process.env.RDS_DB_NAME;
export const sqlPort: number = parseInt(process.env.RDS_PORT);
