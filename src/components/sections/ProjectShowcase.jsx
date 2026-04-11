import { ExternalLink, Github, Layers, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../api/portfolio";

const integrationColors = {
  Stripe: "bg-[#635bff]/15 text-[#4d44de] dark:text-[#9f98ff]",
  AWS: "bg-[#ff9900]/15 text-[#d97f00] dark:text-[#ffc666]",
  Twilio: "bg-[#f22f46]/15 text-[#cc2238] dark:text-[#ff8190]",
  Webinar: "bg-[#00a39a]/15 text-[#007d75] dark:text-[#79dbd5]",
};

function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[1.5rem] border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="h-40 rounded-2xl bg-black/10 dark:bg-white/10" />
      <div className="mt-4 h-4 w-2/5 rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-2 h-3 w-full rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-2 h-3 w-4/5 rounded bg-black/10 dark:bg-white/10" />
    </div>
  );
}

function spanClasses(span) {
  switch (span) {
    case "2x2":
      return "md:col-span-6 md:row-span-2";
    case "2x1":
      return "md:col-span-6";
    case "1x2":
      return "md:col-span-3 md:row-span-2";
    default:
      return "md:col-span-3";
  }
}

export default function ProjectShowcase() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <section id="work" aria-labelledby="project-showcase-title" className="mx-auto w-full max-w-[1480px] px-4 pb-16 md:px-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-black/45 dark:text-white/50">Project showcase</p>
          <h2 id="project-showcase-title" className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-5xl">
            Real production work from Zaap and 97 Solutions.
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/65">
          <Layers className="size-4" aria-hidden="true" />
          Bento layout
        </div>
      </div>

      <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-4 gap-4 md:grid-cols-12">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="col-span-4 md:col-span-3">
                <ProjectCardSkeleton />
              </div>
            ))
          : projects.map((project) => (
              <article
                key={project.id || project.name}
                className={`col-span-4 rounded-[1.6rem] border border-black/10 bg-white/75 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_24px_56px_rgba(0,0,0,0.14)] dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_24px_56px_rgba(0,0,0,0.45)] ${spanClasses(
                  project.span
                )}`}
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-52"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold tracking-tight text-black dark:text-white">{project.name}</h3>
                  <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/60 dark:bg-white/10 dark:text-white/70">
                    {project.category}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-7 text-black/70 dark:text-white/70">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.techStack || []).map((tech) => (
                    <span key={`${project.name}-${tech}`} className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/65 dark:border-white/15 dark:bg-white/10 dark:text-white/75">
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.integrations || []).length ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {(project.integrations || []).map((integration) => (
                      <span
                        key={`${project.name}-${integration}`}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${integrationColors[integration] || "bg-black/10 text-black/70 dark:bg-white/15 dark:text-white/70"}`}
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 text-xs uppercase tracking-[0.22em] text-black/50 dark:border-white/10 dark:text-white/55">
                  <span>{project.company}</span>
                  <span>{project.completedAt}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:border-black/25 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-white/30"
                    >
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                      Live
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:border-black/25 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-white/30"
                    >
                      <Github className="size-3.5" aria-hidden="true" />
                      Repo
                    </a>
                  ) : null}
                  {project.featured ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                      <ShieldCheck className="size-3.5" aria-hidden="true" />
                      Featured
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
