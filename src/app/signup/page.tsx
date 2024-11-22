import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignupForm from "@/components/client/form/signup";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { BiLogoGithub } from "react-icons/bi";

const Signup = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button type="submit" className="w-full" variant="outline">
              <BiLogoGithub />
              Signup with Github
            </Button>
          </form>

          <div className="text-center text-sm">Or</div>

          <SignupForm/>
        </CardContent>

        <CardFooter className="flex justify-center">
        <Link href="/signin">Already have an account? Sign in</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
