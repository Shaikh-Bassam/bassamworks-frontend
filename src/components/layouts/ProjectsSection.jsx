import React from "react";
import ProjectCard from "../common/ProjectCard";
import { useProjects } from "../../api/project";

export default function ProjectsSection() {
  // const { data: projects, isLoading } = useProjects();
  const projects = [
    {
      id: 1,
      title: "FinTech Dashboard",
      tech: "React • Tailwind • D3.js",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB7m4Q4hIIwfKkOyPyXvDi52GeEvhAAHCNvP4nN9BvKzj8sKFKmiUUzowV_fMFLub6CNSPUutC9yJ85HUV-Vl5dYGjUGVmQWvZ5zdJatZUHJAd-fT5YXCPcvhXjxQyzf2YjLFO5R3ZYUm4tXmZnHXbT4TAaXNR_cvXbA3TzjVGVfCvgEKBtOWgmv1jwvnUpcl97exBlsx6B704ohGDYrpcjpkhGve-_Gy-LfjaohnWA_rW__VvFhy5FRthHt6aeLq_UBQvJ_4",
    },
    {
      id: 2,
      title: "Social Connect",
      tech: "Laravel • Vue.js • MySQL",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpiGtvE7a9hSDgmGWqSuQWouGi6Zq1NlSjmKt3Bw_8G_tBlCqDwnSDiKL3ufhgvdL33feNufgZKdTlAz8NeK2ck96FxEsihPGPvsgzs7xFqnW_iTKjFxpL1VvK4Kp97kxDa9-786tHka54um8s01VnJrOi4X2xSbN0uiWlJ4fu2rfQBt__gxmpcfbDEiBJ6BLGTvxXmoklP_LqNAxzdvfEtpMB8Gn10LDrbhBjIJLzL9mdeumwRK4Vf3wWCC4Lk_copqPz5s0",

    },
    {
      id: 3,
      title: "GeoAnalytics Pro",
      tech: "Mapbox • Node.js • Redis",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANdbBFQqcyqEhBnHZrRuikFkGRmfDD7SrLfvftpvL8pUP70vKuySnTQJe3vNuO_uqNPnVGjMR508q83KUWKTKQA_3lhb_CJSxrEkV7r5czmEWnXfs_X4elPddc6EL65c9aZXRHgbNP_SEC2X899aVcvos6oEkEOFq9uKAHgFAJ968GRCLJ75UbuReNoVbUR9Kz7FgPHINLfWxEEoG53YLYLAolaIJwY_M1erOaigSvNjgPyy3g_pd7i7KNBbYUnOJIPeWWAps",

    }
  ];

  // if (isLoading) return <p className="text-gray-400">Loading projects...</p>;

  return (
    <section id="work" className="w-full px-4 md:px-10 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white">Selected Work</h3>
        <a className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors" href="#">
          View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} title={proj.title} tech={proj.tech} img={proj.image} />
        ))}
      </div>
    </section>
  );
}
