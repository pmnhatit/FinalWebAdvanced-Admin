/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BlockIcon from '@material-ui/icons/Block';
import CommentIcon from '@material-ui/icons/Comment';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import ListUser from "./views/ListUser/ListUser";
// core components/views for RTL layout

const user = JSON.parse(localStorage.getItem('user'));
  console.log("userinfoRoute:"+user);
  // console.log("authRoute: "+user.auth);

const dashboardRoutes = [
  {
    path: "/users",
    name: "User management",
    rtlName: "لوحة القيادة",
    icon: Person,
    component: ListUser,
    layout: "/admin"
  },
  {
    path: "/block",
    name: "Block/Unblock",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BlockIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Statistics",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Comment Management",
    rtlName: "طباعة",
    icon: CommentIcon,
    component: Typography,
    layout: "/admin"
  },
  
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  
];
export default dashboardRoutes;
