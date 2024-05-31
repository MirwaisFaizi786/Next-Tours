"use client";
import React from "react";

function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-ring loading-xs"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}

export default loading;
