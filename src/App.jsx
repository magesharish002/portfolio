import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import EmbeddedLab from "./components/EmbeddedLab";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.body.classList.add("is-loading");

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    window.__lenis = lenis;
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      delete window.__lenis;
      document.body.classList.remove("is-loading", "menu-open");
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    document.body.classList.remove("is-loading");
    window.__lenis?.start();

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 320);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    if (menuOpen) {
      window.__lenis?.stop();
      document.body.classList.add("menu-open");
    } else {
      window.__lenis?.start();
      document.body.classList.remove("menu-open");
    }
  }, [menuOpen, loaded]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <Preloader onComplete={handleLoaded} />
      <Cursor />
      <ScrollProgress />
      <Navbar ready={loaded} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main id="main">
        <Hero ready={loaded} />
        <About />
        <Skills />
        <EmbeddedLab />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
