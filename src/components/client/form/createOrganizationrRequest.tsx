"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { sendOrgCreationEmail } from "@/actions/organization/sendOrgCreationEmail";

const CreateOrganizationRequest = () => {
  const { toast } = useToast(); // Initialize the toast from your custom hook
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    if (!email) {
      // If fields are empty, show toast with error message
      toast({
        description: "All fields are required",
        variant: "destructive",
      });
      return; // Exit early if validation fails
    }
    const error = await sendOrgCreationEmail(email);
    console.log(error?.err);
    if (!error) {
      toast({
        description: "Success Email Sent",
        variant: "default",
      });
      router.refresh(); // This will now work correctly
    } else {
      toast({
        description: String(error.err) || "An Error Occurred",
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
        <Input type="email" placeholder="Email Admin Only" name="email" />
        <Button type="submit" className="w-full">
          Send Invite
        </Button>
      </div>
    </form>
  );
};
export default CreateOrganizationRequest;