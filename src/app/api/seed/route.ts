import { NextResponse } from 'next/server';
import { dbSeed } from '@/lib/seeder/dbSeed';

export async function GET(req: Request) {
  try {
    // Retrieve the Authorization header from the request
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 400 });
    }

    // Extract the Bearer token from the Authorization header
    const token = authHeader.split(' ')[1]; // Bearer <token>

    // Check if the token matches the secret stored in the environment variable
    if (token !== process.env.SEEDER_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Run the seeder if the SEEDER_SECRET matches
    await dbSeed();

    return NextResponse.json({ message: 'Seeding successful' });
  } catch (error) {
    console.error('Error in seeding API handler:', error);
    return NextResponse.json({ message: 'Failed to seed the database' }, { status: 500 });
  }
}
