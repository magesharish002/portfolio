import { useEffect, useRef, useState } from "react";
import { projectFilters, projects, profile } from "../data/portfolio";
import {
  gsap,
  ScrollTrigger,
  isFinePointer,
  prefersReducedMotion,
} from "../lib/gsap";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Icons";

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMove = (event) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationX: -ny * 5,
      rotationY: nx * 7,
      transformPerspective: 1000,
      duration: 0.55,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <article
      className={`project ${project.featured ? "project--featured" : ""}`}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor
    >
      <div
        className="project__visual"
        style={{
          "--a": project.visual.from,
          "--b": project.visual.to,
        }}
      >
        <span className="project__mesh" aria-hidden="true" />
        <span className="project__scan" aria-hidden="true" />
        <span className="project__glyph" aria-hidden="true">
          {project.visual.glyph}
        </span>
        <span className="project__num" aria-hidden="true">
          /{project.index}
        </span>
        <span className="project__corners" aria-hidden="true" />
      </div>

      <div className="project__body">
        <div className="project__meta">
          <span>{project.category}</span>
          <span className="project__year">{project.year}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project__foot">
          <a
            href={project.link}
            className="project__link"
            target="_blank"
            rel="noreferrer"
          >
            {project.linkLabel}
            <ArrowUpRight size={15} />
          </a>
          <span className="project__index" aria-hidden="true">
            {project.index}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handler = (event) => {
      if (projectFilters.includes(event.detail)) {
        setFilter(event.detail);
      }
    };

    window.addEventListener("portfolio:filter", handler);
    return () => window.removeEventListener("portfolio:filter", handler);
  }, []);

  // Cards mounting after a filter change start hidden behind their Reveal
  // scroll triggers. Recalculate trigger positions once the new grid is in
  // the DOM so the cards animate in even if #work is already on screen.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [filter]);

  const visible =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const countFor = (name) =>
    name === "All"
      ? projects.length
      : projects.filter((project) => project.category === name).length;

  return (
    <section id="work" className="section projects">
      <div className="container">
        <SectionHead
          index="04"
          label="Selected Work"
          titleLines={[
            "Selected",
            <>
              <span className="grad">work.</span>
            </>,
          ]}
          text="A mix of web, AI and embedded builds — each one made to learn something, not just to fill a grid."
        />

        <div className="projects__bar">
          <div
            className="filters"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectFilters.map((name) => (
              <button
                type="button"
                key={name}
                className={`filter ${filter === name ? "is-active" : ""}`}
                onClick={() => setFilter(name)}
                aria-pressed={filter === name}
              >
                {name}
                <span>{countFor(name)}</span>
              </button>
            ))}
          </div>

          <span className="projects__count mono" aria-live="polite">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </div>

        <div className="projects__grid">
          {visible.map((project, index) => (
            <Reveal
              className={`project-wrap ${
                project.featured ? "is-featured" : ""
              }`}
              key={project.id}
              delay={index * 0.05}
              y={30}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="projects__footer" y={18}>
          <span className="mono">MORE EXPERIMENTS LIVE ON GITHUB</span>
          <a
            href={profile.socials[0].href}
            className="projects__github"
            target="_blank"
            rel="noreferrer"
          >
            Browse the repos
            <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
