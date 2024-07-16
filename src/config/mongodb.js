import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '~/config/enviroment';

let trelloDatabaseInstance = null;
// tạo đối tượng mongoClientInstance connect tới db
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const CONNECT_DB = async () => {
  // kết nối tới mongodb atlas
  await mongoClientInstance.connect();
  // kết nối thành công => gán vào trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Database not connect');
  return trelloDatabaseInstance;
};

export const DISCONNECT_DB = async () => {
  await mongoClientInstance.close();
};
