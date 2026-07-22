import React from "react";

import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaRobot,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
} from "react-icons/si";

import "./Skills.css";


const skills = [
  {
    icon: <FaHtml5 />,
    title: "HTML5",
    level: "Advanced",
  },

  {
    icon: <FaCss3Alt />,
    title: "CSS3",
    level: "Advanced",
  },

  {
    icon: <FaJsSquare />,
    title: "JavaScript",
    level: "Advanced",
  },

  {
    icon: <FaReact />,
    title: "React.js",
    level: "Expert",
  },

  {
    icon: <SiNextdotjs />,
    title: "Next.js",
    level: "Advanced",
  },

  {
    icon: <SiTypescript />,
    title: "TypeScript",
    level: "Intermediate",
  },

  {
    icon: <FaNodeJs />,
    title: "Node.js",
    level: "Intermediate",
  },

  {
    icon: <SiFirebase />,
    title: "Firebase",
    level: "Intermediate",
  },

  {
    icon: <FaGitAlt />,
    title: "Git",
    level: "Advanced",
  },

  {
    icon: <FaGithub />,
    title: "GitHub",
    level: "Advanced",
  },

  {
    icon: <FaRobot />,
    title: "AI Chatbots",
    level: "Expert",
  },

  {
    icon: <SiTailwindcss />,
    title: "Tailwind CSS",
    level: "Advanced",
  },
];


const Skills = () => {
  return (
    <section className="skills" id="skills">

      <div className="skills-heading">

        <span>MY SKILLS</span>

        <h2>
          Technologies I Work With
        </h2>

        <p>
          Building modern web applications with frontend technologies,
          AI integrations and scalable solutions.
        </p>

      </div>


      <div className="skills-grid">

        {skills.map((skill, index) => (

          <div 
            className="skill-card" 
            key={index}
          >

            <div className="skill-icon">
              {skill.icon}
            </div>


            <h3>
              {skill.title}
            </h3>


            <p>
              {skill.level}
            </p>


          </div>

        ))}

      </div>

    </section>
  );
};


export default Skills;