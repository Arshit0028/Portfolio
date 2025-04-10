import React from "react";
import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import users_img from "../../assets/users_img.svg";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About me</h1>
        <img src={theme_pattern} alt="" />
      </div>
        <img src={users_img} alt="" height={400} />
      <div className="about-sections">
        <div className="about-left"></div>
        <div className="about-right">
          <div className="about-para">
            <p>
              Hey there! I’m a passionate full-stack developer who loves turning
              ideas into reality! With expertise in both front-end and back-end
              technologies, I create seamless user experiences that delight and
              engage.
            </p>
            <p>
              Excited to connect and collaborate with fellow tech enthusiasts!
              Let’s build something amazing together{" "}
            </p>
          </div>
          <div className="about-skills">
            <div className="about-skill">
              <p>HTML & CSS</p>
              <hr style={{ width: "95%" }} />
            </div>
            <div className="about-skill">
              <p>React JS</p>
              <hr style={{ width: "70%" }} />
            </div>
            <div className="about-skill">
              <p>Javascript</p>
              <hr style={{ width: "60%" }} />
            </div>
            <div className="about-skill">
              <p>MongoDB</p>
              <hr style={{ width: "70%" }} />
            </div>
            <div className="about-skill">
              <p>Node.js</p>
              <hr style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>
        <div id= "portfolio" className="about-heading">
          <h1>My Certifications</h1>
          <img src={theme_pattern} alt="" />
        </div>
       <div className="about-achievments">
      <div className="about-achievment">
          <h1>Certifications of JAVASCRIPT</h1>
          <p>I learned JavaScript from AlmaBetter, and it significantly boosted my coding skills!</p>
        </div>
        <hr />
        <div className="about-achievment">
          <h1>Certification of HTML & CSS</h1>
          <p>I learned HTML and CSS from AlmaBetter, which greatly improved my web development skills!</p>
        </div>
        <hr />
        <div className="about-achievment">
          <h1>Certification of FULL STACK JAVA DEVLOPMENT</h1>
          <p>I earned my Full Stack Java Development certification from Simplilearn, enhancing my programming expertise!</p>
        </div>
        <hr />
       </div>
    </div>
  );
};

export default About;
