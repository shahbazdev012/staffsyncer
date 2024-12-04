// src/lib/seeders/roleSeeder.ts
import GlobalRole from "../../models/globalRole";

const seedRoles = async () => {
  const roles = [
    { name: "owner" },
    { name: "org_admin" },
    { name: "user" },
  ];

  try {
    // Check for existing roles by name
    const existingRoles = await GlobalRole.find({ name: { $in: roles.map(role => role.name) } });

    // Extract existing role names
    const existingRoleNames = existingRoles.map(role => role.name);

    // Filter out the roles that already exist in the database
    const newRoles = roles.filter(role => !existingRoleNames.includes(role.name));

    // Insert the new roles into the database
    if (newRoles.length > 0) {
      await GlobalRole.insertMany(newRoles);
      newRoles.forEach(role => console.log(`Role ${role.name} seeded successfully.`));
    } else {
      console.log("All roles already exist, skipping seeding.");
    }

  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

export default seedRoles;
