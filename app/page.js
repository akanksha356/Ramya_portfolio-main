import VideoIntro from "@/components/VideoIntro/VideoIntro";
import AboutSections from "@/components/AboutSections/AboutSections";
import Projects from "@/components/Projects/Projects";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <VideoIntro
        src="/portfolio_intro.mp4"
        badge="Software Development Engineer III · Bangalore, India"
        firstName="Yaswanth"
        lastName="Koneri"
        role="Full-stack Software Engineer · Scalable web applications · Cloud-native systems"
        skills={[
          "JavaScript",
          "Node.js",
          "React",
          "AWS",
          "Microservices",
          "Docker · ECS",
          "Redis",
        ]}
        githubUrl="https://github.com/yaswanthkoneri"
        email="yaswanthkoneri6@gmail.com"
      />

      {/* Second page — Who I Am, Technical Skills, Experience, Education */}
      <AboutSections />

      {/* Third page — What I Build (horizontal scroll showcase) */}
      <Projects />

      {/* Contact */}
      <Footer />
    </main>
  );
}
