import About from "../pages/About";
import Home from "../pages/Home";
export const publicRoutes = [
  { 
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  }
];

// Admin routes (future)
export const adminRoutes = [
//   { path: "/admin/dashboard", element: <Dashboard /> },
//   { path: "/admin/projects", element: <Projects /> },
];
