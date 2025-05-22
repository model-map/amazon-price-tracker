import React from "react";
import { SectionCards } from "./section-cards";
import { SiteHeader } from "./site-header";
import Form_addProduct from "./form_addProduct";
import { Label } from "./ui/label";

const Dashboard = () => {
  return (
    <div className="">
      <SiteHeader />
      <div
        className="grid grid-cols-2 gap-4 px-4  lg:px-6
      @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
      >
        <div className="hidden md:block"></div>
        <div className="col-span-2 my-10">
          <Form_addProduct />
        </div>
        <SectionCards />
        <SectionCards />
      </div>
    </div>
  );
};

export default Dashboard;
