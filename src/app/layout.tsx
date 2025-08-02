import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-book Generator - Create Custom Books with AI",
  description: "AI-powered e-book generation platform for creating custom books from simple prompts. Generate children's stories, cookbooks, adventure books, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}