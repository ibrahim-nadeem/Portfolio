import React, { useEffect } from "react";
import "./Home.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Loader from "../components/loader/loader";
import Navbar from "../components/navbar/navbar";
import Hero from "../components/hero/hero";
import About from "../components/about/about";
import Experience from "../components/experience/experience";
import Skills from "../components/skills/skills";
import Projects from "../components/projects/projects";
import Footer from "../components/footer/footer";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  useEffect(() => {

    /* ---------- Lenis ---------- */

    const lenis = new Lenis({
      duration: 1.3,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    /* ---------- Hero Animation ---------- */

    const tl = gsap.timeline({

      scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "+=2500",

        scrub: 2,

        pin: true,

        anticipatePin: 1,

      },

    });

    tl.to(".hero-video-section", {

      yPercent: -35,

      scale: .92,

      ease: "none",

      duration: 2,

    })

    .fromTo(

      ".hero-content",

      {

        yPercent: 100,

      },

      {

        yPercent: 0,

        ease: "none",

        duration: 2,

      },

      "-=1.6"

    );

    return () => {

      lenis.destroy();

      ScrollTrigger.getAll().forEach((t) => t.kill());

    };

  }, []);

  return (
    <>
      <Loader />
      <Navbar />

      <main className="home">

        <Hero />

        <About />

        <Experience />

        <Skills />

        <Projects />

        <Footer />

      </main>
    </>
  );
};

export default Home;