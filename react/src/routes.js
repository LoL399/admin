/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
import NotificationsPage from "views/Notifications/Notifications.js";

// core components/views for RTL layout
import { Comment, Movie } from "@material-ui/icons";
import MovieList from "page/movie";
import UserList from "page/user";
import PostList from "page/post";
import CommentList from "page/comments";
import Person from "@material-ui/icons/Person";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/films",
    name: "Films",
    icon: Movie,
    component: MovieList,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: Person,
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/people",
    name: "People",
    icon: Person,
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/posts",
    name: "Posts",
    icon: Comment,
    component: PostList,
    layout: "/admin",
  },
  {
    path: "/comments",
    name: "Comment",
    icon: Comment,
    component: CommentList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
