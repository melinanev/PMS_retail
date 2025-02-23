import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'jacob_wilson_01', firstName: 'Jacob', lastName: 'Wilson', email: 'jacob@email.com', password: 'password', role: 'Cashier' },
      { username: 'josh_bourassa_mgr', firstName: 'Josh', lastName: 'Bourassa', email: 'josh@email.com', password: 'password', role: 'Manager' },
      { username: 'melina_smith_ceo', firstName: 'Melina', lastName: '', email: 'melina@email.com', password: 'password', role: 'CEO' },
      { username: 'dr_sarah_johnson', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com', password: 'password', role: 'Veterinarian' },
      { username: 'alex_tech_01', firstName: 'Alex', lastName: 'Leel', email: 'alex@email.com', password: 'password', role: 'Veterinary Technician' },
      { username: 'lisa_reception_01', firstName: 'Lisa', lastName: 'Walker', email: 'lisa@email.com', password: 'password', role: 'Receptionist' },
      { username: 'david_inv_mgr', firstName: 'David', lastName: 'Adams', email: 'david@email.com', password: 'password', role: 'Inventory Manager' },
      { username: 'emily_tech_02', firstName: 'Emily', lastName: 'Davidson', email: 'emily@email.com', password: 'password', role: 'Veterinary Technician' },
      { username: 'john_miller_recep', firstName: 'John', lastName: 'Miller', email: 'john@email.com', password: 'password', role: 'Receptionist' },
      { username: 'mary_garcia_mgr', firstName: 'Mary', lastName: 'Garcia', email: 'mary@email.com', password: 'password', role: 'Manager' },
      { username: 'robert_taylor_dvm', firstName: 'Robert', lastName: 'Taylor', email: 'robert@email.com', password: 'password', role: 'Veterinarian' },
      { username: 'olivia_martinez_tech', firstName: 'Olivia', lastName: 'Martin', email: 'olivia@email.com', password: 'password', role: 'Veterinary Technician' },
      { username: 'charlotte_lee_recep', firstName: 'Charlotte', lastName: 'Lee', email: 'charlotte@email.com', password: 'password', role: 'Receptionist' },
      { username: 'ethan_clark_mgr', firstName: 'Ethan', lastName: 'Clark', email: 'ethan@email.com', password: 'password', role: 'Manager' },
      { username: 'dr_zoe_smith', firstName: 'Zoe', lastName: 'Smithers', email: 'zoe@email.com', password: 'password', role: 'Veterinarian' },
      { username: 'chris_jones_inv_mgr', firstName: 'Chris', lastName: 'Jones', email: 'chris@email.com', password: 'password', role: 'Inventory Manager' },
      { username: 'lucy_williams_tech', firstName: 'Lucy', lastName: 'Williams', email: 'lucy@email.com', password: 'password', role: 'Veterinary Technician' },
      { username: 'tom_brown_recep', firstName: 'Tom', lastName: 'Brown', email: 'tom@email.com', password: 'password', role: 'Receptionist' },
      { username: 'grace_davis_mgr', firstName: 'Grace', lastName: 'Davis', email: 'grace@email.com', password: 'password', role: 'Manager' },
      { username: 'ava_martinez_dvm', firstName: 'Ava', lastName: 'Martinez', email: 'ava@email.com', password: 'password', role: 'Veterinarian' },
      { username: 'jackson_smith_tech', firstName: 'Jackson', lastName: 'Smith', email: 'jackson@email.com', password: 'password', role: 'Veterinary Technician' },
      { username: 'oliver_schmidt_inv', firstName: 'Oliver', lastName: 'Schmidt', email: 'oliver@email.com', password: 'password', role: 'Inventory Manager' },
    ],
    { individualHooks: true }
  );
};
