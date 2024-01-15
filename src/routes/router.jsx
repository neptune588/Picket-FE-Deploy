import { createBrowserRouter } from "react-router-dom";

import Layout from "@/pages/Layout";
import AuthLayoutPage from "@/pages/AuthLayoutPage";

import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import RegisterSuccess from "@/pages/RegisterSuccess/RegisterSuccess";
import PassWordResearch from "@/pages/PassWordResearch";
import Main from "@/pages/Main";
import MyProfile from "@/pages/MyProfile";
import Browse from "@/pages/Browse";
import AddBucketPage from "@/pages/AddBucketPage";
import BucketChangeModal from "@/components/BucketChangeModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: `/search/:keyword`,
        element: <Browse />,
      },

      {
        path: "/profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "/add",
    element: <AddBucketPage />,
  },
  {
    path: "/testChange",
    element: <BucketChangeModal />,
  },
  {
    path: "/auth",
    element: <AuthLayoutPage />,
    children: [
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/passwordResearch",
        element: <PassWordResearch />,
      },
      {
        path: "/auth/registerSuccess/:message",
        element: <RegisterSuccess />,
      },
    ],
  },
]);

export default router;
