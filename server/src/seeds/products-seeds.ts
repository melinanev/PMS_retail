import { Product } from '../models/product.js'; 
import  sequelize  from '../config/connection.js';

const seedProducts = async () => {
  // Dummy data, we can add as many as we would like to. 
  const products = [    
    // Accessories
    { sku: 'ACC-001', name: 'Dog Collar', description: 'Adjustable dog collar with buckle.', quantity: 100, price: 15.99, category: 'Accessories' },
    { sku: 'ACC-002', name: 'Pet Leash', description: 'Durable leash for walking pets.', quantity: 80, price: 18.99, category: 'Accessories' },
    { sku: 'ACC-003', name: 'Pet Bed', description: 'Soft and comfortable bed for pets.', quantity: 50, price: 29.99, category: 'Accessories' },
    { sku: 'ACC-004', name: 'Grooming Brush', description: 'Brush for keeping pet fur tidy.', quantity: 70, price: 12.99, category: 'Accessories' },
    { sku: 'ACC-005', name: 'Pet Carrier', description: 'Portable carrier for small pets.', quantity: 40, price: 49.99, category: 'Accessories' },
    { sku: 'ACC-006', name: 'Scratching Post', description: 'Sturdy scratching post for cats.', quantity: 60, price: 34.99, category: 'Accessories' },
    { sku: 'ACC-007', name: 'Automatic Feeder', description: 'Programmable automatic food dispenser.', quantity: 30, price: 79.99, category: 'Accessories' },
    { sku: 'ACC-008', name: 'Water Dispenser', description: 'Automatic water bowl for pets.', quantity: 45, price: 39.99, category: 'Accessories' },
    { sku: 'ACC-009', name: 'Dog Boots', description: 'Protective boots for dogs.', quantity: 35, price: 24.99, category: 'Accessories' },
    { sku: 'ACC-010', name: 'Pet Blanket', description: 'Warm blanket for pets.', quantity: 55, price: 19.99, category: 'Accessories' },
    
    // Equipment
    { sku: 'EQUIP-001', name: 'Fish Tank', description: 'A 20-gallon tank for freshwater fish.', quantity: 25, price: 89.99, category: 'Equipment' },
    { sku: 'EQUIP-002', name: 'Bird Cage', description: 'A spacious cage for small birds.', quantity: 30, price: 49.99, category: 'Equipment' },
    { sku: 'EQUIP-003', name: 'Aquarium Filter', description: 'A high-performance filter for aquariums.', quantity: 40, price: 39.99, category: 'Equipment' },
    { sku: 'EQUIP-004', name: 'Reptile Heat Lamp', description: 'A heating lamp for reptiles.', quantity: 20, price: 29.99, category: 'Equipment' },
    { sku: 'EQUIP-005', name: 'Pet Carrier', description: 'Portable carrier for small pets.', quantity: 30, price: 49.99, category: 'Equipment' },
    { sku: 'EQUIP-006', name: 'Hamster Wheel', description: 'Exercise wheel for hamsters.', quantity: 55, price: 19.99, category: 'Equipment' },
    { sku: 'EQUIP-007', name: 'Automatic Feeder', description: 'Timed automatic pet feeder.', quantity: 35, price: 79.99, category: 'Equipment' },
    { sku: 'EQUIP-008', name: 'Dog House', description: 'Weatherproof outdoor dog house.', quantity: 15, price: 199.99, category: 'Equipment' },
    { sku: 'EQUIP-009', name: 'Pet Playpen', description: 'Indoor playpen for small pets.', quantity: 40, price: 59.99, category: 'Equipment' },
    { sku: 'EQUIP-010', name: 'Bird Perch Stand', description: 'Perch stand for pet birds.', quantity: 45, price: 34.99, category: 'Equipment' },

    // Toys
    { sku: 'TOY-001', name: 'Dog Toy', description: 'A chew toy for dogs, made of durable rubber.', quantity: 100, price: 12.99, category: 'Toys' },
    { sku: 'TOY-002', name: 'Squeaky Bone', description: 'A fun squeaky bone toy for dogs.', quantity: 120, price: 9.99, category: 'Toys' },
    { sku: 'TOY-003', name: 'Cat Wand', description: 'Interactive wand toy for cats.', quantity: 80, price: 7.99, category: 'Toys' },
    { sku: 'TOY-004', name: 'Rope Tug', description: 'Durable rope toy for tug games.', quantity: 90, price: 8.99, category: 'Toys' },
    { sku: 'TOY-005', name: 'Bird Swing', description: 'Swing toy for pet birds.', quantity: 60, price: 10.99, category: 'Toys' },
    { sku: 'TOY-006', name: 'Small Animal Tunnel', description: 'Play tunnel for hamsters and small pets.', quantity: 50, price: 14.99, category: 'Toys' },
    { sku: 'TOY-007', name: 'Chew Ball', description: 'Chew ball toy for active dogs.', quantity: 75, price: 11.99, category: 'Toys' },
    { sku: 'TOY-008', name: 'Laser Pointer', description: 'Laser toy for cat playtime.', quantity: 110, price: 5.99, category: 'Toys' },
    { sku: 'TOY-009', name: 'Plush Mouse', description: 'Soft plush mouse for cat entertainment.', quantity: 95, price: 6.99, category: 'Toys' },
    { sku: 'TOY-010', name: 'Parrot Chew Block', description: 'Chewing block for parrots.', quantity: 40, price: 13.99, category: 'Toys' },
    
    // Food
    { sku: 'FOOD-001', name: 'Cat Food', description: 'High-protein cat food with chicken flavor.', quantity: 200, price: 29.99, category: 'Food' },
    { sku: 'FOOD-002', name: 'Salmon Dog Food', description: 'Premium salmon-flavored dog food.', quantity: 150, price: 35.99, category: 'Food' },
    { sku: 'FOOD-003', name: 'Rabbit Pellets', description: 'Nutritious pellets for rabbits.', quantity: 100, price: 19.99, category: 'Food' },
    { sku: 'FOOD-004', name: 'Bird Seed', description: 'Balanced seed mix for pet birds.', quantity: 120, price: 15.99, category: 'Food' },
    { sku: 'FOOD-005', name: 'Fish Flakes', description: 'Flake food for tropical fish.', quantity: 80, price: 9.99, category: 'Food' },
    { sku: 'FOOD-006', name: 'Hamster Mix', description: 'Healthy food mix for hamsters.', quantity: 90, price: 13.99, category: 'Food' },
    { sku: 'FOOD-007', name: 'Guinea Pig Treats', description: 'Nutritious treats for guinea pigs.', quantity: 70, price: 11.99, category: 'Food' },
    { sku: 'FOOD-008', name: 'Reptile Diet', description: 'Balanced food for reptiles.', quantity: 50, price: 17.99, category: 'Food' },
    { sku: 'FOOD-009', name: 'Dog Biscuits', description: 'Crunchy treats for dogs.', quantity: 130, price: 14.99, category: 'Food' },
    { sku: 'FOOD-010', name: 'Parrot Nuggets', description: 'Tasty nuggets for parrots.', quantity: 60, price: 16.99, category: 'Food' },
    
    // Medication
    { sku: 'MED-001', name: 'Flea Treatment', description: 'Effective flea treatment for dogs and cats.', quantity: 80, price: 24.99, category: 'Medication' },
    { sku: 'MED-002', name: 'Deworming Tablets', description: 'Tablets for treating worm infestations in pets.', quantity: 60, price: 19.99, category: 'Medication' },
    { sku: 'MED-003', name: 'Antibiotic Ointment', description: 'Topical antibiotic for pet wounds.', quantity: 70, price: 14.99, category: 'Medication' },
    { sku: 'MED-004', name: 'Joint Supplements', description: 'Supplements for joint health.', quantity: 90, price: 34.99, category: 'Medication' },
    { sku: 'MED-005', name: 'Ear Drops', description: 'Ear infection treatment for pets.', quantity: 100, price: 22.99, category: 'Medication' },
    { sku: 'MED-006', name: 'Allergy Relief', description: 'Oral medication for pet allergies.', quantity: 85, price: 29.99, category: 'Medication' },
    { sku: 'MED-007', name: 'Eye Drops', description: 'Soothing eye drops for pets.', quantity: 75, price: 17.99, category: 'Medication' },
    { sku: 'MED-008', name: 'Digestive Aid', description: 'Probiotic supplement for pet digestion.', quantity: 65, price: 25.99, category: 'Medication' },
    { sku: 'MED-009', name: 'Pain Reliever', description: 'Pain relief tablets for pets.', quantity: 55, price: 19.99, category: 'Medication' },
    { sku: 'MED-010', name: 'Skin Treatment', description: 'Ointment for skin conditions in pets.', quantity: 50, price: 21.99, category: 'Medication' },
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
