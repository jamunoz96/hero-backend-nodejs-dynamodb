export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const corsUrl = process.env.CORS_URL;
export const logDirectory = process.env.LOG_DIR;

export const db = {
  host: process.env.DB_HOST || '',
};
