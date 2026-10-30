"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

/**
 * Engineering impact — the "third page" below the AboutSections deck.
 * A cinematic, scroll-driven horizontal showcase: the section pins to the
 * viewport and the panels slide sideways as you scroll down. Matches the
 * warm-orange glow theme. On small screens it falls back to a native
 * horizontal swipe carousel (no scroll-jacking).
 */

const PROJECTS = [
  {
    company: "Cloud Cost Optimization",
    sub: "Infrastructure · Secto",
    role: "Lowering operating costs by 35%",
    period: "Software Development Engineer III",
    items: [
      {
        name: "Cloud efficiency",
        desc: "Optimized cloud-based infrastructure and deployment practices to reduce cloud costs while improving system performance and availability.",
      },
    ],
    tech: ["AWS", "GCP", "Docker", "ECS", "CI/CD"],
  },
  {
    company: "Pharmacy Microservices",
    sub: "Backend Architecture · Apollo Pharmacy",
    role: "Modernizing a high-throughput platform",
    period: "2020 — 2023",
    items: [
      {
        name: "Monolith decomposition",
        desc: "Helped migrate a legacy Node.js pharmacy system to modular TypeScript and NestJS microservices, contributing to API and database design. Services supported around 1 million daily active users and 50,000 transactions per day.",
      },
    ],
    tech: ["TypeScript", "NestJS", "GraphQL", "Kafka", "DLQ & Retries"],
  },
  {
    company: "API Performance",
    sub: "Caching · Architecture",
    role: "3x faster API performance",
    period: "Selected engineering impact",
    items: [
      {
        name: "Caching and optimization",
        desc: "Improved API response performance by 3x using Redis caching and architectural improvements, alongside database query optimization.",
      },
    ],
    tech: ["Redis", "Node.js", "REST APIs", "Query Optimization"],
  },
  {
    company: "Geospatial Data Products",
    sub: "Frontend · Apollo Pharmacy",
    role: "Making location data useful",
    period: "2020 — 2023",
    items: [
      {
        name: "Interactive maps and dashboards",
        desc: "Built geospatial visualizations with Deck.gl and React to present location-based datasets and support real-time insights and decision-making.",
      },
    ],
    tech: ["React", "Deck.gl", "MERN", "Geospatial Data"],
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / tablet: pin the section and scroll the track horizontally.
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const fill = fillRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (fill) fill.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => tween.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      <div ref={trackRef} className={styles.track}>
        {/* Intro panel */}
        <div className={`${styles.panel} ${styles.intro}`}>
          <p className={styles.eyebrow}>Engineering — Selected Impact</p>
          <h2 className={styles.bigTitle}>
            Systems I
            <br />
            <span className={styles.hot}>build.</span>
          </h2>
          <p className={styles.introLead}>
            Scalable applications, high-throughput services, cloud efficiency,
            and architecture improvements built for real production workloads.
          </p>
          <p className={styles.scrollHint}>
            Scroll to explore <span aria-hidden>→</span>
          </p>
        </div>

        {/* Project panels */}
        {PROJECTS.map((p, i) => (
          <article key={p.company} className={styles.panel}>
            <span className={styles.index} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={styles.panelHead}>
              <div>
                <h3 className={styles.company}>{p.company}</h3>
                <p className={styles.sub}>{p.sub}</p>
              </div>
              <span className={styles.period}>{p.period}</span>
            </div>
            <p className={styles.role}>{p.role}</p>
            <ul className={styles.items}>
              {p.items.map((it, j) => (
                <li key={j}>
                  {it.name && <strong>{it.name}: </strong>}
                  {it.desc}
                </li>
              ))}
            </ul>
            <ul className={styles.pills}>
              {p.tech.map((t) => (
                <li key={t} className={styles.pill}>
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Scroll progress bar (desktop) */}
      <div className={styles.progress} aria-hidden="true">
        <span ref={fillRef} className={styles.progressFill} />
      </div>
    </section>
  );
}
