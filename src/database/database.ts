import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectDB = async () => {
  const { database } = config;
  const dbUrl = `${database.dbHost}://${database.dbUser}:${database.dbPass}@${database.dbConnection}.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(dbUrl, { dbName: config.database.dbName });
    console.log('conectando');
  } catch (error) {
    console.error(error);
    throw new Error('db error');
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', () => {
    console.log('connected');
  });
  dbConnection.on('connect', (e) => {
    console.log('connect');
  });
  dbConnection.on('error', (e) => {
    console.error(e);
  });
  return;
};
