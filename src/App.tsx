import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import ApplicationErrorBoundary from "./components/application-error-boundary";
import AppShell from "./components/app-shell";
import { getDetailRoutePattern, getPageRoute } from "./navigation";
import ContactPage from "./pages/contact-page";
import ExperiencePage from "./pages/experience-page";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";
import ProjectDetailPage from "./pages/project-detail-page";
import ProjectsPage from "./pages/projects-page";
import ResearchPage from "./pages/research-page";
import SoftwareDetailPage from "./pages/software-detail-page";
import SoftwarePage from "./pages/software-page";

function App() {
  return (
    <ApplicationErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path={getPageRoute("home", "fr")} element={<HomePage />} />
            <Route
              path={getPageRoute("experience", "fr")}
              element={<ExperiencePage />}
            />
            <Route
              path={getPageRoute("projects", "fr")}
              element={<ProjectsPage />}
            />
            <Route
              path={getDetailRoutePattern("project", "fr")}
              element={<ProjectDetailPage />}
            />
            <Route
              path={getPageRoute("research", "fr")}
              element={<ResearchPage />}
            />
            <Route
              path={getPageRoute("software", "fr")}
              element={<SoftwarePage />}
            />
            <Route
              path={getDetailRoutePattern("software", "fr")}
              element={<SoftwareDetailPage />}
            />
            <Route
              path={getPageRoute("contact", "fr")}
              element={<ContactPage />}
            />

            <Route path={getPageRoute("home", "en")} element={<HomePage />} />
            <Route
              path={getPageRoute("experience", "en")}
              element={<ExperiencePage />}
            />
            <Route
              path={getPageRoute("projects", "en")}
              element={<ProjectsPage />}
            />
            <Route
              path={getDetailRoutePattern("project", "en")}
              element={<ProjectDetailPage />}
            />
            <Route
              path={getPageRoute("research", "en")}
              element={<ResearchPage />}
            />
            <Route
              path={getPageRoute("software", "en")}
              element={<SoftwarePage />}
            />
            <Route
              path={getDetailRoutePattern("software", "en")}
              element={<SoftwareDetailPage />}
            />
            <Route
              path={getPageRoute("contact", "en")}
              element={<ContactPage />}
            />

            <Route
              path="/"
              element={<Navigate replace to={getPageRoute("home", "fr")} />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApplicationErrorBoundary>
  );
}

export default App;
