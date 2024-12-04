// src/lib/seeders/userSeeder.ts
import User from "../../models/user";

const seedUsers = async () => {
  const users = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "hashedpassword1", // Replace with hashed passwords in production
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "hashedpassword2",
    },
    {
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: "hashedpassword3",
    },
  ];

  try {
    await User.insertMany(users, { ordered: true });
    console.log("Seeded users successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

export default seedUsers;
