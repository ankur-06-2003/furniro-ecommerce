"use client";

import useAuth from "@/stores/userStore";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const { setUser } = useAuth();
  const [mounted, setMounted] = useState(false);

  const loginStatus = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || res.status !== 200 || !data?.user) {
        setUser(null);
        return;
      }

      setUser(data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    setMounted(true);
    loginStatus();
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default AuthProvider;
