import React, { useState } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";
import { iniciarSesion } from "../../sesion/actions/sesionAction";
import { openMensajePantalla } from "../../sesion/actions/snackbarAction";

import { useStateValue } from "../../sesion/store";

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    backgroundColor: "red",
  },
  form: {
    width: "100%",
    marginTop: 8,
  },
  submit: {
    marginTop: 10,
    marginBottom: 20,
  },
};

//version en hooks
const Login = (props) => {
  const [{ sesion }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    const firebase = props.firebase;

    let callback = await iniciarSesion(
      dispatch,
      firebase,
      usuario.email,
      usuario.password
    );
    console.log(callback);
    if (callback.status) {
      props.history.push("/");
    } else {
      openMensajePantalla(dispatch, {
        open: true,
        mensaje: callback.mensaje.message,
      });
    }
  };

  const resetearPassword = () => {
    const firebase = props.firebase;

    firebase.auth
      .sendPasswordResetEmail(usuario.email)
      .then((success) => {
        openMensajePantalla(dispatch, {
          open: true,
          mensaje: "Se ha enviado un correo electronico a tu cuenta",
        });
      })
      .catch((error) => {
        openMensajePantalla(dispatch, {
          open: true,
          mensaje: error.message,
        });
      });
  };

  return (
    <Container maxWidth="xs">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingrese Usuario
        </Typography>
        <form style={style.form}>
          <TextField
            variant="outlined"
            label="E=Mail"
            name="email"
            fullWidth
            margin="normal"
            onChange={onChange}
            value={usuario.email || ""}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            onChange={onChange}
            value={usuario.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={login}
            style={style.submit}
          >
            Enviar
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={resetearPassword}>
                {"Olvido su contrasena?"}
              </Link>
            </Grid>

            <Grid item>
              <Link href="/auth/registrarUsuario" variant="body2">
                {"No tienes cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={style.submit}
          href="/auth/loginTelefono"
        >
          Ingrese con su telefono
        </Button>
      </div>
    </Container>
  );
};


export default compose(consumerFirebase)(Login);
