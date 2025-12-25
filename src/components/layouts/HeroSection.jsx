import React from "react";
import PrimaryButtom from "../common/buttons/PrimaryButtom";
import SecondaryButton from "../common/buttons/SecondaryButton";
import FloatingBadge from "../common/FloatingBadge";
import { BRAND } from "../../config/branding";

export default function HeroSection() {
  return (
    <section class="w-full px-4 md:px-10 max-w-[1440px] mx-auto mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
        {/* <!-- Left Column: Text --> */}
        <div class="flex flex-col justify-center gap-8">
          {/* <!-- Badge --> */}
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-xs font-medium text-gray-300 tracking-wide uppercase">Available for new
              projects</span>
          </div>
          {/* <!-- Headline --> */}
          <div class="space-y-4">
            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
              Building <span class="text-gradient">scalable</span> web apps for the future.
            </h1>
            <p class="text-lg text-gray-400 max-w-lg leading-relaxed">
              Full-Stack Engineer specialized in Laravel &amp; React. I turn complex problems into
              elegant, high-performance interfaces for next-gen startups.
            </p>
          </div>
          {/* <!-- CTA Actions --> */}
          <div class="flex flex-wrap gap-4 pt-2">
            <PrimaryButtom>
              <span>View Projects</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </PrimaryButtom>
            <SecondaryButton>
              <span class="material-symbols-outlined text-[20px]">download</span>
              <span>Download CV</span>
            </SecondaryButton>
          </div>
          {/* <!-- Stats (Integrated) --> */}
          <div class="flex gap-8 pt-8 border-t border-white/5 mt-4">
            <div>
              <p class="text-3xl font-bold text-white">{BRAND.experience}+</p>
              <p class="text-sm text-gray-500 font-medium">Years Experience</p>
            </div>
            <div class="w-px h-12 bg-white/10"></div>
            <div>
              <p class="text-3xl font-bold text-white">{BRAND.projects}+</p>
              <p class="text-sm text-gray-500 font-medium">Products Launched</p>
            </div>
            <div class="w-px h-12 bg-white/10"></div>
            <div>
              <p class="text-3xl font-bold text-white">100%</p>
              <p class="text-sm text-gray-500 font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
        {/* <!-- Right Column: Visual --> */}
        <div class="relative h-full flex items-center justify-center lg:justify-end">
          {/* <!-- Abstract Background Glow --> */}
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none">
          </div>
          {/* <!-- Main Visual Card --> */}
          <div
            class="relative z-10 w-full max-w-md aspect-[4/3] bg-background-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group hover:border-white/20 transition-colors duration-500">
            {/* <!-- Code Editor Header --> */}
            <div class="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div class="flex gap-1.5">
                <div class="size-3 rounded-full bg-red-500/80"></div>
                <div class="size-3 rounded-full bg-yellow-500/80"></div>
                <div class="size-3 rounded-full bg-green-500/80"></div>
              </div>
              <div class="mx-auto text-xs font-mono text-gray-500">App.jsx</div>
            </div>
            {/* <!-- Image Content --> */}
            <div
              class="w-full h-full relative group-hover:scale-105 transition-transform duration-700 ease-out">
              <img alt="Abstract dark code interface on a computer screen displaying syntax highlighting"
                class="w-full h-full object-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOIzU40bDOUUsJSaX4hsGvve7pc7SyidasVY2H2lC2XS8qePNcvOMpd7NotovXgoR55KJezcKqaLYvJFq25TkffSSqYrJR7VTQBO0NfG2Pfn439j296YTp2AyX902Vv2414cCCNdm2l_JhcKNoSDliIoHI-UoEozcvaIljkV2jD_F0x-NhSd8ie8TECo5Kuv_f2XqoHPMoLMT4LKCWr3vLzXx6TgMJ8UkIIf4uZRuyjwyfIsbwTVAiRbJOpq79wh7qDYD2ep0" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent">
              </div>

              {/* <!-- Floating Tech Badge 1 --> */}
              <FloatingBadge
                wrapperClass="bottom-6 left-6"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </svg>
                }
                frameWork="React.js"
                usage="Component"

              />

              {/* <!-- Floating Tech Badge 2 --> */}
              <FloatingBadge
                wrapperClass="top-20 -right-6"
                icon={
                  <div className="bg-[#FF2D20]/10 text-[#FF2D20]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.039-.01-.012-.021-.025-.028-.037h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
                    </svg>
                  </div>
                }
                frameWork="Laravel"
                usage="Backend"

              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
