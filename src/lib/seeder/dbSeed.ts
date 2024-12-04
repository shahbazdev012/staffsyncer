import mongoose from "mongoose";
import seedUsers from "./user";
import dbConnect from '@/lib/dbConnect';
import seedRoles from "./role";

export const dbSeed = async () => {
  try {
    await dbConnect();
    await seedRoles();
    await seedUsers();
    console.log('Seeding successful');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw new Error('Seeding failed');
  } finally {
    mongoose.disconnect();
  }
};
