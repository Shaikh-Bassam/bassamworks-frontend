import apiClient from "./client";
import { fallbackProjects } from "../data/fallbackProjects";
import { fallbackTestimonials } from "../data/fallbackTestimonials";

const HOUR_MS = 60 * 60 * 1000;
const GITHUB_CACHE_KEY = "bassamworks-github-cache";

function readCache(key) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > HOUR_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function writeCache(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );
}

export async function fetchProjects() {
  try {
    const { data } = await apiClient.get("/api/projects");
    if (Array.isArray(data) && data.length) {
      return data;
    }
    return fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function fetchTestimonials() {
  try {
    const { data } = await apiClient.get("/api/testimonials");
    if (Array.isArray(data) && data.length) {
      return data;
    }
    return fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export async function submitContact(payload) {
  const { data } = await apiClient.post("/api/contact", payload);
  return data;
}

export async function fetchGithubFeaturedRepos(username) {
  const cacheKey = `${GITHUB_CACHE_KEY}-${username}`;
  const cached = readCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);

  if (response.status === 403) {
    const reset = response.headers.get("x-ratelimit-reset");
    const retryAt = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : "later";
    throw new Error(`GitHub rate limit reached. Try again at ${retryAt}.`);
  }

  if (!response.ok) {
    throw new Error("Unable to fetch GitHub repositories right now.");
  }

  const repos = await response.json();
  const featured = repos
    .filter((repo) => !repo.fork && !repo.private)
    .slice(0, 6)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
    }));

  writeCache(cacheKey, featured);
  return featured;
}
