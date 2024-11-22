// SignupForm.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { credentialsSignup } from "@/actions/signup";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PasswordInput from "../PasswordInput"; // Import the PasswordInput component

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      toast({
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    // Attempt to sign up
    const response = await credentialsSignup(
      name,
      email,
      password,
      confirmPassword
    );

    if (response?.success) {
      toast({
        description: "Account created successfully!",
        variant: "default",
      });
      router.push("/signin");
    } else {
      toast({
        description: response?.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await handleSubmit(formData);
      }}
    >
      <div className="space-y-4">
        <Input type="text" placeholder="Name" name="name" />
        <Input type="email" placeholder="Email" name="email" />
        <PasswordInput name="password" placeholder="Password" />
        <PasswordInput name="confirm-password" placeholder="Confirm Password" />
        <Button type="submit" className="w-full">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
