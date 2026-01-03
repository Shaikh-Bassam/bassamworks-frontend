import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layouts/Navbar";
import { publicRoutes } from "./routes/appRoutes";
import '../src/index.css'
import '../src/styles/index.css'
import { useInitialLoader } from "./hooks/useInitialLoader";
import FullPageLoader from "./components/loaders/FullPageLoader";
import Layout from "./components/layouts";

const queryClient = new QueryClient();

export default function App() {
  const loading = useInitialLoader();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          {loading && <FullPageLoader />}
          <Routes>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
