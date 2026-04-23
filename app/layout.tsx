import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guru – Teach or Learn Anything",
  description:
    "Guru is the live learning platform for anyone who wants to teach — or learn — absolutely anything. Gurus set their own price and monetize what they know. Protégés can learn any skill, art, job, hack, hobby, trend, or weird flex!",
};

export const viewport: Viewport = {
  themeColor: "#ff5744",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" style={{ backgroundColor: "#ff5744" }}>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
