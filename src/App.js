import React, { useEffect } from "react";
import "./App.css";
import ListaInmueble from "./components/vistas/ListaInmueble";
import AppNavbar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import { Grid, Snackbar } from "@material-ui/core";
import RegistrarUsuario from "./components/Seguridad/RegistrarUsuario";
import Login from "./components/Seguridad/Login";
import { FirebaseContext } from "./server";
import { useStateValue } from "./sesion/store";

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);
  const [{ openSnackbar }, dispatch] = useStateValue();
  useEffect(() => {
    firebase.estaIniciado().then((val) => {
      setupFirebaseInicial(val);
    });
  });
  return autenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackbar ? openSnackbar.open : false}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {openSnackbar ? openSnackbar.mensaje : ""}
            </span>
          }
          onClose={() =>
            dispatch({
              type: "OPEN_SNACKBAR",
              openMensaje: {
                open: false,
                mensaje: ""
              }
            })
          }
        ></Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route path="/" exact component={ListaInmueble}></Route>
              <Route
                path="/auth/registrarUsuario"
                exact
                component={RegistrarUsuario}
              ></Route>
              <Route path="/auth/login" exact component={Login}></Route>
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  ) : null;
}

export default App;
