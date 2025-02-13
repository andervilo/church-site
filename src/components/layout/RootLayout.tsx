import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header
        logo="https://api.dicebear.com/7.x/initials/svg?seed=GPC"
        onContactClick={() => console.log("Contact clicked")}
      />
      <main className="mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
