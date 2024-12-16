import dbConnect from '@/lib/dbConnect'
import OrgRole from '@/models/organizationRole'

// Function to create the predefined roles for an organization
const createOrganizationRoles = async (orgId: string) => {
  try {
    // Connect to the database
    await dbConnect();

    // Define the roles to be created
    const roles = [
      { name: 'Admin', organization_id: orgId, description: 'Has full access to all resources and settings.' },
      { name: 'Project Manager', organization_id: orgId, description: 'Oversees projects and team coordination.' },
      { name: 'Team Lead', organization_id: orgId, description: 'Leads a specific team within the organization.' },
      { name: 'Member', organization_id: orgId, description: 'General role with limited permissions.' }
    ];

    // Insert the roles into the database
    await OrgRole.insertMany(roles);

    console.log('Roles successfully created for the organization');
    return ;
  } catch (error) {
    console.error('Error creating organization roles:', error);
    throw new Error('Failed to create organization roles');
  }
}

export default createOrganizationRoles;
