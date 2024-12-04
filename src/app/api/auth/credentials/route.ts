// app/api/auth/credentials/route.ts
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  // Retrieve the API_SECRET from headers
  const apiSecret = req.headers.get("Authorization");

  // Validate API_SECRET in headers
  if (!apiSecret || apiSecret !== `Bearer ${process.env.API_SECRET}`) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 403 }
    );
  }

  // Get email from query parameters
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  // Validate email parameter
  if (!email || typeof email !== "string") {
    return new Response(
      JSON.stringify({ error: "Invalid email parameter" }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await dbConnect();
    
    // Find the user by email
    const user = await User.findOne({ email }).select("+password");

    // If user is not found
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // Return the user data (excluding the password if necessary)
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
