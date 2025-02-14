import { Product } from '../models/product'; 
import  sequelize  from '../config/connection';

const seedProducts = async () => {
  // Dummy data, we can add as many as we would like to. 
  const products = [
    {
      name: 'Dog Toy',
      description: 'A chew toy for dogs, made of durable rubber.',
      quantity: 100,
      price: 12.99,
    },
    {
      name: 'Cat Food',
      description: 'High-protein cat food with chicken flavor.',
      quantity: 200,
      price: 29.99,
    },
    {
      name: 'Dog Leash',
      description: 'Strong leash for walking your dog comfortably.',
      quantity: 50,
      price: 19.99,
    },
    {
      name: 'Bird Cage',
      description: 'A spacious cage for small birds.',
      quantity: 30,
      price: 49.99,
    },
    {
      name: 'Fish Tank',
      description: 'A 20-gallon tank for freshwater fish.',
      quantity: 25,
      price: 89.99,
    },
  ];

  try {
    // This loops over our database and awaits for newly created products
    for (const product of products) {
      await Product.create(product);
    }

  } catch (error) {
    console.error('Error seeding product data:', error);
  }
};

// This runs the seeding function and drops and recreates the table with new products etc.
const seed = async () => {
  await sequelize.sync({ force: true }); 
  await seedProducts(); 
};

seed().then(() => {
  process.exit();
});
