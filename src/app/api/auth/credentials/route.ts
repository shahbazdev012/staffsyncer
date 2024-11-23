// app/api/auth/credentials/route.ts
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  console.log("hello sir g");

  const url = new URL(req.url);
  const email = url.searchParams.get("email");


  if (!email || typeof email !== "string") {
    return new Response(
      JSON.stringify({ error: "Invalid email parameter" }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
