import { BrowserRouter } from "react-router-dom";

import AppRouter from "./routing/router";
import ApplicationErrorBoundary from "./shell/application-error-boundary";

function App() {
  return (
    <ApplicationErrorBoundary>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ApplicationErrorBoundary>
  );
}

export default App;