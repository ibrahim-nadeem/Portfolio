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
    <>
      <header className={scrolled ? "navbar navbar-scroll" : "navbar"}>
        <div className="logo">
          <h2 onClick={() => handleScrollTo("home")}>IBRAHIM</h2>
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>
            <a
              href="/#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("home");
                window.history.pushState({}, "", "/#home");
              }}
            >
              Home
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
              About
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
              Experience
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
              Skills
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
              Projects
            </a>
          </li>

          {/* Mobile Hire Button */}
          
        </ul>

        {/* Desktop Hire Button */}
        <Link
          to="/contact"
          className="hire-btn desktop-hire"
        >
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

      {/* Overlay */}
      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;