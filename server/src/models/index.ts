import sequelize from '../config/connection.js';
import { ProductFactory } from './product.js';
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);
const Product = ProductFactory(sequelize);

export { User, Product };
