import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import Favoritos from "./pages/Favoritos";
import ErrorPage from "./pages/404";
import UserDets from "./components/UserDets";

import { userDetailsLoader } from "./utils/helper";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path='/'>
          <Route index element={<Search/>}/>
          <Route path=":username" element={<UserDets/>} loader={userDetailsLoader}/>
        </Route>
        <Route path="/favoritos">
          <Route index element={<Favoritos/>}/>
          <Route path=":username" element={<UserDets/>} loader={userDetailsLoader}/>
        </Route>
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
