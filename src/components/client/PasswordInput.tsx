// components/PasswordInput.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { LuEye, LuEyeOff } from "react-icons/lu";

type PasswordInputProps = {
  name: string;
  placeholder: string;
};

const PasswordInput = ({ name, placeholder }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"} // Toggle between text and password
        placeholder={placeholder}
        name={name}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
      >
        {showPassword ? <LuEyeOff /> : <LuEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
