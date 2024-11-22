"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { credentialsSigin } from "@/actions/signin";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PasswordInput from "../PasswordInput"; // Import the PasswordInput component

const SigninForm = () => {
  const { toast } = useToast(); // Initialize the toast from your custom hook
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      // If fields are empty, show toast with error message
      toast({
        description: "All fields are required",
        variant: "destructive",
      });
      return; // Exit early if validation fails
    }
    const error = await credentialsSigin(email, password);
    if (!error) {
      toast({
        description: "Success credentials",
        variant: "default",
      });
      router.refresh(); // This will now work correctly
    } else {
      toast({
        description: String(error) || "An Error Occurred",
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
        <Input type="email" placeholder="Email" name="email" />
        
        {/* Reuse the PasswordInput component for the password field */}
        <PasswordInput name="password" placeholder="Password" />

        <Button type="submit" className="w-full">
          Signin
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
