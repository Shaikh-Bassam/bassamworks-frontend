import { FileText, Github, Linkedin } from "lucide-react";
import BorderButton from "../../common/buttons/BorderButton";

export default function HeroSection() {
    return (
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
                <BorderButton>
                    <span className="flex h-2 w-2 rounded-full bg-[#258cf4] shadow-[0_0_8px_#258cf4]"></span>
                    <span>
                        WHO AM I
                    </span>
                </BorderButton>

                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Crafting digital experiences with{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#258cf4] to-purple-400">
                        precision
                    </span>
                    {' '}&amp; passion.
                </h1>

                <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
                    <p>
                        Hello! I'm Alex, a software engineer based in San Francisco who enjoys bridging
                        the gap between engineering and design. I take pleasure in building software
                        that is not only functional but also user-friendly and aesthetically pleasing.
                    </p>
                    <p>
                        With over 5 years of experience in full-stack development, I've worked with
                        startups to build scalable products from the ground up, and with established
                        companies to modernize legacy systems using modern tools like React, TypeScript,
                        and Laravel.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    <BorderButton as="a" href="#" variant="solid" size="xl">
                        <FileText className="w-5 h-5" />
                        <span>Download Resume</span>
                    </BorderButton>
                    <BorderButton as='a' href="#" variant="outline">
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                    </BorderButton>
                    <BorderButton as='a' href="#" variant="outline">
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </BorderButton>
                </div>
            </div>

            {/* Image Section */}
            <div className="relative pt-8 lg:pt-0">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative z-10 group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#258cf4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
                    <img
                        alt="Coding Workspace"
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLiRMlsMvC7c-25J0z3VgXsXdMgNA-QBgKWyTL5TVkOmzejIqDarLi0hd1pfC-bDojcJVgOGW9_LaobEgm0tK07lLrFYky_7Uzm5vxCvKZd0Svzp9YW-wJI6VzHW1lDlGnh9J2g1fuIDb--0x9_hcpBBEpZI2u44rtg9uLpb4SBZKxOtLlfc9YcVfjmoykx5avKmDtM-jJDtvlapa0wTTgC90DeAmgM60KCz2xdhxNDlNJsJ3A7gYzoKT4zIwY_TA_Zdh27BM"
                    />
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#258cf4]/20 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        </div>
    );
}
