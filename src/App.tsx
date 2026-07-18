import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppShell from "./components/app-shell";
import {
  getPageRoute,
  navigationItems,
  supportedLanguages,
} from "./navigation";
import PlaceholderPage from "./pages/placeholder-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={getPageRoute("home", "fr")} replace />}
        />

        <Route element={<AppShell />}>
          {navigationItems.flatMap((item) =>
            supportedLanguages.map((language) => (
              <Route
                key={`${language}-${item.id}`}
                path={item.routes[language]}
                element={<PlaceholderPage titleKey={item.titleKey} />}
              />
            )),
          )}
        </Route>

        <Route
          path="*"
          element={<Navigate to={getPageRoute("home", "fr")} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
