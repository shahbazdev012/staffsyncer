"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PasswordInput from "../PasswordInput"; // Import the PasswordInput component
import handleCreateEmployee from "@/actions/employeeManagement/handleCreateEmployee";
import { Input } from "@/components/ui/input";

const AddEmployee = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  

  const handleSubmit = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const name = formData.get("name") as string;
    if (!token) {
      toast({
        description: "Invalid URL: Token is missing.",
        variant: "destructive",
      });
      return;
    }
    if (!password || !confirmPassword || !name) {
      toast({
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    try {
     // await HandleCreateOrganization(token);
     await handleCreateEmployee({token ,name, password ,confirmPassword })
      router.push("/signin");
    } catch (error) {
      toast({
        description: `${error}` || "Failed to create organization.",
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
      <PasswordInput name="password" placeholder="Password" />
      <PasswordInput name="confirm-password" placeholder="Confirm Password" />
        <Button type="submit" className="w-full">
          Join Organization
        </Button>
      </div>
    </form>
  );
};

export default AddEmployee;
