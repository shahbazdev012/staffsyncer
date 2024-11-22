import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth(); // Fetch session on the server
  const user = session?.user;

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">MyApp</div>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link href="/" className="text-white hover:text-blue-300 transition">
            Home
          </Link>
          <Link
            href="/profile"
            className="text-white hover:text-blue-300 transition"
          >
            Profile
          </Link>
          <Link
            href="/premium"
            className="text-white hover:text-blue-300 transition"
          >
            Premium
          </Link>

          {user ? (
            <>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                  redirect("/"); // Redirect to homepage
                }}
              >
                <Button type="submit" variant="outline">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-white hover:text-blue-300 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-white hover:text-blue-300 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
