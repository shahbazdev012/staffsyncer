"use client"
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const user=session?.user;
  const id = session?.user?._id;

  return (
    <div>
      <h1>Profile Page</h1>
      {role ? (
        <p>Your role is: {role}</p>
      ) : (
        <p>No role found. Please sign in again.</p>
      )}
      <div>
        {user?.email}
      </div>
      <div>
        {`${id} id is `}
      </div>
    </div>
  );
};

export default ProfilePage;
