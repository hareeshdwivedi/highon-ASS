import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import ChatPage from "../pages/chat-box/ChatPage";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    ,
    {
      path: "/chat/:id",
      element: <ChatPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterComponent;
