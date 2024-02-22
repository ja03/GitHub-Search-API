import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import Favoritos from "./pages/Favoritos";
import ErrorPage from "./pages/404";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Search/>}/>
        <Route path="/favoritos" element={<Favoritos/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Route>
    )
  )
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
