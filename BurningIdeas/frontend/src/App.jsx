import { Outlet } from "react-router-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import EditAccount from "./components/EditAccount";
import Footer from "./components/Footer";

function Root() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
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
