"use client";
import Image from "next/image";
import { createContext, useContext, useState, ReactNode } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";

const SideBarContext = createContext<{ expanded: boolean }>({ expanded: true });

type SidebarProps = {
  children: ReactNode;
};

function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="flex-1 h-screen rounded-md sticky top-0 ">
      <nav className="h-full flex flex-col shadow-sm rounded-md">
        <div className="HEADER-NAV flex justify-between items-center p-4 border-b pb-2">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "w-0"
            }`}
            alt=""
            width={25}
            height={25}
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {expanded ? (
              <LuChevronFirst size={25} />
            ) : (
              <LuChevronLast size={25} />
            )}
          </button>
        </div>
        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-2">{children}</ul>
        </SideBarContext.Provider>
        <div className="border-t-gray-600 border-t flex p-3">
          <Image
            src="https://avatars.githubusercontent.com/u/39876?v=4"
            className="w-8 h-8 rounded-full object-cover"
            alt=""
            width={25}
            height={25}
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all 
            ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-300">Samera</h4>
              <p className="text-sm text-gray-400">samera.f@gmail.com</p>
            </div>
            <MdMoreVert className="text-gray-300" size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export const useSidebar = () => useContext(SideBarContext);

export default Sidebar;
