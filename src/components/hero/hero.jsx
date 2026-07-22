import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaArrowRight } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "./Hero.css";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-bg">
        <span className="blob blob1"></span>
        <span className="blob blob2"></span>
        <span className="blob blob3"></span>
        <div className="grid"></div>
      </div>

      <div className="container hero-container">
        {/* LEFT */}

        <motion.div
          className="hero-left"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <span className="hero-badge">
            🚀 Front-End Developer & AI Integration
          </span>

          <h1>
            Building
            <br />
            <span>Modern Digital</span>
            Experiences
          </h1>

          <h3>
            Hi, I'm <span>Ibrahim Butt</span>
          </h3>

          <p>
            I design and develop premium websites using React, Next.js and AI
            technologies. I am also specialized in creating AI chatbots for
            business. My focus is creating beautiful user experiences with
            smooth animations, clean code and intelligent integrations.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="primary-btn">
              View Projects
              <FaArrowRight />
            </a>

            <a href="/contact" className="secondary-btn">
              Hire Me
            </a>

             <a href="/chatbot" className="secondary-btn">
               Meet my AI
            </a>
          </div>

          <div className="hero-social">
            <a
              href="mailto:ibrahimbutt130123@gmail.com"
              aria-label="Send Email"
            >
              <HiOutlineMail />
            </a>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="hero-right"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >
          <div className="video-glow"></div>

          <motion.div
            className="video-card"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="video-header">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>AI INTRODUCTION</p>
            </div>

            <iframe
              src="https://app.heygen.com/embeds/ef56c687bd4044d0943f8e4220e2b1e5"
              title="AI Introduction"
              allow="fullscreen"
              allowFullScreen
            ></iframe>
          </motion.div>

          {/* Floating Cards */}

          <motion.div
            className="floating-card card1"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            ⚡ React.js
          </motion.div>

          <motion.div
            className="floating-card card2"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            🤖 AI
          </motion.div>

          <motion.div
            className="floating-card card3"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          >
            ▲ Next.js
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll */}

      <motion.div
        className="scroll-down"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <span></span>
      </motion.div>
    </section>
  );
};

export default Hero;
