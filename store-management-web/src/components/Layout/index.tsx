import type { ReactNode } from "react";
import { useState } from "react";

import Header from "../Header";
import Sidebar from "../Sidebar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f5f7] lg:flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((current) => !current)}
      />

      <div className="min-w-0 flex-1">
        <Header />

        <main className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1480px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
