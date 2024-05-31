
import Aside from "@/components/dashbaord/Aside";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {



  return (
    <div className="flex gap-1">
      <Aside />
      <main className="w-full">{children}</main>
    </div>
  );
}

export default Layout;
