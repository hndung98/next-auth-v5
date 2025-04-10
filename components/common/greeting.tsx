"use client";

import { useEffect, useState } from "react";

import { getGreeting } from "@/lib/utils";

export const ClientGreeting = () => {
  const [clientGreeting, setClientGreeting] = useState("");

  useEffect(() => {
    setClientGreeting(getGreeting());
  }, []);
  return <strong>{clientGreeting}</strong>;
};
