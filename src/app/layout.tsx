import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Johan Unbound",
  description:
    "A personal brand, contact, and recent adventures site for Johan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
