import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import Pathname from "@/components/client/Pathname";
const Navbar = async () => {
  const session = await auth(); // Fetch session on the server
  const user = session?.user;

  return (
    <nav className="bg-gray-100 p-4">
      <div className="flex  items-center justify-between">
        <div className="flex items-center gap-2 ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>
                  <Pathname />
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex  space-x-6 items-center">
          <Link href="/" className=" hover:text-gray-400 transition">
            Home
          </Link>
          <Link href="/profile" className=" hover:text-gray-400 transition">
            Profile
          </Link>
          <Link href="/premium" className=" hover:text-gray-400 transition">
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
              <Link href="/signin" className=" hover:text-gray-400 transition">
                Sign In
              </Link>
              <Link href="/signup" className=" hover:text-gray-400 transition">
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
