import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password', role: 'manager' },
      { username: 'SunnyScribe', email: 'sunny@scribe.com', password: 'password', role: 'employee' },
      { username: 'RadiantComet', email: 'radiant@comet.com', password: 'password', role: 'employee' },
      { username: 'jacob', email: 'example@email.com', password: 'password', role: 'employee' },
      { username: 'josh', email: 'example@email.com', password: 'password', role: 'manager' },
      { username: 'melina', email: 'example@email.com', password: 'password', role: 'manager' }
    ],
    { individualHooks: true }
  );
};

