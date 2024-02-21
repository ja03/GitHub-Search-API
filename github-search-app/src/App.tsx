import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/"/>
    )
  )
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
