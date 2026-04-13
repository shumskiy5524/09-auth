import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist",
  openGraph: {
    title: "Page not found",
    description: "This page does not exist",
    url: "https://notehub.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;