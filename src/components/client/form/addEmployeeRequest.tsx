"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { Getorgroles } from "@/actions/employeeManagement/getorgroles";
import { sendEmployeeCreationEmail } from "@/actions/employeeManagement/sendEmployeeCreationEmail";

const AddEmployeeRequest = () => {
  const { data: session } = useSession();
  const userId = session?.user._id;

  const { toast } = useToast();

  const [orgRoles, setOrgRoles] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgRoles = async () => {
      if (!userId) return;

      try {
        const roles = await Getorgroles(userId);
        setOrgRoles(roles);
      } catch (error) {
        toast({
          description: `${error}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrgRoles();
  }, [userId, toast]);

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;

    if (!email || !selectedRole) {
      toast({
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    try {
      if (isLoading) {
        toast({
          description: "sending Email...",
          variant: "default",
        });
      }
      await sendEmployeeCreationEmail(email, selectedRole);
      toast({
        description: "Success Email Sent",
        variant: "default",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        description: `${error} || An unknow error occured`,
        variant: "destructive",
      });
      return;
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

        {loading ? (
          <div>Loading roles...</div>
        ) : (
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Employee Role" />
            </SelectTrigger>
            <SelectContent>
              {orgRoles.map((role) => (
                <SelectItem key={role._id} value={role._id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button type="submit" className="w-full">
          Send Invite
        </Button>
      </div>
    </form>
  );
};
export default AddEmployeeRequest;
