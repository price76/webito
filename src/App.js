import AppRoutes from "./auth/app-router";
import { TraderProvider } from "./auth/tarderContext";

function App() {
  return (
    <>
      <TraderProvider>
        <AppRoutes />
      </TraderProvider>
    </>
  );
}

export default App;
