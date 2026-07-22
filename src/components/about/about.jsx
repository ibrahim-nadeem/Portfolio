import React from "react";
import {
  FaLaptopCode,
  FaRobot,
  FaReact,
  FaPaintBrush,
} from "react-icons/fa";

import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-title">
        <span>ABOUT ME</span>
        <h2>Passionate Front-End Developer</h2>
      </div>

      <div className="about-container">
        <div className="about-left">
          <h3>Who Am I?</h3>

          <p>
            I'm <strong>Ibrahim Butt</strong>, a passionate Front-End Software
            Engineer who loves building beautiful, interactive and high
            performance web applications.
          </p>

          <p>
            My expertise includes React.js, Next.js, modern UI development,
            chatbot integration, REST APIs and creating premium user
            experiences.
          </p>

          <p>
            I enjoy turning creative ideas into real digital products that are
            responsive, scalable and visually impressive.
          </p>

          <div className="about-stats">
            <div className="stat-box">
              <h2>1+</h2>
              <span>Years Learning</span>
            </div>

            <div className="stat-box">
              <h2>5+</h2>
              <span>Projects</span>
            </div>

            <div className="stat-box">
              <h2>100%</h2>
              <span>Dedication</span>
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-card">
            <FaReact />
            <h4>React & Next.js</h4>
            <p>Building fast and scalable applications.</p>
          </div>

          <div className="about-card">
            <FaRobot />
            <h4>AI Chatbots</h4>
            <p>Creating intelligent AI assistants.</p>
          </div>

          <div className="about-card">
            <FaLaptopCode />
            <h4>Frontend</h4>
            <p>Responsive and modern UI development.</p>
          </div>

          <div className="about-card">
            <FaPaintBrush />
            <h4>UI / UX</h4>
            <p>Clean, premium and user-focused designs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;