import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { publicRoutes } from "./routes/appRoutes";
import "./index.css";
import "./styles/index.css";
import { useInitialLoader } from "./hooks/useInitialLoader";
import FullPageLoader from "./components/loaders/FullPageLoader";
import Layout from "./components/layouts";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/common/ui/ToastProvider";
import SkipToContent from "./components/common/ui/SkipToContent";

const queryClient = new QueryClient();

export default function App() {
  const loading = useInitialLoader();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <Router>
            <SkipToContent />
            <Layout>
              {loading && <FullPageLoader />}
              <div id="main-content" tabIndex="-1">
                <Routes>
                  {publicRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </div>
            </Layout>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
