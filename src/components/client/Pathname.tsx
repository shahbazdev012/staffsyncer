"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Pathname = () => {
  const title = usePathname();
  const pageTitle = title
    ? title
        .split("/")
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" > ")
    : "Home";
  return <>{pageTitle}</>;
};

export default Pathname;
