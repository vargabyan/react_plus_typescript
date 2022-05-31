import React from "react";
import ToDo from "./components/ToDo";
import Info from "./components/Information";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { AppStyle } from "./AppStyle";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppStyle>
      <AppBar position="static" sx={{ height: "60px" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            React + Typescript
          </Typography>
          <Button color="inherit">
            <NavLink
              to="/to-do-list"
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              Список дел
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              to="/information"
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              Информация
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </AppStyle>
  );
};

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <Grid container justifyContent="center" direction="column" spacing={3}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Routes>
            <Route path="/" element={<Navigate to="/to-do-list" replace />} />
            <Route path="/to-do-list" element={<ToDo />} />
            <Route path="/information" element={<Info />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};

export default App;
