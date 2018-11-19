import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Paper,
  FormHelperText
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,

    [theme.breakpoints.up(420 + theme.spacing.unit * 3 * 2)]: {
      width: 420,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "#242249"
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    boxShadow: "none",
    textTransform: "none",
    fontSize: 19,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#242249",
    borderColor: "#242249",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#242249",
      borderColor: "#c1ff75"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#13190c",
      borderColor: "#c1ff75"
    },
    "&:focus": {
      boxShadow: "none",
      color: "#ff795e"
    }
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#242249"
    }
  },
  cssFocused: {},
  cssUnderline: {
    borderBottom: "2px solid white",
    "&:after": {
      borderBottomColor: "#242249"
    }
  },
  cssUnderlineErrorState: {
    "&:after": {
      borderBottomColor: "#ff0000"
    }
  },
  formHelperText: {
    color: "#ff0000"
  }
});
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f50b5"
    }
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  // utworzenie lifecycle metod, wywołanie kiedy komponent odbierze nowe propertis
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }); //jeśli jest bład to ustawiamy go w stanie komponentu
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state; // to samo co | errors = this.state.errors

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper} noValidate onSubmit={this.onSubmit}>
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography variant="headline">Rejestracja</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" fullWidth>
                <MuiThemeProvider theme={theme}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused
                    }}
                    htmlFor="name"
                  >
                    Nazwa użytkownika
                  </InputLabel>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    autoFocus //kursor w text formie
                    className={classnames(classes.cssUnderline, {
                      [classes.cssUnderlineErrorState]: errors.name
                    })}
                  />
                  {errors.name && (
                    <FormHelperText
                      className={classes.formHelperText}
                      id="name-error"
                    >
                      {errors.name}
                    </FormHelperText>
                  )}
                </MuiThemeProvider>
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <MuiThemeProvider theme={theme}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused
                    }}
                    htmlFor="email"
                  >
                    Adres email
                  </InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={this.state.email} //wymagany jest event zmiany text formu
                    onChange={this.onChange}
                    className={classnames(classes.cssUnderline, {
                      [classes.cssUnderlineErrorState]: errors.email
                    })}
                  />
                  {errors.email && (
                    <FormHelperText
                      className={classes.formHelperText}
                      id="email-error"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </MuiThemeProvider>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <MuiThemeProvider theme={theme}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused
                    }}
                    htmlFor="password"
                  >
                    Hasło
                  </InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className={classnames(classes.cssUnderline, {
                      [classes.cssUnderlineErrorState]: errors.password
                    })}
                  />
                  {errors.password && (
                    <FormHelperText
                      className={classes.formHelperText}
                      id="password-error"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </MuiThemeProvider>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <MuiThemeProvider theme={theme}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused
                    }}
                    htmlFor="password2"
                  >
                    Powtórz hasło
                  </InputLabel>
                  <Input
                    name="password2"
                    type="password"
                    id="password2"
                    autoComplete="current-password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    className={classnames(classes.cssUnderline, {
                      [classes.cssUnderlineErrorState]: errors.password2
                    })}
                  />
                  {errors.password2 && (
                    <FormHelperText
                      className={classes.formHelperText}
                      id="password2-error"
                    >
                      {errors.password2}
                    </FormHelperText>
                  )}
                </MuiThemeProvider>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Utwórz konto
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(withRouter(Register)));
