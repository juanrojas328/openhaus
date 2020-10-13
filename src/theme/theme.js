import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },

    palette: {
        primary: {
            light: '#ff7c00',
            main: '#cc0000',
            dark: '#ff7c00',
            contrastText: '#ECFAD8'
        },
        secondary:{
            main: '#10A75F'
        }
    },
    common:{
        white: "white"
    },
  
    spacing: 10



});

export default theme;
