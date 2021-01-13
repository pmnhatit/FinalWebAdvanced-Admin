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
import Person from "@material-ui/icons/Person";
import ListUser from "./views/ListUser/ListUser";
import ListHistories from "./views/ListHistories/ListHistories";

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
    path: "/histories",
    name: "Match History",
    icon: "content_paste",
    component: ListHistories,
    layout: "/admin"
  },
];
export default dashboardRoutes;
