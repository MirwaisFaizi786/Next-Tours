import Link from "next/link";
import { useSidebar } from "./Sidebar";
import { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  path: string;
  setNavLinkClicked: (value: boolean) => void;
  navLinkClicked: boolean;
};

function SidebarItem({
  icon,
  text,
  active,
  alert,
  path,
  setNavLinkClicked,
  navLinkClicked
}: SidebarItemProps) {
  const { expanded } = useSidebar();
  return (
    <Link href={path}>
      <li
        onClick={() => setNavLinkClicked(!navLinkClicked)}
        className={`relative flex items-center group py-2 px-3 my-1 font-medium cursor-pointer rounded-md transition-colors ${
          active
            ? "bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white"
            : "hover:bg-gray-700 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all text-gray-300 ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute w-2 h-2 rounded bg-indigo-400 right-2 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}
        {!expanded && (
          <div
            className="absolute left-full rounded-md px-2 py-1 ml-6 z-40
      bg-indigo-400 text-indigo-800 text-sm invisible  opacity-20 -translate-x-3
      transition-all
      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

export default SidebarItem;
