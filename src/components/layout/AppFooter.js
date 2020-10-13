import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import BarSession from "./bar/BarSession";
import { withStyles } from "@material-ui/styles";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";
import { StateContext } from "../../sesion/store";
import BarSessionVacio from "./bar/BarSessionVacio";
import FooterNav from "./bar/FooterNav";

const styles = theme => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    margen: {
        marginBottom: 200
    }

});

class AppFooter extends Component {
    static contextType = StateContext;

    state = {
        firebase: null
    };

    componentDidMount() {
        const { firebase } = this.state; //local state
        const [{ sesion }, dispatch] = this.context; //global state

        if (firebase.auth.currentUser !== null && !sesion) {
            firebase.db
                .collection("Users")
                .doc(firebase.auth.currentUser.uid)
                .get()
                .then(doc => {
                    const usuarioDB = doc.data();
                    dispatch({
                        type: "INICIAR_SESION",
                        sesion: usuarioDB,
                        autenticado: true
                    });
                });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let nuevosObjetos = {};
        if (nextProps.firebase !== prevState.firebase) {
            nuevosObjetos.firebase = nextProps.firebase;
        }
        return nuevosObjetos;
    }

    render() {
        const [{ sesion }, dispatch] = this.context;

        return sesion ? (sesion.autenticado ? (
            <div style={styles.margen}>
                <AppBar position="">
                    <FooterNav />
                </AppBar>
            </div>
        )
            : <div style={styles.margen}>
                <AppBar style={styles.margen} position="">
                    <FooterNav />
                </AppBar>
            </div>
        )
            : <div style={styles.margen}>
                <AppBar style={styles.margen} position="">
                    <FooterNav />
                </AppBar>
            </div>
    }
}

export default compose(
    withStyles(styles),
    consumerFirebase
)(AppFooter);
