import "./globals.css";

export const metadata = {
  title: "Yaswanth Koneri — Software Development Engineer III",
  description:
    "Full-stack Software Engineer with 9+ years of experience building scalable web applications, microservices, and cloud-native backend systems.",
};

export const viewport = {
  themeColor: "#07060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
