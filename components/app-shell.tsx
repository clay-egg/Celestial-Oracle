"use client";

import { Nav } from "@/components/nav";
import { StarField } from "@/components/star-field";
import { Footer } from "@/components/footer";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen mystic-gradient overflow-x-hidden">
      <StarField />
      <Nav />
      <div className="relative z-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}
