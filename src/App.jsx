import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";

import Home from "./pages/Home";
import Contact from "./pages/contact";
import ChatbotPage from "./pages/chatbot/chatbotpage";
import ChatFab from "./components/chatfab/Chatfab";

function App() {

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
    });

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };

  }, []);

  return (
    <><Routes>

      <Route
        path="/"
        element={<Home />} />

      <Route
        path="/contact"
        element={<Contact />} />

      <Route
        path="/chatbot"
        element={<ChatbotPage />} />

    </Routes>
    
    <ChatFab /></>

  );
}

export default App;