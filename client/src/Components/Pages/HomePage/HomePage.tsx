import React, { useEffect, useState } from "react";
import "./HomePage.less";
import axios from 'axios';
import CookieHandler from "../../../utils/clientCookies";
// import CourseDisplay from "./CourseDisplay";
import { Typography, PageHeader, Row, Col } from "antd";
import { Pathways } from "./Pathways";
import Nod from "./Nod";

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
          url: '/graphql/',
          method: 'post',
          data: {
              query: `
              query UserByName($username: String) {
                  userByName(username: $username) {
                      id
                      createdAt
                      username 
                      coursesTaken{
                        id
                        createdAt
                        name
                        nodes{
                          id
                          name
                        }
                        quizzes{
                          id
                        }
                    }
                      coursesComplete {
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
                      viewed {
                        id
                      }
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
          const usersAccount = res.data.data.userByName;
          setUser(usersAccount);

      }).catch((res) => {
          console.log("Something went wrong with finding the user account and courses, res:", res);
      });
  }


    return (
        <div className="HomePage">
            <span>
                <PageHeader title={<Typography.Title level={3}>Hello {username} </Typography.Title>}/>
            </span>
            <Row gutter={16}>
                <Col span={24} style={{ marginBottom: "20px" }}>
                    <Typography.Title level={4}>
                        Welcome to syn|LERN
                    </Typography.Title>
                    <Typography.Paragraph>
                        Synlern is a learning platform built for the education of new and existing staff. 
                        Search for areas of interest to read about individual assests.
                        If you're new to the company check the account page for your personalised learning pathways.
                    </Typography.Paragraph>
                </Col>
                <Col span={12}>
                    {User && <Pathways user={User} />}
                </Col>
                <Col span={12}>
                    <Nod/>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
