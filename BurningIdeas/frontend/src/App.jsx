import { Outlet } from "react-router-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { useUser } from "./hooks/useUser";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import EditAccount from "./components/EditAccount";
import Footer from "./components/Footer";
import SelectedIdea from "./components/SelectedIdea";

function Root() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const { isAuthenticated } = useUser();
  const router = createHashRouter([
    {
      children: [
        {
          element: <LandingPage />,
          path: "/",
        },
        {
          element: <HomePage />,
          path: "/home",
        },
        {
          element: <EditAccount />,
          path: "/editaccount",
        },
        {
          element: <SelectedIdea />,
          path: "/idea/:ideaId",
        },
      ],
      element: <Root />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}>
        <div>
          <Outlet />
        </div>
      </RouterProvider>
    </>
  );
}

export default App;
