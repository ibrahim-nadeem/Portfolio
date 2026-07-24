import React from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Restaurant Management System",
    description:
      "A modern restaurant management platform with table booking, menu management and responsive dashboard.",

    image: "/images/rms.jpg",

    technologies: [
      "React",
      "Node.js",
      "Firebase",
    ],

 
   },

  {
    id: 2,

    title: "AI Chatbot",

    description:
      "An intelligent AI chatbot with OpenAI integration, voice support and file upload functionality.",

    image: "/images/chatbot.jpg",

    technologies: [
      "React",
      "Next.js",
      "OpenAI",
    ],

 
   },

  {
    id: 3,

    title: "E-Commerce Website",

    description:
      "Fully responsive ecommerce website with authentication, cart system and payment integration.",

    image: "/images/ecommerce.webp",

    technologies: [
      "React",
      "Redux",
      "Stripe",
    ],

    

   },

  {
    id: 4,

    title: "Portfolio Website",

    description:
      "Interactive developer portfolio with animations, glassmorphism and responsive UI.",

    image: "/images/hq720.jpg",

    technologies: [
      "React",
      "GSAP",
      "CSS",
    ],

 
   },
   {
    id: 5,

    title: "Landing Page",

    description:
      "Interactive business landing page   with animations, glassmorphism and responsive UI.",

    image: "/images/land.png",

    technologies: [
      "React",
      "GSAP",
      "CSS",
    ],

 
   },
];

const Projects = () => {
  return (
    <section className="projects" id="projects">

      <div className="projects-heading">

        <span>PORTFOLIO</span>

        <h2>Featured Projects</h2>

        <p>
          Some of the projects I've built using modern frontend technologies
          and AI integrations.
        </p>

      </div>

      <div className="projects-grid">

        {projects.map((project) => (

          <div className="project-card" key={project.id}>

            <div className="project-image">

              <img
                src={project.image}
                alt={project.title}
              />

            </div>

            <div className="project-content">

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-stack">

                {project.technologies.map((tech, index) => (
                  <span key={index}>
                    {tech}
                  </span>
                ))}

              </div>

              <div className="project-buttons">

                

               

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Projects;