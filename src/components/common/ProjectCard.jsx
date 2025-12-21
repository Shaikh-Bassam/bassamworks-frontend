import React from "react";

export default function ProjectCard({ title, tech, img }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-background-dark border border-white/10 aspect-[4/3] cursor-pointer">
      <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:opacity-0"></div>
      <img
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={img}
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 to-transparent opacity-100">
        <h4 className="text-lg font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{title}</h4>
        <p className="text-sm text-gray-300 mt-1 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">{tech}</p>
      </div>
    </div>
  );
}
