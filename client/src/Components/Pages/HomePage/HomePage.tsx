import React, {useEffect} from "react";
import "./HomePage.less";

import CourseDisplay from './CourseDisplay'

const HomePage = () => {

  useEffect(() => {

  }, [])

  return (
    <div className="HomePage">
      <h1>Name</h1>
      <div id="homeTop">
        <div id="coursedisplay">
          <h2>Courses</h2>
          <CourseDisplay/>
        </div>
        <div id="nothing">
          Complete Cources
        </div>
      </div>
      <div id="homeBottom">
      </div>
    </div>
  );
    
}

export default HomePage;