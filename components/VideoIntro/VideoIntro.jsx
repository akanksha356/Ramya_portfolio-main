"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import CinematicLayer from "@/components/CinematicLayer/CinematicLayer";
import styles from "./VideoIntro.module.css";

/**
 * Intro hero
 *  - "Open to work" badge, name, role, skill pills, and CTAs
 *  - Dark bokeh particle background (Three.js) floating over the whole hero
 *  - GSAP entrance timeline and scroll indicator
 */
export default function VideoIntro({
  badge = "Open to work",
  firstName = "Surya Teja",
  lastName = "Pathuri",
  role = "Software Development Engineer III · Full-stack systems",
  skills = ["JavaScript", "Node.js", "React", "AWS"],
  githubUrl = "https://github.com/suryateja",
  email = "suryateja.uidev@gmail.com",
  nextSectionId = "work",
}) {
  const rootRef = useRef(null);
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  /* ---- GSAP entrance ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
        .fromTo(
          `.${styles.badge}`,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.lineFirst}`,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(
          `.${styles.lineLast}`,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" },
          "-=0.8"
        )
        .fromTo(
          `.${styles.role}`,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.55"
        )
        .fromTo(
          `.${styles.pills} > *`,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.actions} > *`,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
          "-=0.25"
        )
        .fromTo(
          `.${styles.scroll}`,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.3"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = useCallback(() => {
    const el = document.getElementById(nextSectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [nextSectionId]);

  const toggleAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsAudioPlaying(true);
        setAudioError(false);
      } catch {
        setAudioError(true);
      }
    } else {
      audio.pause();
      setIsAudioPlaying(false);
    }
  }, []);

  return (
    <section className={styles.stickyWrap}>
      <div ref={rootRef} className={styles.hero}>
        {/* Ambient gradient washes */}
        <div className={styles.bgWarm} aria-hidden="true" />
        <div className={styles.bgMonitor} aria-hidden="true" />

        {/* Three.js bokeh particle layer (over the whole hero) */}
        <CinematicLayer />

        {/* ---- Left: text column ---- */}
        <div className={styles.left}>
          {badge ? (
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              {badge}
            </span>
          ) : null}

          <h1 className={styles.name}>
            <span className={styles.lineMask}>
              <span className={styles.lineFirst}>{firstName}</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.lineLast}>{lastName}</span>
            </span>
          </h1>

          <p className={styles.role}>{role}</p>

          <ul className={styles.pills}>
            {skills.map((s) => (
              <li key={s} className={styles.pill}>
                {s}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={handleScrollDown}
            >
              View Experience
            </button>
            <a
              className={styles.btnGhost}
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path
                  d="M7 17L17 7M17 7H9M17 7v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
            <a className={styles.btnGhost} href={`mailto:${email}`}>
              Email
            </a>
          </div>

        </div>

        <div className={styles.audioPlayer}>
          <button
            type="button"
            className={styles.audioButton}
            onClick={toggleAudio}
            aria-label={isAudioPlaying ? "Pause audio message" : "Play audio message"}
            title={isAudioPlaying ? "Pause audio message" : "Play audio message"}
          >
            {isAudioPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <audio
            ref={audioRef}
            className={styles.audioElement}
            preload="metadata"
            onEnded={() => setIsAudioPlaying(false)}
          >
            <source src="/intro-audio.mp3" type="audio/mpeg" />
          </audio>
          <span className={styles.audioStatus} role="status" aria-live="polite">
            {audioError ? "Audio playback unavailable" : ""}
          </span>
        </div>

        {/* ---- Scroll indicator ---- */}
        <button
          type="button"
          className={styles.scroll}
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <span className={styles.scrollLine}>
            <span className={styles.scrollPulse} />
          </span>
        </button>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
    </svg>
  );
}
