import { Navigate, Route, Routes } from "react-router-dom";

import AppShell from "@/app/shell/app-shell";
import ContactPage from "@/routes/contact/contact-page";
import ExperiencePage from "@/routes/experience/experience-page";
import HomePage from "@/routes/home/home-page";
import NotFoundPage from "@/routes/not-found/not-found-page";
import ProjectDetailPage from "@/routes/projects/project-detail-page";
import ProjectsPage from "@/routes/projects/projects-page";
import ResearchPage from "@/routes/research/research-page";
import SoftwareDetailPage from "@/routes/software/software-detail-page";
import SoftwarePage from "@/routes/software/software-page";

import { getDetailRoutePattern, getPageRoute } from "./navigation";

function AppRouter() {
  return (
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
  );
}

export default AppRouter;