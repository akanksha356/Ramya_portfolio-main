"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSections.module.css";

const SKILL_GROUPS = [
  { label: "Languages & Frontend", items: ["JavaScript", "TypeScript", "React", "HTML", "CSS"] },
  { label: "Backend & APIs", items: ["Node.js", "NestJS", "REST APIs", "GraphQL", "Microservices"] },
  { label: "Cloud & Delivery", items: ["AWS", "GCP", "Docker", "Amazon ECS", "CI/CD"] },
  { label: "Data & Messaging", items: ["Redis", "Kafka", "Database Architecture", "Query Optimization", "Dead-letter Queues", "Retries"] },
  { label: "Quality & Leadership", items: ["Unit Testing", "Integration Testing", "Code Reviews", "System Design", "Mentoring", "Agile"] },
  { label: "Applications", items: ["Geospatial Dashboards", "Deck.gl", "Real-time Data Visualization", "Authentication", "Authorization", "Secure Data Handling"] },
];

const EXPERIENCE = [
  {
    date: "2023 — Present",
    role: "Software Development Engineer III",
    org: "Secto",
    meta: "Bangalore, India · Led end-to-end frontend and backend development with React and Node.js; designed scalable REST APIs, microservices, and database architectures; optimized AWS/GCP infrastructure and CI/CD; mentored engineers and advanced secure development practices.",
  },
  {
    date: "2020 — 2023",
    role: "Senior Software Engineer",
    org: "Apollo Pharmacy",
    meta: "Hyderabad, Telangana · Built MERN applications, geospatial dashboards with Deck.gl, and GraphQL/Kafka services in a microservices architecture supporting around 1 million daily active users and 50,000 transactions per day. Helped decompose a Node.js monolith into TypeScript/NestJS microservices and owned production optimization.",
  },
];

const EDUCATION = [
  {
    date: "2012 — 2017",
    degree: "Bachelor of Technology, Electrical Engineering",
    school: "Indian Institute of Technology Ropar",
    meta: "Punjab, India",
  },
];

const ACHIEVEMENTS = [
  "Reduced cloud costs by 35%",
  "Boosted API performance by 3x through Redis caching and architectural improvements",
  "Automated a reporting pipeline",
  "Led migration of a legacy system to microservices",
];

export default function AboutSections() {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        const reveals = card.querySelectorAll(`.${styles.reveal}`);
        gsap.fromTo(
          reveals,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="work" ref={rootRef} className={styles.wrap}>
      <div className={styles.inner}>
        <section className={styles.card}>
          <span className={styles.cardNum} aria-hidden="true">01</span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Profile — Engineering</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Who I Am</h2>
          <p className={`${styles.lead} ${styles.reveal}`}>
            I&apos;m a <span className={styles.hot}>full-stack Software Engineer</span>{" "}
            with 9+ years of experience building scalable web applications and
            cloud-native backend systems. I work across React, Node.js, and AWS,
            with a focus on microservices, infrastructure efficiency, and reliable
            delivery. I&apos;ve reduced cloud costs by 35% and improved API performance
            by 3x through caching and architectural improvements.
          </p>
          <ul className={`${styles.pills} ${styles.reveal}`}>
            {["Full-stack Development", "Cloud-native Systems", "Microservices", "Performance", "Technical Leadership"].map((item) => (
              <li key={item} className={styles.pill}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.card}>
          <span className={styles.cardNum} aria-hidden="true">02</span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Skills — Stack</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Technical Skills</h2>
          <div className={styles.skillGrid}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className={`${styles.skillGroup} ${styles.reveal}`}>
                <p className={styles.skillLabel}>{group.label}</p>
                <ul className={styles.pills}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.pill}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <span className={styles.cardNum} aria-hidden="true">03</span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Work — Journey</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Experience</h2>
          <div className={styles.eduList}>
            {EXPERIENCE.map((item) => (
              <div key={`${item.org}-${item.role}`} className={`${styles.eduRow} ${styles.reveal}`}>
                <span className={styles.eduDate}>{item.date}</span>
                <div className={styles.eduBody}>
                  <p className={styles.eduDegree}>
                    {item.role} — <span className={styles.hot}>{item.org}</span>
                  </p>
                  <p className={styles.eduSchool}>{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <span className={styles.cardNum} aria-hidden="true">04</span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Education — Selected Impact</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Education</h2>
          <div className={styles.eduList}>
            {EDUCATION.map((item) => (
              <div key={item.degree} className={`${styles.eduRow} ${styles.reveal}`}>
                <span className={styles.eduDate}>{item.date}</span>
                <div className={styles.eduBody}>
                  <p className={styles.eduDegree}>{item.degree}</p>
                  <p className={styles.eduSchool}>{item.school}</p>
                  <p className={styles.eduMeta}>{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={`${styles.skillLabel} ${styles.reveal}`} style={{ marginTop: "2rem" }}>
            Selected Impact
          </p>
          <ul className={`${styles.achieveList} ${styles.reveal}`}>
            {ACHIEVEMENTS.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
