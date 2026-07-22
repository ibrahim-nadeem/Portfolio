import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-left">

          <h2>Ibrahim Butt</h2>

          <p>
            Front-End Software Engineer passionate about creating
            modern React.js, Next.js and AI-powered web applications.
          </p>

        </div>

        <div className="footer-center">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <a href="#hero">Home</a>
            </li>

            <li>
              <a href="#about">About</a>
            </li>

            <li>
              <a href="#experience">Experience</a>
            </li>

            <li>
              <a href="#skills">Skills</a>
            </li>

            <li>
              <a href="#projects">Projects</a>
            </li>

          </ul>

        </div>

        <div className="footer-right">

          <h3>Connect</h3>

          <div className="social-links">
 

            

            <a href="mailto:ibrahimbutt130123@email.com">
              <FaEnvelope />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Ibrahim Butt. All Rights Reserved.
        </p>

        <button
          className="top-btn"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>

      </div>

    </footer>
  );
};

export default Footer;