"use client";
import RoleTabs from "@/components/features/RoleTabs";
import ViewCategories from "@/components/features/admin_features/category/ViewCategories";
import React, { useTransition } from "react";

import AddCategory from "@/components/features/admin_features/category/AddCategory";
const CategoryPage = () => {

  return (
    <div>
      <div>
        
        <RoleTabs role={"ADMIN"}></RoleTabs>
      </div>
      <ViewCategories />
      <div className="flex flex-col justify-center items-center mt-4"><AddCategory/></div>
   
    </div>
  );
};

export default CategoryPage;
