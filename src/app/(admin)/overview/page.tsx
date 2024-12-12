import React from "react";

export async function generateMetadata() {
  return {
    title: "Dynamic Page Title",
    description: "This description is generated dynamically.",
  };
}

const page = () => {
  return <div>page</div>;
};

export default page;
