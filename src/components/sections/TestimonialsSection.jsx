import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "../../api/portfolio";

function TestimonialSkeleton() {
  return (
    <article className="animate-pulse rounded-[1.5rem] border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
      <div className="h-4 w-2/3 rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-3 h-3 w-full rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-2 h-3 w-11/12 rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-4 h-10 w-10 rounded-full bg-black/10 dark:bg-white/10" />
    </article>
  );
}

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  return (
    <section aria-labelledby="testimonials-title" className="mx-auto w-full max-w-[1480px] px-4 pb-16 md:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-black/45 dark:text-white/50">Recommendations</p>
          <h2 id="testimonials-title" className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-5xl">
            Testimonials from clients and teams.
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <TestimonialSkeleton key={index} />)
          : testimonials.slice(0, 4).map((item) => (
              <article key={item.id || item.name} className="rounded-[1.5rem] border border-black/10 bg-white/80 p-5 shadow-[0_12px_34px_rgba(0,0,0,0.07)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-sm leading-7 text-black/75 dark:text-white/70">&quot;{item.text}&quot;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-black/10 pt-4 dark:border-white/10">
                  <img
                    src={item.avatar}
                    alt={`${item.name} avatar`}
                    loading="lazy"
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-black dark:text-white">{item.name}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-black/55 dark:text-white/55">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
