"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import HandleCreateOrganization from "@/actions/organization/HandleCreateOrganization";

const CreateOrganization = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (formData: FormData) => {
    if (!token) {
      toast({
        description: "Invalid URL: Token is missing.",
        variant: "destructive",
      });
      return;
    }

    const organization = formData.get("organization") as string;
    if (!organization) {
      toast({
        description: "Organization name is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await HandleCreateOrganization(token, organization);
      router.push("/overview");
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
        <Input
          type="text"
          placeholder="Enter Name of Organization"
          name="organization"
        />
        <Button type="submit" className="w-full">
          Create Organization
        </Button>
      </div>
    </form>
  );
};

export default CreateOrganization;
