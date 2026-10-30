import styles from "./Footer.module.css";

/**
 * Footer — contact card at the bottom of the page.
 */

const EMAIL = "yaswanthkoneri6@gmail.com";
const PHONE = "+91 72075 66804";
const GITHUB = "https://github.com/yaswanthkoneri";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Contact — Let&apos;s talk</p>
        <h2 className={styles.title}>
          Let&apos;s build something <span className={styles.hot}>scalable.</span>
        </h2>
        <p className={styles.lead}>
          Software Development Engineer III · Bangalore, India
        </p>

        <div className={styles.actions}>
          <a className={styles.btnPrimary} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <a className={styles.btnGhost} href={`tel:${PHONE.replace(/\s/g, "")}`}>
            {PHONE}
          </a>
        </div>

        <div className={styles.social}>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span aria-hidden="true">·</span>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Yaswanth Koneri · Software Development Engineer III
        </p>
      </div>
    </footer>
  );
}
