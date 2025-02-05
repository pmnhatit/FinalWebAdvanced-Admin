import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import AddAdmin from "../views/AddAdmin/AddAdmin";

let ps;

// const user = JSON.parse(localStorage.getItem('user'));
// console.log("userinfo1:"+user);
// console.log("auth1:"+user.auth);



const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [arrayRoutes, setArrayRoutes] = React.useState([]);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    console.log(window.location.pathname);
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  let newRoutes = [...routes];
  const user = JSON.parse(localStorage.getItem('user'));
    
    if(user.auth==="1"){
      const newRoute=[
            {
              path: "/addadmin",
              name: "Create Admin",
              icon: PersonAddIcon,
              component: AddAdmin,
              layout: "/admin"
            },
          ];
          newRoutes = newRoutes.concat(newRoute);
          console.log(newRoutes);
          // setArrayRoutes(newRoutes);
    }
   
    console.log("new routes:"+newRoutes);
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    setArrayRoutes(newRoutes);
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      // document.body.style.overflow = "hidden";
      document.body.style.overflow = "scroll-y";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);
  const switchRoutes = (
    <Switch>
      {arrayRoutes.map((prop, key) => {
          if (prop.layout === "/admin" ) {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          }
       // } 
        return null;
      })}
      {/* <Redirect from="/admin" to="/admin/home" /> */}
    </Switch>
  );
  console.log("in return:"+newRoutes);
  return (
    
    <div className={classes.wrapper}>
      
      <Sidebar
        routes={arrayRoutes}
        logoText={"Admin caro"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={newRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
