import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavRoot from "examples/Sidenav/SidenavRoot";

import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

function Sidenav({ color = "info", brand = "", routes, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    // Automatically open the parent collapse if the current path matches one of its children
    const findParentKey = (routesList) => {
      for (const route of routesList) {
        if (route.collapse) {
          for (const child of route.collapse) {
            if (
              child.route === pathname ||
              (child.collapse &&
                child.collapse.some((n) => n.route === pathname))
            ) {
              return route.key;
            }
          }
        }
      }
      return false;
    };

    const parentKey = findParentKey(routes);
    setOpenCollapse(parentKey);
  }, [pathname, routes]);

  let textColor = "white";
  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth >= 1200 ? transparentSidenav : false
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth >= 1200 ? whiteSidenav : false
      );
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  const renderCollapse = (collapseItems, parentKey) =>
    collapseItems?.map(({ name, key, route, href, icon, collapse }) => {
      if (collapse) {
        return (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            icon={icon}
            active={openCollapse === key}
            open={openCollapse === key}
            onClick={() =>
              openCollapse === key
                ? setOpenCollapse(false)
                : setOpenCollapse(key)
            }
          >
            {renderCollapse(collapse, key)}
          </SidenavItem>
        );
      }

      if (href) {
        return (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem
              color={color}
              name={name}
              icon={icon}
              active={pathname === route}
              nested
            />
          </Link>
        );
      }

      return (
        <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
          <SidenavItem
            color={color}
            name={name}
            icon={icon}
            active={pathname === route}
            nested
          />
        </NavLink>
      );
    });

  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route, collapse }) => {
      if (type === "title") {
        return (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={2}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      }

      if (type === "divider") {
        return (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      if (type === "collapse") {
        if (noCollapse && route) {
          return (
            <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse
                active={pathname === route}
              />
            </NavLink>
          );
        }

        return (
          <SidenavCollapse
            key={key}
            name={name}
            icon={icon}
            active={openCollapse === key}
            open={openCollapse === key}
            onClick={() => setOpenCollapse(openCollapse === key ? false : key)}
          >
            {renderCollapse(collapse, key)}
          </SidenavCollapse>
        );
      }

      return null;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={2.5} pb={0} px={3} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {brand && (
            <MDBox component="img" src={brand} alt="Brand" width="4rem" />
          )}
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
