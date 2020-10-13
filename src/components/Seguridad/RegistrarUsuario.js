import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Avatar,
  Grid,
  Button,
} from "@material-ui/core";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";
import { crearUsuario } from "../../sesion/actions/sesionAction";
import { openMensajePantalla } from "../../sesion/actions/snackbarAction";
import { useStateValue } from "../../sesion/store";

const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 8,
    backgroundColor: "#e53935",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
};

const usuarioInicial = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
};

const RegistrarUsuario = (props) => {
  const [{ sesion }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [firebase, setFirebase] = useState(null);

  useEffect(() => {
    if (firebase === null) {
      setFirebase(props.firebase);
    }
  }, [props.firebase]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();

    let callback = await crearUsuario(dispatch, firebase, usuario);

    if (callback.status) {
      props.history.push("/");
    } else {
      openMensajePantalla(dispatch, {
        open: true,
        mensaje: callback.mensaje.message,
      });
    }
  };

  return (
    <Container maxWidth="md">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockOutLineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registre su Cuenta
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                name="nombre"
                onChange={onChange}
                value={usuario.nombre}
                fullWidth
                label="Ingrese su nombre"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="apellido"
                onChange={onChange}
                value={usuario.apellido}
                fullWidth
                label="Ingrese sus apellidos"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="email"
                onChange={onChange}
                value={usuario.email}
                fullWidth
                label="Ingrese su e-mail"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="password"
                name="password"
                onChange={onChange}
                value={usuario.password}
                fullWidth
                label="Ingrese su password"
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                onClick={registrarUsuario}
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                style={style.submit}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default compose(consumerFirebase)(RegistrarUsuario);
