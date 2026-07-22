import React from "react";
import "./Experience.css";

const experienceData = [
  {
    year: "2025",
    title: "Frontend Developer",
    description:
      "Started my professional journey as a Frontend Developer, building responsive and modern web interfaces using HTML, CSS, JavaScript and React.js.",
  },
  {
    year: "2025 - Present",
    title: "React.js & Next.js Developer",
    description:
      "Developing scalable web applications with React.js and Next.js, focusing on reusable components, performance optimization and clean UI architecture.",
  },
  {
    year: "Present",
    title: "AI Integration & Chatbot Development",
    description:
      "Working on AI-powered applications, chatbot systems and API integrations to create smarter digital experiences.",
  },
];

const Experience = () => {
  return (
    <section className="experience" id="experience">

      <div className="experience-heading">

        <span>MY EXPERIENCE</span>

        <h2>
          1 Year Development Journey
        </h2>

        <p>
          My journey of building modern frontend applications,
          interactive interfaces and AI-powered solutions.
        </p>

      </div>


      <div className="timeline">

        {experienceData.map((item, index) => (

          <div
            className={`timeline-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
            key={index}
          >

            <div className="timeline-content">

              <span className="year">
                {item.year}
              </span>


              <h3>
                {item.title}
              </h3>


              <p>
                {item.description}
              </p>


            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Experience;