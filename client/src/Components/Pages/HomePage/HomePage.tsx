import React, { useEffect } from "react";
import "./HomePage.less";

import CookieHandler from "../../../utils/clientCookies";
import CourseDisplay from "./CourseDisplay";
import { Typography, PageHeader } from "antd";

const HomePage = () => {
  const username = CookieHandler.getCookie("username");
  useEffect(() => {}, []);

  return (
    <div className="HomePage">
      <span>
        <PageHeader
          title={
            <Typography.Title level={3}>Hello {username}</Typography.Title>
          }
          subTitle={
            <Typography.Title level={4}>welcome to syn|LERN</Typography.Title>
          }
        />
      </span>

      <div id="homeTop">
        <div id="coursedisplay">
          <h2>Courses</h2>
          <CourseDisplay />
        </div>
      </div>
      <div id="homeBottom"></div>
    </div>
  );
};

export default HomePage;
