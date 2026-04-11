import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Star } from "lucide-react";
import { fetchGithubFeaturedRepos } from "../../api/portfolio";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "octocat";

function RepoSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
      <div className="h-4 w-2/3 rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-3 h-3 w-full rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-2 h-3 w-4/5 rounded bg-black/10 dark:bg-white/10" />
    </div>
  );
}

export default function GithubSection() {
  const { data: repos = [], isLoading, isError, error } = useQuery({
    queryKey: ["github", GITHUB_USERNAME],
    queryFn: () => fetchGithubFeaturedRepos(GITHUB_USERNAME),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <section aria-labelledby="github-section-title" className="mx-auto w-full max-w-[1480px] px-4 pb-20 md:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-black/45 dark:text-white/50">GitHub integration</p>
          <h2 id="github-section-title" className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-5xl">
            Featured repositories and activity focus.
          </h2>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-colors hover:border-black/25 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <Github className="size-4" aria-hidden="true" />
          Visit profile
        </a>
      </div>

      {isError ? (
        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-5 text-sm text-rose-700 dark:text-rose-200">
          {error.message}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <RepoSkeleton key={index} />)
            : repos.map((repo) => (
                <article key={repo.id} className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.07)] dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-black dark:text-white">{repo.name}</h3>
                    <a href={repo.url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} repository on GitHub`}>
                      <ExternalLink className="size-4 text-black/60 dark:text-white/70" aria-hidden="true" />
                    </a>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-black/70 dark:text-white/70">
                    {repo.description || "No description available for this repository."}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 text-xs uppercase tracking-[0.22em] text-black/55 dark:border-white/10 dark:text-white/60">
                    <span>{repo.language || "N/A"}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="size-3.5" aria-hidden="true" />
                      {repo.stars}
                    </span>
                  </div>
                </article>
              ))}
        </div>
      )}
    </section>
  );
}
