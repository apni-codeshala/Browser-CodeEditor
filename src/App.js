import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import AuthForm from "./components/AuthForm";
import EditorPage from "./components/EditorPage";
import Works from "./components/Works";
import {MyProvider} from "./components/utils/UserContext";



const App = () => {
    return (
        <MyProvider>
            <Outlet />
        </MyProvider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <AuthForm />,
            },
            {
                path: "/works",
                element: <Works />
            },
            {
                path: "/editor/:id",
                element: <EditorPage />
            }
        ]
    }
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={appRouter} />
    </React.StrictMode>,
    document.getElementById('root')
)