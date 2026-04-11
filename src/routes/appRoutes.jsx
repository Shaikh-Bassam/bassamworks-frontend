import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Skills from "../pages/Skills";
export const publicRoutes = [
  { 
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/skills",
    element: <Skills />
  },
  {
    path: "/contact",
    element: <Contact />
  }
];

// Admin routes (future)
export const adminRoutes = [
//   { path: "/admin/dashboard", element: <Dashboard /> },
//   { path: "/admin/projects", element: <Projects /> },
];
