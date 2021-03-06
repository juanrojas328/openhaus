import React, { Component } from "react";
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  ListItemText,
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { consumerFirebase } from "../../../server";
import { StateContext } from "../../../sesion/store";
import { salirSesion } from "../../../sesion/actions/sesionAction";
import { MenuDerecha } from "./menuDerecha";
import fotoUsuarioTemp from "../../../logo.svg";
const styles = (theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    color: "#212121",
  },
});
class BarSession extends Component {
  static contextType = StateContext;
  state = {
    firebase: null,
    right: false,
  };
  salirSesionApp = () => {
    const { firebase } = this.state;
    const [{ sesion }, dispatch] = this.context;
    salirSesion(dispatch, firebase).then((success) => {
      this.props.history.push("/auth/login");
    });
  };
  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open,
    });
  };
  static getDeivedStateFromProps(nextProps, prevState) {
    let nuevosObjetos = {};
    if (nextProps.firebase !== prevState.firebase) {
      nuevosObjetos.firebase = nextProps.firebase;
    }
    return nuevosObjetos;
  }
  render() {
    const { classes } = this.props;
    const [{ sesion }, dispatch] = this.context;
    const { usuario } = sesion;
    const { firebase } = this.state;
    let textoUsuario = usuario.nombre + " " + usuario.apellido;

    return (
      <div>
        <Drawer
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
          anchor="right"
        >
          <div
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}
          >
            <MenuDerecha
              classes={classes}
              usuario={usuario}
              textoUsuario={textoUsuario}
              fotoUsuario={fotoUsuarioTemp}
              salirSesion={this.salirSesionApp}
            ></MenuDerecha>
          </div>
        </Drawer>
        <Toolbar>
          <IconButton color="inherit">
            <i className="material-icons">menu</i>
          </IconButton>
          <Typography variant="h6">OPEN HAUS</Typography>
          <div className={classes.grow}></div>
          <div className={classes.sectionDesktop}>
            <Button color="inherit">Login</Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton color="inherit">
              <i className="material-icons">more_vert</i>
            </IconButton>
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default compose(consumerFirebase, withStyles(styles))(BarSession);
