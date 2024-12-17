import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddEmployeeRequest from "@/components/client/form/addEmployeeRequest";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Add Employee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AddEmployeeRequest />
        </CardContent>
        <CardFooter className="flex justify-center text-gray-500 text-sm">
          Must Provide admin email
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
