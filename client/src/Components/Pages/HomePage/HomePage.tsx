import React, { useEffect, useState } from "react";
import "./HomePage.less";
import axios from 'axios';
import CookieHandler from "../../../utils/clientCookies";
// import CourseDisplay from "./CourseDisplay";
import { Typography, PageHeader } from "antd";
import Pathways from "./Pathways";

const HomePage = () => {
  const username = CookieHandler.getCookie("username");



  
  const [User, setUser] = useState(null);

  useEffect(() => {
      findCourses(username);
      //TODO spinner while loading
      //Dependencies below, only run if these change
      // console.log(User);
      
  }, []);

  const findCourses = (userName: string) => {
      return axios({
          url: 'http://localhost:3000/graphql',
          method: 'post',
          data: {
              query: `
              query UserByName($username: String) {
                  userByName(username: $username) {
                      id
                      createdAt
                      username 
                      coursesTaken
                      coursesComplete
                      currentCourses {
                          id
                          createdAt
                          name
                          nodes{
                            id
                          }
                          quizzes{
                            id
                          }
                      }
                      history
                      accessLevel
                      account {
                        id
                        username 
                        firstname 
                        lastname 
                        email 
                        position 
                        phone
                      }
                  }
                }`,
              variables: {
                  username: userName
              }
          }
      }).then((res) => {
          console.log(res);
          
          const usersAccount = res.data.data.userByName;
          setUser(usersAccount);
      }).catch((res) => {
          console.log("Something went wrong with finding the user account and courses, res:", res);
      });
  }


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
          {User && <Pathways user={User} />}
          
        </div>
      </div>
      <div id="homeBottom"></div>
    </div>
  );
};

export default HomePage;
