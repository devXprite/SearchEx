"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function AuthContext({ session, children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}