import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setMenuOpen(false);

    // If user is on Contact page, go back to Home first
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 200);

      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={scrolled ? "navbar navbar-scroll" : "navbar"}>
      <div className="logo">
        <h2 onClick={() => handleScrollTo("hero")}>IBRAHIM</h2>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <a
            href="/#hero"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("hero");
              window.history.pushState({}, "", "/#hero");
            }}
          >
            <span>Home</span>
          </a>
        </li>

        <li>
          <a
            href="/#about"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("about");
              window.history.pushState({}, "", "/#about");
            }}
          >
            <span>About</span>
          </a>
        </li>

        <li>
          <a
            href="/#experience"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("experience");
              window.history.pushState({}, "", "/#experience");
            }}
          >
            <span>Experience</span>
          </a>
        </li>

        <li>
          <a
            href="/#skills"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("skills");
              window.history.pushState({}, "", "/#skills");
            }}
          >
            <span>Skills</span>
          </a>
        </li>

        <li>
          <a
            href="/#projects"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("projects");
              window.history.pushState({}, "", "/#projects");
            }}
          >
            <span>Projects</span>
          </a>
        </li>
      </ul>

      <Link to="/contact" className="hire-btn">
        Hire Me
      </Link>

      <div
        className={menuOpen ? "hamburger active" : "hamburger"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;
