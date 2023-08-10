import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { config } from 'dotenv';

config();
const typeOrmConfig: TypeOrmModuleOptions & MongoConnectionOptions = {
  type: 'mongodb',
  url: process.env.MONGODB_URL,
  database: 'TrainingVTF',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export default typeOrmConfig;