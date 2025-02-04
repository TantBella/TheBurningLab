import { Outlet } from "react-router-dom";
import { createHashRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";

function Root() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
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
          path: "/ideas",
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
