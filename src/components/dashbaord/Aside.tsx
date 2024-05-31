"use client"
import React from 'react'
import Sidebar from './Sidebar'
import SidebarItem from './SidebarItem'

import { useState } from "react";
import { SlSocialSpotify } from "react-icons/sl";
import { ImHome } from "react-icons/im";
import { IoIosSearch } from "react-icons/io";

function Aside() {
    const [navLinkClicked, setNavLinkClicked] = useState(false);
  return (
    <div className="flex bg-gray-100">
    <Sidebar>
      <SidebarItem
        icon={<SlSocialSpotify className="text-gray-300" />}
        text="Tour Package Registration"
        path="/dashboard/tourRegistry"
        setNavLinkClicked={setNavLinkClicked}
        navLinkClicked={navLinkClicked}
        active
      />
      <SidebarItem
        icon={<ImHome className="text-gray-300" />}
        text="Home"
        path="/"
        setNavLinkClicked={setNavLinkClicked}
        navLinkClicked={navLinkClicked}
      />
      <SidebarItem
        icon={<IoIosSearch className="text-gray-300" />}
        text="Search"
        path="/search"
        setNavLinkClicked={setNavLinkClicked}
        navLinkClicked={navLinkClicked}
        alert
      />
    </Sidebar>
  </div>
  )
}

export default Aside