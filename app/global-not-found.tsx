import "./globals.css";
import type { Metadata } from "next";
  import { sourceSans3 } from "./fonts";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};


export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${sourceSans3.className}`}>
      <body className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-2xl text-gray-500">
          Ooops, This page not found.
        </p>
        <p className="text-lg text-zinc-300">
          The link might be corrupted.
        </p>
      </body>
    </html>
  );
}