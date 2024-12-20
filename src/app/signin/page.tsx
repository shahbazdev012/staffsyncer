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
import SigninFrom from "@/components/client/form/signin";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { BiLogoGithub } from "react-icons/bi";

const signin = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Signin</CardTitle>
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
              Continue with Github
            </Button>
          </form>

          <div className="text-center text-sm">Or</div>

          <SigninFrom />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/signup">Do not have an account? Sign up</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default signin;
