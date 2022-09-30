import DashBoardManage from "module/dashboard/DashBoardManage";
import React from "react";
import DashboardHeading from "../drafts/DashboardHeading";

const DashboardPage = () => {
  return (
    <div>
      <DashboardHeading
        title="Dashboard"
        desc="Overview dashboard monitor"
      ></DashboardHeading>
      <DashBoardManage></DashBoardManage>
    </div>
  );
};

export default DashboardPage;
