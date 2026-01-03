import React from "react";
import HeroSection from "../components/layouts/HeroSection";
import ProjectsSection from "../components/layouts/ProjectsSection";

export default function Home() {
  return (
    <main className="pt-24 pb-12">
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
