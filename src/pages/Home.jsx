import React from "react";
import HeroSection from "../components/common/HeroSection";
import ProjectsSection from "../components/common/ProjectsSection";

export default function Home() {
  return (
    <main className="pt-24 pb-12">
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
