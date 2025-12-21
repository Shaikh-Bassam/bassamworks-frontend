import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/common/Navbar";
import { publicRoutes } from "./routes/appRoutes";
import '../src/index.css'
import '../src/styles/index.css'
import { useInitialLoader } from "./hooks/useInitialLoader";
import FullPageLoader from "./components/loaders/FullPageLoader";

const queryClient = new QueryClient();

export default function App() {
  const loading = useInitialLoader();

  if (loading) return <FullPageLoader />
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
